import React, {useCallback} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {texts} from './constants';
import useReminders from '@store/reminders/reminders';
import Reminder from './components/Reminder/Reminder';
import getStyles from './styles';
import AddTask from './components/AddTask/AddTask';


export default function ReminderList() {

    const styles = getStyles();

    const {reminders, addReminder, setReminder, removeReminder} = useReminders();


    return <ScrollView {...{style: styles.RemindersList}}>
        {
            !!reminders?.length &&
            <>
                <Text style={styles.RemindersHeader}>{texts.REMINDERS_HEADER}</Text>
                <View style={styles.List}>
                    {reminders.map(reminder => <Reminder {...{
                        key: reminder.id,
                        reminder,
                        setReminder,
                        removeReminder
                    }}/>)}
                </View>
            </>
        }
        <AddTask {...{onPress: addReminder}} />
    </ScrollView>
}
