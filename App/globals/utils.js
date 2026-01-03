import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const pickByPlatform = ({ android, ios }) =>
  Device.osName === "iOS" || Device.osName === "iPadOS" ? ios : android;

/**
 * Creates a Date object from event date and entrance time
 * @param {string} eventDate - Event date (e.g., "2025-01-15")
 * @param {string} eventInTime - Entrance time (e.g., "18:00")
 * @returns {Date} Date object
 */
export const createEventDate = (eventDate, eventInTime) => {
  return new Date(`${eventDate}T${eventInTime}`);
};

/**
 * Creates an ISO string from event date and entrance time
 * @param {string} eventDate - Event date (e.g., "2025-01-15")
 * @param {string} eventInTime - Entrance time (e.g., "18:00")
 * @returns {string} ISO date-time string
 */
export const getEventDateTime = (eventDate, eventInTime) => {
  return createEventDate(eventDate, eventInTime).toISOString();
};

/**
 * Formats minutes into a human-readable time string
 * @param {number} totalMinutes - Total minutes to format
 * @returns {Object} - { days, hours, minutes, formatted }
 */
export const formatMinutesToReadableTime = (totalMinutes) => {
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  return {
    days,
    hours,
    minutes,
    formatted: parts.join(" and ") || "0 minutes",
  };
};

/**
 * Formats a Date object to HH:MM string
 * @param {Date} date - Date object to format
 * @returns {string} Time in HH:MM format
 */
export const formatTimeHHMM = (date) => {
  if (!date || !(date instanceof Date)) {
    return "--:--";
  }
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

/**
 * Formats minutes into a compact human-readable time string
 * @param {number} totalMinutes - Total minutes to format
 * @returns {string} Compact formatted string like "5d 18h" or "45m"
 */
export const formatCompactTimeFromNow = (totalMinutes) => {
  const { days, hours, minutes } = formatMinutesToReadableTime(totalMinutes);

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

/**
 * Safely parses a notification trigger date
 * @param {Object} notification - Notification object with trigger and content.data
 * @returns {Date|null} Parsed Date object or null
 */
export const parseNotificationTriggerDate = (notification) => {
  if (!notification || !notification.trigger) {
    return null;
  }

  const { trigger } = notification;
  const data = notification.content?.data || {};

  try {
    // Priority 1: If trigger has a date, use it
    if (trigger.type === "date" && trigger.date) {
      const date = new Date(trigger.date);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    // Priority 2: If timeInterval (one-shot), use stored fireDateISO
    if (trigger.type === "timeInterval" && trigger.repeats === false) {
      // First try: use stored fireDateISO (most reliable)
      if (data.fireDateISO) {
        const date = new Date(data.fireDateISO);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }

      // Second try: use scheduledAt + seconds
      if (data.scheduledAt && trigger.seconds) {
        const scheduledAt = new Date(data.scheduledAt);
        if (!isNaN(scheduledAt.getTime())) {
          const fireDate = new Date(
            scheduledAt.getTime() + trigger.seconds * 1000
          );
          if (!isNaN(fireDate.getTime())) {
            return fireDate;
          }
        }
      }

      // Last resort: now + seconds (less reliable, but better than nothing)
      if (trigger.seconds) {
        const fireDate = new Date(Date.now() + trigger.seconds * 1000);
        if (!isNaN(fireDate.getTime())) {
          return fireDate;
        }
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Gets all future notifications sorted by trigger time
 * @param {Array} scheduledNotifications - Array of scheduled notification objects
 * @returns {Array} Array of notifications with parsed trigger dates, sorted by time
 */
export const getFutureNotifications = (scheduledNotifications) => {
  const now = Date.now();

  return scheduledNotifications
    .map((notification) => ({
      ...notification,
      triggerDate: parseNotificationTriggerDate(notification),
    }))
    .filter((n) => {
      // Guard against missing/invalid dates
      if (!n.triggerDate || isNaN(n.triggerDate.getTime())) {
        return false;
      }
      return n.triggerDate.getTime() > now;
    })
    .sort((a, b) => a.triggerDate.getTime() - b.triggerDate.getTime());
};

/**
 * Gets the next scheduled notification with formatted time information
 * @returns {Promise<Object|null>} Next notification data or null if none found
 */
export const getNextScheduledNotification = async () => {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();

    if (scheduled.length === 0) {
      return {
        success: false,
        message: "No scheduled notifications found",
        notification: null,
      };
    }

    const futureNotifications = getFutureNotifications(scheduled);

    if (futureNotifications.length === 0) {
      return {
        success: false,
        message: "All notifications are in the past",
        notification: null,
      };
    }

    const next = futureNotifications[0];
    const now = Date.now();
    const timeUntil = next.triggerDate.getTime() - now;
    const minutesUntil = Math.floor(timeUntil / (1000 * 60));

    const compactTime = formatCompactTimeFromNow(minutesUntil);
    const readableDate = next.triggerDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      success: true,
      notification: next,
      triggerDate: next.triggerDate,
      minutesUntil,
      compactTime,
      readableDate,
      title: next.content.title,
      body: next.content.body,
      identifier: next.identifier,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error.message}`,
      notification: null,
    };
  }
};
