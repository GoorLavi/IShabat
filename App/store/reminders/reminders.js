import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default create(
  persist(
    (set, get) => ({
      reminders: [],
      lastEventId: null, // Track which event the todos belong to
      addReminder: (initialValue = "") => {
        const newReminder = {
          id: String.random(),
          value: initialValue,
          checked: false,
          isNew: initialValue === "",
        };
        set({
          reminders: [...(get().reminders || []), newReminder],
        });
        return newReminder;
      },
      setReminder: ({ isNew, ...reminder }) => {
        set({
          reminders: get().reminders.map((r) =>
            r.id === reminder.id ? reminder : r
          ),
        });
      },
      removeReminder: (id) =>
        set({ reminders: get().reminders.filter((r) => r.id !== id) }),

      // Check if all reminders are completed (checked)
      areAllCompleted: () => {
        const reminders = get().reminders;
        if (!reminders || reminders.length === 0) {
          return false; // No reminders means not complete
        }
        return reminders.every((r) => r.checked === true);
      },

      // Uncheck all reminders for the next event
      uncheckAll: () => {
        const reminders = get().reminders;
        set({
          reminders: reminders.map((r) => ({ ...r, checked: false })),
        });
      },

      // Reset todos for next event
      resetForNextEvent: (eventId) => {
        const currentEventId = get().lastEventId;
        if (currentEventId !== eventId) {
          // New event - uncheck all todos
          get().uncheckAll();
          set({ lastEventId: eventId });
        }
      },

      // Update lastEventId
      setLastEventId: (eventId) => {
        set({ lastEventId: eventId });
      },
    }),
    {
      name: "reminders",
      getStorage: () => AsyncStorage,
    }
  )
);
