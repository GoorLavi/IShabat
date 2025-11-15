import events from "./events.json";

export const findComingEvents = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return events.filter((e) => {
    const eventDate = new Date(e.date);
    eventDate.setDate(eventDate.getDate() - 1);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() >= today.getTime();
  });
};

export const findNextEvent = () => {
  return findComingEvents()?.[0];
};

export const findPastEvents = () => {
  const current = new Date().getTime();
  return events.filter((e) => new Date(e.date).getTime() - current <= 0);
};

export const findLastPastEvent = () => {
  const pastEvents = findPastEvents();
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
