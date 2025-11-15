import { cancelAllNotifications, setEvent } from "./notifications";
import { findComingEvents } from "@store/nextEvent/helper";
import { getEffectiveNotificationTimes } from "./devOverrides";
import useDeveloper from "@store/developer/developer";

/**
 * Reschedule all notifications based on current mode (dev or normal)
 * @param {string} city - User's city
 * @param {Array<number>} notificationTimes - User's notification times
 * @param {boolean} areAllTodosCompleted - Whether all todos are completed
 * @param {boolean} forceAllEvents - Force schedule all events even in dev mode
 * @returns {Promise<number>} - Number of events scheduled
 */
export const rescheduleAllNotifications = async (
  city,
  notificationTimes,
  areAllTodosCompleted,
  forceAllEvents = false
) => {
  try {
    console.log("🔄 Rescheduling all notifications...");

    // Cancel all existing notifications
    await cancelAllNotifications();

    // Get all coming events
    const events = findComingEvents();

    // Check if dev mode is active
    const { isDevMode } = useDeveloper.getState();

    // In dev mode, only schedule first event (unless forceAllEvents is true)
    // In normal mode, schedule all events
    const eventsToSchedule = (isDevMode && !forceAllEvents) ? events.slice(0, 1) : events;

    if (forceAllEvents && isDevMode) {
      console.log(
        `🔧 DEV: Force scheduling all ${eventsToSchedule.length} events (dev mode with forceAllEvents)`
      );
    } else if (isDevMode) {
      console.log(
        `🔧 DEV: Only scheduling ${eventsToSchedule.length} event (dev mode)`
      );
    } else {
      console.log(`✅ Scheduling ${eventsToSchedule.length} events (normal mode)`);
    }

    // Get effective notification times (with dev overrides if applicable)
    const effectiveTimes = getEffectiveNotificationTimes(notificationTimes);

    // Schedule all appropriate events
    for (const event of eventsToSchedule) {
      const { date, type } = event;
      const eventInTime = event[`${city}_in`];

      if (!eventInTime || eventInTime === "---") {
        console.warn(`Skipping event without entrance time: ${date}`);
        continue;
      }

      await setEvent({
        type,
        date: new Date(`${date}T${eventInTime}`),
        notificationTimes: effectiveTimes,
        areAllTodosCompleted,
        event,
        city,
      });
    }

    console.log(`✅ Successfully scheduled ${eventsToSchedule.length} events`);
    return eventsToSchedule.length;
  } catch (error) {
    console.error("Error in rescheduleAllNotifications:", error);
    throw error;
  }
};

