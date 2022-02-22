import {getColor} from '@styles/helper';
import {StyleSheet} from 'react-native'

export default ({} = {}) => {
    return StyleSheet.create({
        container: {
            backgroundColor: getColor('background'),
            height: '100%',
            width: '100%'
        },
        initLoader: {
            height: '100%',
            width: '100%'
        }
    });
};
