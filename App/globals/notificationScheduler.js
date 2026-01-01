import { cancelAllNotifications, setEvent } from "./notifications";
import { findComingEvents } from "@store/nextEvent/helper";
import { getEffectiveNotificationTimes } from "./devOverrides";
import useReminders from "@store/reminders/reminders";
import { createEventDate } from "./utils";
import { devLogInfo, devLogWarn, devLogError } from "@utils/devLogger";

/**
 * Reschedule all notifications
 * @param {string} city - User's city
 * @param {Array<number>} notificationTimes - User's notification times
 * @returns {Promise<number>} - Number of events scheduled
 */
export const rescheduleAllNotifications = async (city, notificationTimes) => {
  try {
    devLogInfo("🔄 Rescheduling all notifications...");

    // Cancel all existing notifications
    await cancelAllNotifications();

    // Get all coming events for the user's city
    const events = findComingEvents(city);

    devLogInfo(`Found ${events?.length} events in JSON file`);

    // Get effective notification times (with dev overrides if applicable)
    const effectiveTimes = getEffectiveNotificationTimes(notificationTimes);

    // Check if all todos are completed
    const { areAllCompleted } = useReminders.getState();
    const allComplete = areAllCompleted();

    // Schedule all appropriate events
    for (const event of events) {
      const { date, type } = event;
      const eventInTime = event[`${city}_in`];

      if (!eventInTime || eventInTime === "---") {
        devLogWarn(`Skipping event without entrance time: ${date}`);
        continue;
      }

      await setEvent({
        type,
        date: createEventDate(date, eventInTime),
        notificationTimes: effectiveTimes,
        areAllTodosCompleted: allComplete,
        event,
        city,
      });
    }

    devLogInfo(`✅ Successfully scheduled ${events.length} events`);
    return events.length;
  } catch (error) {
    devLogError(`Error in rescheduleAllNotifications: ${error.message}`);
    throw error;
  }
};
