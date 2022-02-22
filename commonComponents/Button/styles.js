import {getColor} from '@styles/helper';
import {StyleSheet} from 'react-native';
import {lighten} from 'polished';

const getSize = size => {
    switch (size) {
        case 'small':
            return {minWidth: 80};
        case 'medium':
            return {minWidth: 150};
        case 'large':
            return {minWidth: 200};
    }
}

const getStyle = ({skin = 'light', disabled}) => {

    const getContainerBackgroundColor = () => {
        const color = getColor(skin);
        return !disabled ? color : lighten(.11, color);
    };
    const getContrastColor = () => getColor(skin, 'contrast');

    switch (skin) {
        case 'primary':
            return {
                container: {
                    backgroundColor: getContainerBackgroundColor(),
                },
                text: {
                    color: getContrastColor()
                },
                spinner: {
                    color: getContrastColor()
                }
            };
        case 'danger':
            return {
                container: {
                    backgroundColor: getContainerBackgroundColor(),
                },
                text: {
                    color: getContrastColor()
                },
                spinner: {
                    color: getContrastColor()
                }
            };
        case 'success':
            return {
                container: {
                    backgroundColor: getContainerBackgroundColor(),
                },
                text: {
                    color: getContrastColor()
                },
                spinner: {
                    color: getContrastColor()
                }
            };
        default:
            return {
                container: {
                    backgroundColor: getContainerBackgroundColor(),
                },
                text: {
                    color: getContrastColor()
                },
                spinner: {
                    color: getContrastColor()
                }
            };
    }
}

export default ({size = 'medium', skin, disabled} = {}) => {

    const {container: containerStyle, text: textStyle, spinner} = getStyle({skin, disabled});

    return StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            elevation: 8,
            height: 50,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 12,
            alignSelf: 'auto',
            ...(getSize(size) || {}),
            ...containerStyle
        },
        spinner,
        text: {
            fontSize: 18,
            fontWeight: "bold",
            alignSelf: "center",
            ...textStyle
        }
    });
};
