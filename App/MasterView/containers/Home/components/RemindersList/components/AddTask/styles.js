import {getColor} from '@styles/helper';
import {StyleSheet} from 'react-native'


export default () => {
    return StyleSheet.create({
        Container: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            flexDirection: 'row',
            alignSelf: 'flex-end'
        },
        Button: {
            alignItems: "center",
            backgroundColor: getColor('primary'),
            width: 200,
            padding: 10,
            alignSelf: 'center',
            borderRadius: 10,
            elevation: 5,
            shadowColor: getColor('dark'),
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            marginBottom: 20
        },
        Text: {
            alignItems: "center",
            padding: 5,
            color: getColor('dark', 'darker')
        }
    });
};
