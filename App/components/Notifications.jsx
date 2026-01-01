import { useEffect } from "react";
import {
  printAllExistingNotifications,
  isNotificationPermissionGranted,
  askPermission,
} from "@globals/notifications";
import { rescheduleAllNotifications } from "@globals/notificationScheduler";
import useUser from "@store/user/user";
import useReminders from "@store/reminders/reminders";
import useNextEvent from "@store/nextEvent/nextEvent";
import useDeveloper from "@store/developer/developer";
import { devLogInfo } from "@utils/devLogger";

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
      devLogInfo("Initializing notifications");
      await printAllExistingNotifications();

      // const initialized = await isNotificationInitialized();

      let isPermissionGranted = await isNotificationPermissionGranted();

      if (!isPermissionGranted) {
        isPermissionGranted = await askPermission();

        devLogInfo(`Permission granted: ${isPermissionGranted}`);
        if (!isPermissionGranted) {
          alert("האפליקציה צריכה אישור להשתמש בהתראות");
          return;
        }
      }

      // Always reschedule when dependencies change, not just on initial setup
      const allCompleted = areAllCompleted();
      devLogInfo(`All todos completed: ${allCompleted}`);
      await rescheduleAllNotifications(city, notificationTimes, allCompleted);

      // Only set initialized flag on first run
      // if (!initialized) {
      //   await setNotificationInitialized(true);
      // }
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
