import React, {useMemo, useCallback} from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import getStyles from './styles';

const iconsFamilies = {
    MaterialCommunityIcons,
    Ionicons,
    AntDesign,
    Feather,
    FontAwesome,
    Entypo
};

export default function Icon({style, family, color, isButton, onPress: _onPress, disabled, ...props}) {

    const styles = useMemo(() => getStyles({disabled, color}), [disabled, color]);
    const onPress = useCallback(disabled ? new Function : _onPress, [_onPress, disabled])

    if (!family)
        console.error('Icon must have family');

    const IconFamily = iconsFamilies[family];

    if (!IconFamily)
        return null;

    if (!isButton)
        return <IconFamily {...{style: [styles.container, style], onPress, ...props}}/>;

    const {containerStyle} = props;

    return <View {...{style: {...containerStyle}}}>
        <IconFamily.Button {...{style: [styles.button, style], onPress, ...props}}/>
    </View>;
}

