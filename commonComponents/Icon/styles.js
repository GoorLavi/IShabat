import {StyleSheet} from 'react-native';

export default ({color, disabled} = {}) => {

    const disableStyle = {
        opacity: .8
    }

    return StyleSheet.create({
        container: {
            ...disabled && disableStyle
        },
        button: {
            color,
            ...disabled && disableStyle
        }
    });
};
