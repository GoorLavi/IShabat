import events from "./events.json";
import { createEventDate } from "@globals/utils";

export const findComingEvents = (city) => {
  const now = new Date();

  return events.filter((e) => {
    const eventTime = e[`${city}_in`];

    if (!eventTime || eventTime === "---") return false;

    const eventDateTime = createEventDate(e.date, eventTime);
    return eventDateTime.getTime() > now.getTime();
  });
};

export const findNextEvent = (city) => {
  return findComingEvents(city)?.[0];
};

export const findPastEvents = (city) => {
  const now = new Date();

  return events.filter((e) => {
    const eventTime = e[`${city}_in`];

    if (!eventTime || eventTime === "---") return false;

    const eventDateTime = createEventDate(e.date, eventTime);
    return eventDateTime.getTime() <= now.getTime();
  });
};

export const findLastPastEvent = (city) => {
  const pastEvents = findPastEvents(city);
  return pastEvents[pastEvents.length - 1]; // Last event in past events array
};

/**
 * Check if we should reset todos - triggers after event entrance time has passed
 * @param {Object} event - The event to check (should be a past event)
 * @param {string} city - User's selected city (e.g., 'Jerusalem', 'TelAviv')
 * @returns {boolean} True if entrance time has passed and todos should reset
 */
export const shouldResetTodosAfterEntrance = (event, city) => {
  if (!event || !city) return false;

  const entranceTime = event[`${city}_in`];
  if (!entranceTime || entranceTime === "---") return false;

  // Parse the event date and entrance time
  const eventDate = new Date(event.date);
  const [hours, minutes] = entranceTime.split(":").map(Number);

  // Set the entrance time on the event date
  const entranceDateTime = new Date(eventDate);
  entranceDateTime.setHours(hours, minutes, 0, 0);

  // Check if current time is past the entrance time
  const now = new Date();
  return now.getTime() > entranceDateTime.getTime();
};
