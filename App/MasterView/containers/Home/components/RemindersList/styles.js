import {getColor} from '@styles/helper';
import {StyleSheet, Dimensions} from 'react-native'


export default ({} = {}) => {
    return StyleSheet.create({
        RemindersList: {
            marginTop: 40,
            flexDirection: 'column',
            display: 'flex',
            width: '90%',
            paddingHorizontal: 20,
            // marginBottom: 200
        },
        List: {
            width: '100%',
            marginBottom: 20,
            display: 'flex',
            marginTop: 10,

        },
        RemindersHeader: {
            textAlign: 'right',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'shofar',
        }
    });
};
