import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default create(
  persist(
    (set, get) => ({
      isDevMode: false,
      eventTimeOverride: null, // e.g., "21:30"
      eventDateOverride: null, // e.g., "2025-11-01" - override to use current date
      notificationTestTimes: null, // e.g., [2, 1]
      mockCurrentTime: null, // Date object for advanced testing

      setDevMode: (enabled) => {
        set({ isDevMode: enabled });
        // Clear overrides when dev mode is disabled
        if (!enabled) {
          get().clearOverrides();
        }
      },

      setEventTimeOverride: (time) => set({ eventTimeOverride: time }),

      setEventDateOverride: (date) => set({ eventDateOverride: date }),

      setNotificationTestTimes: (times) =>
        set({ notificationTestTimes: times }),

      setMockCurrentTime: (time) => set({ mockCurrentTime: time }),

      clearOverrides: () =>
        set({
          eventTimeOverride: null,
          eventDateOverride: null,
          notificationTestTimes: null,
          mockCurrentTime: null,
        }),
    }),
    {
      name: "developer",
      getStorage: () => AsyncStorage,
    }
  )
);
