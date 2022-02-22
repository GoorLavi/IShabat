import {getColor} from '@styles/helper';
import {StyleSheet, Dimensions} from 'react-native'


export default ({} = {}) => {

    return StyleSheet.create({
        InfoCard: {
            marginTop: 20,
            display: 'flex',
            backgroundColor: getColor('primary'),
            height: 200,
            width: '90%',
            borderRadius: 30,
            elevation: 5,
            shadowColor: '#000000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.5,
            shadowRadius: 1,
            paddingHorizontal: 10,
            paddingVertical: 20
        },
        TimeText: {
            textAlign: 'right',
            fontSize: 26,
            fontWeight: 'bold',
            fontFamily: 'stam',
            marginRight: 10,
            lineHeight: 26
        },
        HebrewDate: {
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            color: getColor('primary', 'contrast'),
            fontFamily: 'stam'
        },
        Date: {
            fontSize: 12,
            color: getColor('primary', 'contrast'),
            marginLeft: 20,
            fontWeight: 'bold'
        },
        MosheImage: {
            position: 'absolute',
            top: 60,
            left: -12
        },
        Parasha: {
            textAlign: 'right',
            fontSize: 22,
            color: getColor('primary', 'contrast'),
            fontFamily: 'stam'
        },
        Header: {
            width: '80%',
            marginHorizontal: '10%'
        }
    });
};
