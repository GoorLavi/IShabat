import React, {useMemo, useCallback} from 'react';
import {View, Text} from 'react-native';
import Icon from '@commonComponents/Icon';
import {texts} from './constants';
import getStyles from './styles';

import ContactUsButton from './containers/ContactUsButton/ContactUsButton';

export default function Settings({navigation}) {

    const styles = useMemo(() => getStyles(), []);

    const onBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [navigation])

    return <View {...{style: styles.container}}>
        <View {...{style: styles.header}}>
            <Icon  {...{
                style: styles.backIcon,
                family: 'AntDesign',
                name: 'back',
                size: 34,
                onPress: onBack
            }}/>
            <Text  {...{style: styles.headerTitle}}>{texts.HEADER_TITLE}</Text>
        </View>

        <View {...{style: styles.content}}>
            <ContactUsButton/>
        </View>
    </View>;
};

