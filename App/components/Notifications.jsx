import { useEffect } from "react";
import {
  getAllNotifications,
  isNotificationPermissionGranted,
  isNotificationInitialized,
  askPermission,
  setNotificationInitialized,
} from "@globals/notifications";
import { rescheduleAllNotifications } from "@globals/notificationScheduler";
import useUser from "@store/user/user";
import useReminders from "@store/reminders/reminders";
import useNextEvent from "@store/nextEvent/nextEvent";
import useDeveloper from "@store/developer/developer";

export default () => {
  const { city, notificationTimes } = useUser();
  const { areAllCompleted } = useReminders();
  const { nextEvent } = useNextEvent();
  const {
    isDevMode,
    notificationTestTimes,
    eventDateOverride,
    eventTimeOverride,
  } = useDeveloper();

  useEffect(() => {
    (async () => {
      await getAllNotifications();

      const initialized = await isNotificationInitialized();

      let isPermissionGranted = await isNotificationPermissionGranted();

      if (!isPermissionGranted) {
        isPermissionGranted = await askPermission();

        console.log({ isPermissionGranted });
        if (!isPermissionGranted) {
          alert("האפליקציה צריכה אישור להשתמש בהתראות");
          return;
        }
      }

      if (!initialized) {
        const allCompleted = areAllCompleted();
        await rescheduleAllNotifications(city, notificationTimes, allCompleted);
        await setNotificationInitialized(true);
      }
    })();
  }, [
    city,
    notificationTimes,
    nextEvent?.date,
    nextEvent?.TelAviv_in,
    isDevMode,
    notificationTestTimes,
    eventDateOverride,
    eventTimeOverride,
  ]); // Also trigger when event date/time changes or dev mode changes

  return null;
};
