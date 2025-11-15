import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cities from "./cities.json";

export default create(
  persist(
    (set, get) => ({
      city: cities[0],
      isOnboarded: false,
      notificationTimes: [40, 20], // in minutes before event
      setCity: (city) => set({ city }),
      setIsOnboarded: (value) => set({ isOnboarded: value }),
      setNotificationTimes: (times) => set({ notificationTimes: times }),
    }),
    {
      name: "user",
      getStorage: () => AsyncStorage,
    }
  )
);
