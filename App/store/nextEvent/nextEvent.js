import create from "zustand";
import {
  findNextEvent,
  findLastPastEvent,
  shouldResetTodosAfterEntrance,
} from "./helper";

// This will be imported dynamically to avoid circular dependencies
let remindersStore = null;
let userStore = null;

const initStores = () => {
  if (!remindersStore) {
    remindersStore = require("../reminders/reminders").default;
  }
  if (!userStore) {
    userStore = require("../user/user").default;
  }
};

/**
 * Check if todos should be reset after the last past event's entrance time has passed
 * and reset them for the next upcoming event
 */
const checkAndResetTodos = () => {
  try {
    initStores();
    const lastPastEvent = findLastPastEvent();
    const { city } = userStore.getState();
    const { resetForNextEvent, lastEventId } = remindersStore.getState();

    // Check if entrance time of last past event has passed
    if (lastPastEvent && shouldResetTodosAfterEntrance(lastPastEvent, city)) {
      // Get the next upcoming event
      const nextEventData = findNextEvent();

      // Reset todos for the next event if it's different from the current one
      if (nextEventData && lastEventId !== nextEventData.date) {
        resetForNextEvent(nextEventData.date);
      }
    }
  } catch (error) {
    console.error("Error checking and resetting todos:", error);
  }
};

export default create((set) => {
  const nextEvent = findNextEvent();

  // Initial check on store creation
  checkAndResetTodos();

  return {
    nextEvent,
    waiting: false,
    refreshNextEvent: async () => {
      set({ waiting: true });

      // Check and reset todos when refreshing
      checkAndResetTodos();

      const nextEvent = findNextEvent();

      set({ nextEvent, waiting: false });
    },
    setTestEvent: (testEvent) => {
      set({ nextEvent: testEvent });
    },
  };
});
