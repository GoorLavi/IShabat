import * as Notifications from "expo-notifications";
import StorageService from "@services/storageService";
import { getEffectiveEventTime, getEffectiveEventDate } from "./devOverrides";
import { getNotificationMessage, getTimeText } from "./notificationMessages";
import { parseNotificationTriggerDate } from "./utils";
import { devLogInfo, devLogWarn, devLogError } from "@utils/devLogger";

export const notificationInitializedKey = "is-notifications-initialized";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const identifier = "shabat";

/**
 * Schedule notifications for an upcoming event
 * @param {Object} params - Notification parameters
 * @param {Date} params.date - The event date/time
 * @param {string} params.type - Event type ('שבת', 'חג', 'שבת חג')
 * @param {number[]} [params.notificationTimes=[0.5, 1]] - Minutes before event to schedule notifications
 * @param {boolean} [params.areAllTodosCompleted=false] - If true, skips notifications
 * @param {Object} [params.event] - The full event object for dev overrides
 * @param {string} [params.city] - User's city for dev overrides
 * @returns {Promise<void>}
 */
export const setEvent = async ({
  date,
  type,
  notificationTimes = [0.5, 1],
  areAllTodosCompleted = false,
  event = null,
  city = null,
}) => {
  try {
    // If all todos are completed, skip scheduling notifications
    if (areAllTodosCompleted) {
      devLogInfo("All todos completed - skipping notifications for this event");
      return;
    }

    // Apply dev mode overrides if applicable
    let effectiveDate = date;
    if (event && city) {
      const effectiveTime = getEffectiveEventTime(event, city);
      const effectiveDateStr = getEffectiveEventDate(event);

      // Check if either time or date is overridden
      const hasTimeOverride =
        effectiveTime && effectiveTime !== event[`${city}_in`];
      const hasDateOverride =
        effectiveDateStr && effectiveDateStr !== event.date;

      if (hasTimeOverride || hasDateOverride) {
        // Use overridden values or fall back to original
        const finalDateStr = effectiveDateStr || event.date;
        const finalTime = effectiveTime || event[`${city}_in`];
        effectiveDate = new Date(`${finalDateStr}T${finalTime}`);
        devLogInfo(
          `🔧 DEV: Using overridden event - Date: ${finalDateStr}, Time: ${finalTime} => ${effectiveDate.toISOString()}`
        );
      }
    }

    if (!effectiveDate || !(effectiveDate instanceof Date)) {
      devLogError("Invalid date provided to setEvent");
      return;
    }

    // Extract parasha name from event if available
    const parasha = event?.parasha || null;

    // Schedule notifications based on user preferences
    for (const minutes of notificationTimes) {
      if (minutes > 0) {
        try {
          const notificationDate = new Date(
            effectiveDate.getTime() - minutes * 60 * 1000
          );

          // Skip if notification time is in the past
          if (notificationDate.getTime() <= Date.now()) {
            devLogWarn(
              `Notification time ${minutes} minutes before event is in the past, skipping`
            );
            continue;
          }

          // Use common message function for consistency
          const message = getNotificationMessage(
            type,
            parasha,
            minutes,
            notificationDate,
            effectiveDate
          );

          const eventDateTime = effectiveDate.toISOString();

          await scheduleNotification({
            date: notificationDate,
            title: message.title,
            groupName: identifier,
            body: message.body,
            eventDateTime,
          });
        } catch (error) {
          devLogError(
            `Failed to schedule notification ${minutes} minutes before event: ${error.message}`
          );
          // Continue with next notification even if one fails
        }
      }
    }
  } catch (error) {
    devLogError(`Error in setEvent: ${error.message}`);
  }
};

/**
 * Schedule a single notification
 * @param {Object} params - Notification parameters
 * @param {Date} params.date - When to show the notification
 * @param {string} params.title - Notification title
 * @param {string} params.body - Notification body text
 * @param {string} params.eventDateTime - Event date+time (ISO string) for identification
 * @returns {Promise<string>} Notification identifier
 */
export const scheduleNotification = async ({
  date,
  title,
  body,
  eventDateTime,
}) => {
  try {
    if (!date || !(date instanceof Date)) {
      throw new Error("Invalid date provided to scheduleNotification");
    }

    const fireDateISO = date.toISOString();
    const scheduledAt = new Date().toISOString();

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: "default",
        categoryIdentifier: identifier,
        data: {
          date,
          eventDateTime,
          fireDateISO,
          scheduledAt,
        },
        // Android only
        vibrationPattern: [0, 250, 250, 250],
      },
      trigger: { type: "date", date },
    });

    devLogInfo(`Notification scheduled with ID: ${notificationId}`);

    return notificationId;
  } catch (error) {
    devLogError(`Error scheduling notification: ${error.message}`);
    throw error;
  }
};

export const printAllExistingNotifications = async () => {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();

  devLogInfo(`Total scheduled notifications: ${notifications.length}`);

  notifications.forEach((notification, index) => {
    const triggerDate = parseNotificationTriggerDate(notification);

    if (triggerDate) {
      const now = Date.now();
      const timeUntil = triggerDate.getTime() - now;
      const minutesUntil = Math.floor(timeUntil / (1000 * 60));

      devLogInfo(`Notification ${index + 1}:`);
      devLogInfo(`  ID: ${notification.identifier}`);
      devLogInfo(`  Title: ${notification.content.title}`);
      devLogInfo(`  Fires at: ${triggerDate.toISOString()}`);
      devLogInfo(`  Time from now: ${minutesUntil} minutes`);
    }
  });
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

/**
 * Cancel notifications for a specific event
 * @param {string} eventDateTime - Event date+time (ISO string) to match
 * @returns {Promise<number>} Number of notifications cancelled
 */
export const cancelNotificationsForEvent = async (eventDateTime) => {
  try {
    const allNotifications =
      await Notifications.getAllScheduledNotificationsAsync();
    let cancelledCount = 0;

    for (const notification of allNotifications) {
      const notificationEventDateTime =
        notification.content?.data?.eventDateTime;
      if (notificationEventDateTime === eventDateTime) {
        await Notifications.cancelScheduledNotificationAsync(
          notification.identifier
        );
        cancelledCount++;
      }
    }

    devLogInfo(
      `Cancelled ${cancelledCount} notifications for event ${eventDateTime}`
    );
    return cancelledCount;
  } catch (error) {
    devLogError(`Error cancelling notifications for event: ${error.message}`);
    throw error;
  }
};

export const getPermission = async () => {
  return await Notifications.getPermissionsAsync();
};

export const askPermission = async () => {
  return await Notifications.requestPermissionsAsync();
};

export const isNotificationPermissionGranted = async () => {
  const { status } = await getPermission();

  return status === "granted";
};

export const isNotificationInitialized = async () => {
  return await StorageService.getItem(notificationInitializedKey);
};

export const setNotificationInitialized = async (value) => {
  return await StorageService.setItem(notificationInitializedKey, value);
};
