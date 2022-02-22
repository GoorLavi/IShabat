import {getColor} from '@styles/helper';
import {StyleSheet} from 'react-native'

export default ({} = {}) => {
    return StyleSheet.create({
        container: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            backgroundColor: getColor('background'),
            padding: 20,
        },
        header: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 60
        },
        content: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flex: 1
        },
        backIcon: {
            position: 'absolute',
            left: 0
        },
        headerTitle: {
            fontSize: 35
        },
        saveButton: {
            margin: 'auto'
        }
    });
};
