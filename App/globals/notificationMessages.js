import { devLogInfo } from "@utils/devLogger";
import { formatMinutesToReadableTime, formatTimeHHMM } from "./utils";

/**
 * Get notification title and body message in Hebrew
 * @param {string} eventType - Event type ('שבת', 'חג', 'שבת חג')
 * @param {string} parasha - Parasha name
 * @param {number} minutesBefore - Minutes before event starts
 * @param {Date} [notificationDate] - When the notification will fire (optional for logging)
 * @param {Date} [eventDate] - When the event starts (optional for logging)
 * @returns {Object} - { title, body }
 */
export const getNotificationMessage = (
  eventType,
  parasha,
  minutesBefore,
  notificationDate = null,
  eventDate = null
) => {
  const isShabat = eventType === "שבת" || eventType === "שבת חג";
  const isHoliday = eventType === "חג";

  // Title based on event type
  const title = isShabat ? "שבת שלום" : isHoliday ? "חג שמח" : "שבת שלום";

  // Event name for body
  const eventName = isShabat ? "שבת" : "חג";

  // Build body message
  let body = "";
  if (parasha) {
    body = `${eventName} ${parasha} `;
  } else {
    body = `${eventName} `;
  }
  body += `תיכנס בעוד ${minutesBefore} דקות`;

  // Log in English (parasha name and event type for debugging)
  const eventTypeText = isShabat
    ? "Shabbat"
    : isHoliday
    ? "Holiday"
    : "Shabbat";

  // Build enhanced log message
  let logMessage = `Scheduling notification: ${eventTypeText}${
    parasha ? ` ${parasha}` : ""
  }`;

  if (notificationDate && eventDate) {
    // Enhanced format with times and countdown
    const notifTime = formatTimeHHMM(notificationDate);
    const eventTime = formatTimeHHMM(eventDate);

    // Calculate time from now
    const minutesFromNow = Math.floor(
      (notificationDate.getTime() - Date.now()) / (1000 * 60)
    );
    const timeFromNow = formatMinutesToReadableTime(minutesFromNow).formatted;

    logMessage += ` - will trigger at ${notifTime} (${minutesBefore} min before event at ${eventTime}) - fires in ${timeFromNow}`;
  } else {
    // Fallback to old format if dates not provided
    const timeString = formatMinutesToReadableTime(minutesBefore).formatted;
    logMessage += ` - ${timeString} before event`;
  }

  devLogInfo(logMessage);

  return { title, body };
};

/**
 * Get time text in Hebrew for notification messages
 * @param {number} minutes - Minutes value
 * @returns {string} - Hebrew time text
 */
export const getTimeText = (minutes) => {
  if (minutes === 60) return "שעה";
  if (minutes === 30) return "חצי שעה";
  if (minutes === 40) return "40 דקות";
  if (minutes === 20) return "20 דקות";
  if (minutes === 2) return "2 דקות";
  if (minutes === 1) return "דקה";
  return `${minutes} דקות`;
};
