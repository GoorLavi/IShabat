import React, {useCallback} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {texts} from './constants';
import useReminders from '@store/reminders/reminders';
import Reminder from './components/Reminder/Reminder';
import getStyles from './styles';
import AddTask from './components/AddTask/AddTask';


export default function ReminderList() {

    const styles = getStyles();

    const {reminders, addReminder, setReminder, removeReminder} = useReminders();


    return <View {...{style: styles.RemindersList}}>
        {
            !!reminders?.length && <>
                <Text style={styles.RemindersHeader}>{texts.REMINDERS_HEADER}</Text>
                {/*<View {...{style: styles.ScrollWrapper}}>*/}
                {/*<ScrollView*/}
                {/*    // contentContainerStyle={styles.List}*/}
                {/*    {...{*/}
                {/*        contentContainerStyle: {*/}
                {/*            flexGrow: 1,*/}
                {/*            flexShrink: 1,*/}
                {/*            width: '100%',*/}
                {/*            display: 'flex',*/}
                {/*            // height: '60%'*/}
                {/*        },*/}
                {/*        // style: {flexGrow: 1, flexShrink:1 , width: '100%', display: 'flex'}*/}
                {/*    }}*/}
                {/*    automaticallyAdjustContentInsets*/}
                {/*>*/}
                    <FlatList
                        data={reminders.map(reminder => ({
                            key: reminder.id,
                            reminder,
                            setReminder,
                            removeReminder
                        }))}
                        renderItem={Reminder}
                    />

                {/*</ScrollView>*/}
            </>
        }
        <AddTask {...{onPress: addReminder, style: styles.addTaskButton}} />
    </View>
}

// {/*<FlatList*/}
// {/*    data={reminders.map(reminder => ({*/}
// {/*        key: reminder.id,*/}
// {/*        reminder,*/}
// {/*        setReminder,*/}
// {/*        removeReminder*/}
// {/*    }))}*/}
// {/*    renderItem={Reminder}*/}
// />
// {/*</View>*/}
