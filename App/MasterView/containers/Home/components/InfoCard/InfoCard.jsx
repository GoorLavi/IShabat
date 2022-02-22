import React from 'react';
import {View, Text, Image} from 'react-native';
import {texts} from './constants';
import useNextEvent from '@store/nextEvent/nextEvent';
import useUser from '@store/user/user';
import {formatDate} from './utils';
import getStyles from './styles';

export default () => {

    const styles = getStyles();

    const {nextEvent} = useNextEvent();
    const {city} = useUser();

    return <View {...{style: styles.InfoCard}}>
        <View {...{style: styles.Header}}>
            <Text {...{style: styles.HebrewDate}}>{/*heb_date*/ 'ל׳ בכסלו תשפב״ב'}</Text>
            <Text {...{style: styles.Date}}>{formatDate(nextEvent?.date)}</Text>
        </View>

        <Text {...{style: styles.TimeText}}>{texts.START_LABEL} {nextEvent[`${city}_in`]}</Text>
        <Text {...{style: styles.TimeText}}>{texts.END_LABEL} {nextEvent[`${city}_out`]}</Text>
        <Text {...{style: styles.Parasha}}>{`${texts.PARASHA} ${nextEvent.parasha}`}</Text>

        <Image {...{style: styles.MosheImage, source: require('@assets/Moshe.png')}}/>

    </View>
}
