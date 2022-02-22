import {getColor} from '@styles/helper';
import {StyleSheet} from 'react-native';
import {transparentize} from 'polished';


export default ({skin} = {}) => {

    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: transparentize(0.3, getColor('dark', 'darker'))
        },
        modalView: {
            maxWidth: 300,
            minHeight: 150,
            backgroundColor: getColor('light'),
            borderRadius: 20,
            overflow: 'hidden',
            shadowColor: getColor('light', 'dark'),
            shadowOffset: {
                width: 0,
                height: 2
            },
            paddingBottom: 15,
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            display: 'flex'
        },
        content: {
            marginBottom: 25,
            paddingHorizontal: 15,
        },
        closeHeaderButton: {
            marginLeft: 'auto'
        },
        footer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexShrink: 0,
            justifyContent: 'space-evenly'
        },
        header: {
            marginBottom: 15,
            flexShrink: 0,
            flexGrow: 0,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 10,
            backgroundColor: getColor(skin || 'primary'),
            alignItems: 'center',
            height: 50
        },
        message: {
            fontSize: 18
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: getColor('light')
        },
        providerContainer: {
            height: '100%',
            width: '100%'
        }
    });
};
