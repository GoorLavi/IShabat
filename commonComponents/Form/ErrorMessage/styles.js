import {getColor} from '@styles/helper';
import {StyleSheet} from 'react-native';

export default ({} = {}) => {
    return StyleSheet.create({
        container: {},
        text: {
            color: getColor('danger')
        }
    });
};
