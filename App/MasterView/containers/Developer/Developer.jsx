import React, { useMemo, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Clipboard,
} from "react-native";
import * as Notifications from "expo-notifications";
import Icon from "@commonComponents/Icon";
import { texts } from "./constants";
import getStyles from "./styles";
import useDeveloper from "@store/developer/developer";
import useUser from "@store/user/user";
import useNextEvent from "@store/nextEvent/nextEvent";
import useReminders from "@store/reminders/reminders";
import useDevLogs from "@store/devLogs/devLogs";
import { rescheduleAllNotifications } from "@globals/notificationScheduler";
import { scheduleNotification } from "@globals/notifications";
import { getNotificationMessage } from "@globals/notificationMessages";
import { getNextScheduledNotification } from "@globals/utils";
import { devLogInfo, devLogError } from "@utils/devLogger";

export default function Developer({ navigation }) {
  const styles = useMemo(() => getStyles(), []);
  const scrollViewRef = useRef(null);

  const { clearOverrides } = useDeveloper();
  const { city, notificationTimes } = useUser();
  const { nextEvent, setTestEvent } = useNextEvent();
  const { resetForNextEvent } = useReminders();
  const { logs, clearLogs } = useDevLogs();

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (scrollViewRef.current && logs.length > 0) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [logs]);

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

      devLogInfo("🧪 Starting Quick Test...");
      devLogInfo(`Current time: ${new Date().toISOString()}`);

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

      devLogInfo("📅 Test times:");
      devLogInfo(`  Notification: ${notificationTime.toISOString()}`);
      devLogInfo(`  Event in: ${todayDateString} ${eventTimeString}`);
      devLogInfo(`  Event out: ${todayDateString} ${eventOutTimeString}`);

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
      devLogInfo(`✅ Test event injected: ${JSON.stringify(testEvent)}`);

      // Reset todos for this test event
      resetForNextEvent(testEvent.date);

      // Schedule notification for 5 seconds from now
      const message = getNotificationMessage(
        testEvent.type,
        testEvent.parasha,
        0.083,
        notificationTime,
        eventTime
      ); // 0.083 minutes = 5 seconds

      devLogInfo(
        `📬 Scheduling notification for: ${notificationTime.toISOString()}`
      );
      devLogInfo(`📬 Message: ${message.title} - ${message.body}`);

      const notificationId = await scheduleNotification({
        date: notificationTime,
        title: message.title,
        body: message.body,
      });

      devLogInfo(`✅ Notification scheduled with ID: ${notificationId}`);

      // Double check the notification is in the future
      const timeDiff = notificationTime.getTime() - Date.now();
      devLogInfo(
        `⏰ Time until notification: ${Math.round(timeDiff / 1000)} seconds`
      );

      // Verify it was scheduled
      const allScheduled =
        await Notifications.getAllScheduledNotificationsAsync();
      devLogInfo(`📅 Total scheduled notifications: ${allScheduled.length}`);

      Alert.alert(
        "בדיקה הוצלחה! ✅",
        `אירוע "Test" מוצג כעת באפליקציה\n` +
          `התראה תגיע בעוד 5 שניות\n` +
          `האירוע יתרחש בעוד 10 שניות\n\n` +
          `סה"כ ${allScheduled.length} התראות מתוכננות`
      );
    } catch (error) {
      devLogError(`❌ Error in handleQuickTest: ${error.message}`);
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
      devLogError(`Error resetting: ${error.message}`);
      Alert.alert("שגיאה", "לא ניתן לאפס");
    }
  }, [clearOverrides, city, notificationTimes]);

  const handleViewScheduled = useCallback(async () => {
    try {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      devLogInfo(`📅 Total scheduled notifications: ${scheduled.length}`);

      devLogInfo(JSON.stringify(scheduled, null, 2));
      Alert.alert(
        "התראות מתוכננות",
        `נמצאו ${scheduled.length} התראות מתוכננות. בדוק את היומנים לפרטים.`
      );
    } catch (error) {
      devLogError(`Error fetching scheduled notifications: ${error.message}`);
      Alert.alert("שגיאה", "לא ניתן לטעון התראות מתוכננות");
    }
  }, []);

  const handleViewNext = useCallback(async () => {
    try {
      const result = await getNextScheduledNotification();

      if (!result.success) {
        Alert.alert(
          result.message.includes("past")
            ? "No Future Notifications"
            : "No Notifications",
          result.message
        );
        return;
      }

      // Log details
      devLogInfo("=== NEXT NOTIFICATION ===");
      devLogInfo(`Event: ${result.title}`);
      devLogInfo(`Trigger Date (ISO): ${result.triggerDate.toISOString()}`);
      devLogInfo(`Trigger Date (Readable): ${result.readableDate}`);
      devLogInfo(
        `Time from now: ${result.compactTime} (${result.minutesUntil} minutes)`
      );
      devLogInfo(`Notification ID: ${result.identifier}`);

      // Show alert
      Alert.alert(
        "Next Notification",
        `Event: ${result.title}\n\n` +
          `Fires at: ${result.readableDate}\n\n` +
          `Time from now: ${result.compactTime}\n` +
          `(${result.minutesUntil} minutes)\n\n` +
          `ID: ${result.identifier.substring(0, 16)}...`
      );
    } catch (error) {
      devLogError(`Error viewing next notification: ${error.message}`);
      Alert.alert("Error", "Failed to load next notification");
    }
  }, []);

  const handleCopyAllLogs = useCallback(() => {
    try {
      if (logs.length === 0) {
        Alert.alert("No Logs", "There are no logs to copy");
        return;
      }

      // Format logs as plain text
      const formattedLogs = logs
        .map(
          (log) =>
            `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`
        )
        .join("\n");

      Clipboard.setString(formattedLogs);
      Alert.alert("Success", `Copied ${logs.length} log entries to clipboard`);
    } catch (error) {
      Alert.alert("Error", "Failed to copy logs to clipboard");
    }
  }, [logs]);

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
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={handleViewNext}
          >
            <Text style={styles.actionButtonText}>{texts.VIEW_NEXT}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonDanger]}
            onPress={handleResetAll}
          >
            <Text style={styles.actionButtonText}>{texts.CLEAR_OVERRIDES}</Text>
          </TouchableOpacity>
        </View>

        {/* Logs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{texts.LOGS_SECTION}</Text>

          <View style={styles.logsWrapper}>
            <ScrollView
              ref={scrollViewRef}
              style={styles.logsContainer}
              nestedScrollEnabled={true}
            >
              {logs.length === 0 ? (
                <Text style={styles.logEmpty}>No logs yet</Text>
              ) : (
                logs.map((log) => (
                  <View key={log.id} style={styles.logEntry}>
                    <Text style={styles.logTimestamp}>[{log.timestamp}]</Text>
                    <Text
                      style={[
                        styles.logLevel,
                        log.level === "error" && styles.logLevelError,
                        log.level === "warn" && styles.logLevelWarn,
                      ]}
                    >
                      {log.level.toUpperCase()}
                    </Text>
                    <Text style={styles.logMessage}>{log.message}</Text>
                  </View>
                ))
              )}
            </ScrollView>

            {logs.length > 0 && (
              <TouchableOpacity
                style={styles.copyAllButton}
                onPress={handleCopyAllLogs}
              >
                <Icon
                  family="MaterialIcons"
                  name="content-copy"
                  size={16}
                  color="#FFFFFF"
                />
                <Text style={styles.copyAllButtonText}>Copy All</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={clearLogs}
          >
            <Text style={styles.actionButtonText}>{texts.CLEAR_LOGS}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
