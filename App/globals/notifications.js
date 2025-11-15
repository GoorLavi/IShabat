import * as Notifications from "expo-notifications";
import StorageService from "@services/storageService";
import { getEffectiveEventTime, getEffectiveEventDate } from "./devOverrides";
import { getNotificationMessage, getTimeText } from "./notificationMessages";

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
 * @param {number[]} [params.notificationTimes=[40, 20]] - Minutes before event to schedule notifications
 * @param {boolean} [params.areAllTodosCompleted=false] - If true, skips notifications
 * @param {Object} [params.event] - The full event object for dev overrides
 * @param {string} [params.city] - User's city for dev overrides
 * @returns {Promise<void>}
 */
export const setEvent = async ({
  date,
  type,
  notificationTimes = [40, 20],
  areAllTodosCompleted = false,
  event = null,
  city = null,
}) => {
  try {
    // If all todos are completed, skip scheduling notifications
    if (areAllTodosCompleted) {
      console.log(
        "All todos completed - skipping notifications for this event"
      );
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
        console.log(
          `🔧 DEV: Using overridden event - Date: ${finalDateStr}, Time: ${finalTime} => ${effectiveDate.toISOString()}`
        );
      }
    }

    if (!effectiveDate || !(effectiveDate instanceof Date)) {
      console.error("Invalid date provided to setEvent");
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
            console.warn(
              `Notification time ${minutes} minutes before event is in the past, skipping`
            );
            continue;
          }

          // Use common message function for consistency
          const message = getNotificationMessage(type, parasha, minutes);

          await scheduleNotification({
            date: notificationDate,
            title: message.title,
            groupName: identifier,
            body: message.body,
          });
        } catch (error) {
          console.error(
            `Failed to schedule notification ${minutes} minutes before event:`,
            error
          );
          // Continue with next notification even if one fails
        }
      }
    }
  } catch (error) {
    console.error("Error in setEvent:", error);
  }
};

/**
 * Schedule a single notification
 * @param {Object} params - Notification parameters
 * @param {Date} params.date - When to show the notification
 * @param {string} params.title - Notification title
 * @param {string} params.body - Notification body text
 * @returns {Promise<string>} Notification identifier
 */
export const scheduleNotification = async ({ date, title, body }) => {
  try {
    if (!date || !(date instanceof Date)) {
      throw new Error("Invalid date provided to scheduleNotification");
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: "default",
        categoryIdentifier: identifier,
        data: {
          date,
        },
        // Android only
        vibrationPattern: [0, 250, 250, 250],
      },
      trigger: { type: "date", date },
    });

    return notificationId;
  } catch (error) {
    console.error("Error scheduling notification:", error);
    throw error;
  }
};

export const getAllNotifications = async () => {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  console.log({ notifications });
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
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
