import React, { useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import Icon from "@commonComponents/Icon";
import { texts } from "./constants";
import getStyles from "./styles";
import useDeveloper from "@store/developer/developer";
import useUser from "@store/user/user";
import useNextEvent from "@store/nextEvent/nextEvent";
import useReminders from "@store/reminders/reminders";
import { rescheduleAllNotifications } from "@globals/notificationScheduler";
import { scheduleNotification } from "@globals/notifications";
import { getNotificationMessage } from "@globals/notificationMessages";

export default function Developer({ navigation }) {
  const styles = useMemo(() => getStyles(), []);

  const { clearOverrides } = useDeveloper();
  const { city, notificationTimes } = useUser();
  const { nextEvent, setTestEvent } = useNextEvent();
  const { resetForNextEvent } = useReminders();

  const onBack = useCallback(
    () => navigation.canGoBack() && navigation.goBack(),
    [navigation]
  );

  const handleQuickTest = useCallback(async () => {
    try {
      // Check notification permissions
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "שגיאה",
          "אין הרשאות להתראות. אנא אפשר התראות בהגדרות האפליקציה."
        );
        return;
      }

      console.log("🧪 Starting Quick Test...");
      console.log("Current time:", new Date().toISOString());

      // Calculate times
      const now = Date.now();
      const notificationTime = new Date(now + 5 * 1000); // 5 seconds from now
      const eventTime = new Date(now + 10 * 1000); // 10 seconds from now

      const todayDateString = eventTime.toISOString().split("T")[0];
      const eventTimeString = `${String(eventTime.getHours()).padStart(
        2,
        "0"
      )}:${String(eventTime.getMinutes()).padStart(2, "0")}`;

      // Event out time (1 second after in time for simplicity)
      const eventOutTime = new Date(now + 11 * 1000);
      const eventOutTimeString = `${String(eventOutTime.getHours()).padStart(
        2,
        "0"
      )}:${String(eventOutTime.getMinutes()).padStart(2, "0")}`;

      console.log(
        `📅 Test times:\n` +
          `  Notification: ${notificationTime.toISOString()}\n` +
          `  Event in: ${todayDateString} ${eventTimeString}\n` +
          `  Event out: ${todayDateString} ${eventOutTimeString}`
      );

      // Create test event object
      const testEvent = {
        date: todayDateString,
        parasha: "Test",
        heb_date: "בדיקה",
        type: "שבת",
        Jerusalem_in: eventTimeString,
        Jerusalem_out: eventOutTimeString,
        TelAviv_in: eventTimeString,
        TelAviv_out: eventOutTimeString,
        Hayfa_in: eventTimeString,
        Hayfa_out: eventOutTimeString,
        BeerSheva_in: eventTimeString,
        BeerSheva_out: eventOutTimeString,
      };

      // Inject test event into the store
      setTestEvent(testEvent);
      console.log("✅ Test event injected:", testEvent);

      // Reset todos for this test event
      resetForNextEvent(testEvent.date);

      // Schedule notification for 5 seconds from now
      const message = getNotificationMessage(
        testEvent.type,
        testEvent.parasha,
        0.083
      ); // 0.083 minutes = 5 seconds

      console.log(
        `📬 Scheduling notification for: ${notificationTime.toISOString()}`
      );
      console.log(`📬 Message: ${message.title} - ${message.body}`);

      const notificationId = await scheduleNotification({
        date: notificationTime,
        title: message.title,
        body: message.body,
      });

      console.log(`✅ Notification scheduled with ID: ${notificationId}`);

      // Double check the notification is in the future
      const timeDiff = notificationTime.getTime() - Date.now();
      console.log(
        `⏰ Time until notification: ${Math.round(timeDiff / 1000)} seconds`
      );

      // Verify it was scheduled
      const allScheduled =
        await Notifications.getAllScheduledNotificationsAsync();
      console.log(
        `📅 Total scheduled notifications: ${allScheduled.length}`,
        allScheduled.map((n) => ({
          id: n.identifier,
          trigger: n.trigger,
          content: n.content.title,
        }))
      );

      Alert.alert(
        "בדיקה הוצלחה! ✅",
        `אירוע "Test" מוצג כעת באפליקציה\n` +
          `התראה תגיע בעוד 5 שניות\n` +
          `האירוע יתרחש בעוד 10 שניות\n\n` +
          `סה"כ ${allScheduled.length} התראות מתוכננות`
      );
    } catch (error) {
      console.error("❌ Error in handleQuickTest:", error);
      Alert.alert("שגיאה", `לא ניתן לקבוע התראה: ${error.message}`);
    }
  }, [setTestEvent, resetForNextEvent]);

  const handleResetAll = useCallback(async () => {
    try {
      // Clear any overrides
      clearOverrides();

      // Reschedule ALL events (force all events even in dev mode)
      // Always pass false for areAllTodosCompleted to force scheduling
      const count = await rescheduleAllNotifications(
        city,
        notificationTimes,
        false, // Force schedule notifications regardless of todo completion
        true // forceAllEvents = true
      );

      Alert.alert("הצלחה", `${count} אירועים תוזמנו מחדש`);
    } catch (error) {
      console.error("Error resetting:", error);
      Alert.alert("שגיאה", "לא ניתן לאפס");
    }
  }, [clearOverrides, city, notificationTimes]);

  const handleViewScheduled = useCallback(async () => {
    try {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      console.log("📅 Scheduled Notifications:", scheduled);
      Alert.alert(
        "התראות מתוכננות",
        `נמצאו ${scheduled.length} התראות מתוכננות. בדוק את הקונסול לפרטים.`
      );
    } catch (error) {
      console.error("Error fetching scheduled notifications:", error);
      Alert.alert("שגיאה", "לא ניתן לטעון התראות מתוכננות");
    }
  }, []);

  const currentParasha = nextEvent?.parasha || "---";
  const currentDate = nextEvent?.date || "---";
  const currentTime = nextEvent?.[`${city}_in`] || "---";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          style={styles.backIcon}
          family="AntDesign"
          name="left"
          size={34}
          onPress={onBack}
        />
        <Text style={styles.headerTitle}>{texts.HEADER_TITLE}</Text>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.content}
      >
        {/* Current Event Info */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{texts.CURRENT_EVENT_INFO}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}>{currentParasha}</Text>
            <Text style={styles.infoLabel}>{texts.PARASHA_LABEL}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}>{currentDate}</Text>
            <Text style={styles.infoLabel}>{texts.DATE_LABEL}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}>{currentTime}</Text>
            <Text style={styles.infoLabel}>{texts.TIME_LABEL}</Text>
          </View>
        </View>

        {/* Quick Test Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{texts.QUICK_TEST_SECTION}</Text>
          <Text style={styles.infoText}>{texts.QUICK_TEST_INFO}</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleQuickTest}
          >
            <Text style={styles.actionButtonText}>
              {texts.QUICK_TEST_BUTTON}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            {texts.QUICK_ACTIONS_SECTION}
          </Text>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={handleViewScheduled}
          >
            <Text style={styles.actionButtonText}>{texts.VIEW_SCHEDULED}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonDanger]}
            onPress={handleResetAll}
          >
            <Text style={styles.actionButtonText}>{texts.CLEAR_OVERRIDES}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
