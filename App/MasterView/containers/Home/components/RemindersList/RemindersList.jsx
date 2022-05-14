import React, {useCallback, useRef} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {texts} from './constants';
import useReminders from '@store/reminders/reminders';
import Reminder from './components/Reminder/Reminder';
import getStyles from './styles';
import AddTask from './components/AddTask/AddTask';


export default function ReminderList() {

    const styles = getStyles();

    const {reminders, addReminder, setReminder, removeReminder} = useReminders();

    const scrollViewRef = useRef()

    const onCreateNewReminder = useCallback(async () => {
        await addReminder();
        setTimeout(() => {
            scrollViewRef.current.scrollToEnd({animated: true});
        }, 400);

    }, []);

    return <View {...{style: styles.RemindersList}}>
        {
            !!reminders?.length && <View style={styles.RemindersContent}>
                <Text style={styles.RemindersHeader}>{texts.REMINDERS_HEADER}</Text>
                <View {...{style: styles.ScrollWrapper}}>
                    <ScrollView{...{ref: scrollViewRef, style: styles.List}} automaticallyAdjustContentInsets>
                        {reminders.map(reminder => <Reminder {...{
                            key: reminder.id,
                            reminder,
                            setReminder,
                            removeReminder
                        }}/>)}
                    </ScrollView>
                </View>
            </View>
        }
        <AddTask {...{onPress: onCreateNewReminder, style: styles.addTaskButton}} />
    </View>
}

