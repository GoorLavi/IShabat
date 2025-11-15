import * as Notifications from "expo-notifications";
import {
  setEvent,
  scheduleNotification,
  cancelAllNotifications,
} from "../notifications";

// Mock the notifications module
jest.mock("expo-notifications");

describe("Notifications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Notifications.scheduleNotificationAsync.mockResolvedValue(
      "notification-id"
    );
  });

  describe("setEvent", () => {
    it("should schedule notifications for each notification time", async () => {
      const eventDate = new Date("2025-12-06T16:00:00Z");
      const notificationTimes = [40, 20]; // 40 min and 20 min before

      await setEvent({
        date: eventDate,
        type: "שבת",
        notificationTimes,
        areAllTodosCompleted: false,
      });

      // Should schedule 2 notifications (one for each time)
      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledTimes(2);

      // Check first notification (40 minutes before)
      const firstCall =
        Notifications.scheduleNotificationAsync.mock.calls[0][0];
      const firstNotificationTime = new Date(firstCall.trigger.date);
      const expectedFirstTime = new Date(eventDate.getTime() - 40 * 60 * 1000);

      expect(
        Math.abs(firstNotificationTime.getTime() - expectedFirstTime.getTime())
      ).toBeLessThan(1000);
      expect(firstCall.content.title).toBe("שבת שלום");
      expect(firstCall.content.body).toContain("40 דקות");

      // Check second notification (20 minutes before)
      const secondCall =
        Notifications.scheduleNotificationAsync.mock.calls[1][0];
      const secondNotificationTime = new Date(secondCall.trigger.date);
      const expectedSecondTime = new Date(eventDate.getTime() - 20 * 60 * 1000);

      expect(
        Math.abs(
          secondNotificationTime.getTime() - expectedSecondTime.getTime()
        )
      ).toBeLessThan(1000);
      expect(secondCall.content.body).toContain("20 דקות");
    });

    it("should skip notifications if all todos are completed", async () => {
      const eventDate = new Date("2025-12-06T16:00:00Z");

      await setEvent({
        date: eventDate,
        type: "שבת",
        notificationTimes: [40, 20],
        areAllTodosCompleted: true,
      });

      expect(Notifications.scheduleNotificationAsync).not.toHaveBeenCalled();
    });

    it("should use default notification times if not provided", async () => {
      const eventDate = new Date("2025-12-06T16:00:00Z");

      await setEvent({
        date: eventDate,
        type: "שבת",
        areAllTodosCompleted: false,
      });

      // Should use default [40, 20]
      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledTimes(2);
    });

    it("should handle holiday type correctly", async () => {
      const eventDate = new Date("2025-12-06T16:00:00Z");

      await setEvent({
        date: eventDate,
        type: "חג",
        notificationTimes: [40],
        areAllTodosCompleted: false,
      });

      const call = Notifications.scheduleNotificationAsync.mock.calls[0][0];
      expect(call.content.title).toBe("חג שמח");
      expect(call.content.body).toContain("החג");
    });

    it("should handle Shabbat holiday type correctly", async () => {
      const eventDate = new Date("2025-12-06T16:00:00Z");

      await setEvent({
        date: eventDate,
        type: "שבת חג",
        notificationTimes: [40],
        areAllTodosCompleted: false,
      });

      const call = Notifications.scheduleNotificationAsync.mock.calls[0][0];
      expect(call.content.title).toBe("שבת שלום");
    });

    it("should skip notifications with invalid times (0 or negative)", async () => {
      const eventDate = new Date("2025-12-06T16:00:00Z");

      await setEvent({
        date: eventDate,
        type: "שבת",
        notificationTimes: [40, 0, -10, 20],
        areAllTodosCompleted: false,
      });

      // Should only schedule for 40 and 20
      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledTimes(2);
    });
  });

  describe("scheduleNotification", () => {
    it("should schedule notification with correct structure", async () => {
      const date = new Date("2025-12-06T16:00:00Z");

      await scheduleNotification({
        date,
        title: "Test Title",
        body: "Test Body",
      });

      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
        content: {
          title: "Test Title",
          body: "Test Body",
          sound: "default",
          categoryIdentifier: "shabat",
          data: { date },
          vibrationPattern: [0, 250, 250, 250],
        },
        trigger: { type: "date", date },
      });
    });
  });

  describe("cancelAllNotifications", () => {
    it("should cancel all scheduled notifications", async () => {
      await cancelAllNotifications();

      expect(
        Notifications.cancelAllScheduledNotificationsAsync
      ).toHaveBeenCalled();
    });
  });
});
