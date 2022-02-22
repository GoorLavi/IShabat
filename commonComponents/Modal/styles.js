import {getColor} from '@styles/helper';
import {StyleSheet} from 'react-native';
import {transparentize} from 'polished';


export default ({} = {}) => {
    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: transparentize(.3, getColor('dark')),
        },
        modalView: {
            maxWidth: 400,
            minHeight: 300,
            backgroundColor: getColor('light'),
            borderRadius: 20,
            shadowColor: getColor('dark'),
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            display: 'flex'
        },
        content: {
            flexGrow: 1,
            padding: 10
        },
        footer: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            paddingBottom: 10
        },
        header: {
            marginBottom: 10,
            flexShrink: 0,
            backgroundColor: getColor('primary'),
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            overflow: 'hidden',
            padding: 10,
            display: 'flex',
            flexDirection: 'row'
        },
        closeHeaderButton: {
            marginLeft: 'auto'
        },
        headerText: {
            fontSize: 20,
            color: getColor('primary', 'contrast'),
        }
    });
};
