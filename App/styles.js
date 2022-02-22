import {getColor} from '@styles/helper';
import {StyleSheet} from 'react-native'

export default ({} = {}) => {
    return StyleSheet.create({
        safeAreaTopView: {
            flex: 0,
            backgroundColor: getColor('dark', 'darker')
        },
        safeAreaBottomView: {
            flex: 1,
            backgroundColor: getColor('background')
        }
    });
};
