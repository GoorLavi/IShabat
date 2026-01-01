import create from "zustand";
import {
  findNextEvent,
  findLastPastEvent,
  shouldResetTodosAfterEntrance,
} from "./helper";
import { getEventDateTime } from "@globals/utils";
import { devLogInfo, devLogError } from "@utils/devLogger";

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
 * Check if todos should be reset when the event changes
 * Compares stored lastEventDateTime with current upcoming event
 */
const checkAndResetTodos = () => {
  try {
    initStores();
    const { city } = userStore.getState();
    const { resetForNextEvent, lastEventDateTime } = remindersStore.getState();

    // Get the next upcoming event
    const nextEventData = findNextEvent(city);

    if (nextEventData && city) {
      const eventInTime = nextEventData[`${city}_in`];

      if (eventInTime && eventInTime !== "---") {
        // Create event date+time string for the upcoming event
        const nextEventDateTime = getEventDateTime(
          nextEventData.date,
          eventInTime
        );

        // Reset todos if they don't match the current upcoming event
        if (lastEventDateTime !== nextEventDateTime) {
          resetForNextEvent(nextEventDateTime);
          devLogInfo(
            `🔄 Event changed - resetting todos for ${nextEventData.date}`
          );
        }
      }
    }
  } catch (error) {
    devLogError(`Error checking and resetting todos: ${error.message}`);
  }
};

export default create((set) => {
  // Get initial city from user store
  initStores();
  const { city } = userStore?.getState() || {};
  const nextEvent = city ? findNextEvent(city) : null;

  // Initial check on store creation
  checkAndResetTodos();

  return {
    nextEvent,
    waiting: false,
    refreshNextEvent: async () => {
      set({ waiting: true });

      // Check and reset todos when refreshing
      checkAndResetTodos();

      // Get current city
      initStores();
      const { city } = userStore?.getState() || {};
      const nextEvent = city ? findNextEvent(city) : null;

      set({ nextEvent, waiting: false });
    },
    setTestEvent: (testEvent) => {
      set({ nextEvent: testEvent });
    },
  };
});
