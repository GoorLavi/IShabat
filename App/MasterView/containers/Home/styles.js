import {getColor} from '@styles/helper';
import {StyleSheet, Dimensions} from 'react-native'


export default ({} = {}) => {

    const headerImageHeightSize = 65;
    const headerImageWidthSize = 30;

    const headerContainerHeightSize = Dimensions.get('window').height * 5
    const visibleSectionSize = 80;


    return StyleSheet.create({
        container: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            backgroundColor: getColor('background'),
        },
        headerContainer: {
            marginTop: -headerContainerHeightSize + visibleSectionSize,
            marginLeft: -Dimensions.get('window').width * 2,
            display: 'flex',
            flexDirection: 'row',
            height: headerContainerHeightSize,
            width: Dimensions.get('window').width * 5,
            borderRadius: Math.round((Dimensions.get('window').height + Dimensions.get('window').width) / 0.7),
            backgroundColor: getColor('primary'),
            borderWidth: 1,
            borderColor: 'transparent'
        },
        content: {
            display: 'flex',
            marginTop: 20,
            alignItems: 'center',
            flex: 1
        },
        headerImage: {
            position: 'absolute',
            top: (visibleSectionSize - headerImageHeightSize) / 2,
            left: (Dimensions.get('window').width / 2) - headerImageWidthSize / 2,
            width: headerImageWidthSize,
            height: headerImageHeightSize
        }
    });
};
