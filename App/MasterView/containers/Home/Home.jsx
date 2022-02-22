import React, {useMemo} from 'react';
import {View, Text, Image} from 'react-native';
import getStyles from './styles';
import InfoCard from './components/InfoCard/InfoCard';
import RemindersList from './components/RemindersList/RemindersList';
import {texts} from './constants';

export default function Home({navigation}) {

    const styles = useMemo(() => getStyles(), []);

    return <View {...{style: styles.container}}>
        <View {...{style: styles.headerContainer}}>
        </View>
        <Image {...{style: styles.headerImage, source: require('../../../assets/header-logo.png')}}/>
        <View {...{style: styles.content}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{texts.WELCOME_USER}</Text>
            <InfoCard />
            <RemindersList />
        </View>
    </View>;
};

