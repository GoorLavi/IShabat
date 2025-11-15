import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { texts } from "./constants";
import useReminders from "@store/reminders/reminders";
import Reminder from "./components/Reminder/Reminder";
import getStyles from "./styles";
import AddTask from "./components/AddTask/AddTask";

export default function ReminderList({ scrollViewRef }) {
  const styles = getStyles();

  const { reminders, addReminder, setReminder, removeReminder } =
    useReminders();

  const handleAddTask = useCallback(
    (taskText) => {
      if (!taskText?.trim()) return;

      // Create reminder with the text already set
      addReminder(taskText.trim());
    },
    [addReminder]
  );

  const handleShowFloatingInput = useCallback(() => {
    // Add a new empty reminder (will auto-focus due to isNew flag)
    addReminder("");
  }, [addReminder]);

  return (
    <View {...{ style: styles.RemindersList }}>
      {!!reminders?.length && (
        <View style={styles.RemindersContent}>
          <Text style={styles.RemindersHeader}>{texts.REMINDERS_HEADER}</Text>
          <View style={styles.List}>
            {reminders.map((reminder, index) => (
              <Reminder
                key={reminder.id}
                {...{ reminder, setReminder, removeReminder, scrollViewRef }}
              />
            ))}
          </View>
        </View>
      )}
      <AddTask
        {...{
          onPress: handleShowFloatingInput,
          style: styles.addTaskButton,
        }}
      />
    </View>
  );
}
