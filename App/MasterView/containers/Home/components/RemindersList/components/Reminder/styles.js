import {getColor} from '@styles/helper';
import {StyleSheet} from 'react-native'


export default ({isDone} = {}) => {
    return StyleSheet.create({
        Reminder: {
            display: 'flex',
            flexDirection: 'row',
            marginRight: -15
        },
        Input: {
            marginLeft: 12,
            flexGrow: 1,
            padding: 10,
            borderBottomWidth: 1,
            ...isDone && {
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
            },
            textAlign: 'right'
        },
        TrashIcon: {
            marginRight: -30,
            marginTop: 10,
            zIndex: 999
        }
    });
};
