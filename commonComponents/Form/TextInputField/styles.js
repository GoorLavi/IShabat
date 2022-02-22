import {getColor} from '@styles/helper';
import {StyleSheet} from 'react-native';

export default ({} = {}) => {
    return StyleSheet.create({
        container: {
            display: 'flex',
            marginBottom: 10,
            width: 230
        },
        label: {
            fontWeight: 'bold',
            marginBottom: 5
        },
        textInput: {
            backgroundColor: getColor('light'),
            height: 40,
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10
        },
    });
};
