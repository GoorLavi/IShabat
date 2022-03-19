import {getColor} from '@styles/helper';
import {StyleSheet, Dimensions} from 'react-native'


export default ({} = {}) => {
    return StyleSheet.create({
        RemindersList: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: 40,
            width: '90%',
            paddingHorizontal: 20,
        },
        ScrollWrapper: {
            flexGrow: 1,
            flexShrink: 1,
            display: 'flex',
            // overflow: 'hidden'
        },
        List: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginBottom: 20,
        },
        RemindersHeader: {
            width: '100%',
            textAlign: 'right',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'shofar',
            // flexGrow: 0.5
        },
        addTaskButton: {
            height: 50
        }
    });
};
