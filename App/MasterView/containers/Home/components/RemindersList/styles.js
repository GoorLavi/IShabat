import {getColor} from '@styles/helper';
import {StyleSheet} from 'react-native'


export default ({} = {}) => {
    return StyleSheet.create({
        RemindersList: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: 40,
            width: '90%',
            paddingHorizontal: 20,
            flexGrow: 1,
            flexShrink: 1
        },
        RemindersContent: {
            display: 'flex',
            paddingBottom: 0,
            marginBottom: 0,
            flexGrow: 1,
            flexShrink: 1,
        },
        ScrollWrapper: {
            display: 'flex',
            flexShrink: 1,
            flexGrow: 1,
        },
        List: {
            flexGrow: 1,
            flexShrink: 1,
            width: '100%',
            display: 'flex',
            marginBottom: 10
        },
        RemindersHeader: {
            width: '100%',
            textAlign: 'right',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'shofar',
        },
        addTaskButton: {
            height: 50
        }
    });
};
