import React, {useMemo} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {getColor} from '@styles/helper';
import getStyles from './styles';

export default function Spinner({style, size = 'large', color}) {

    const styles = useMemo(() => getStyles(), []);

    return <ActivityIndicator {...{style: [styles.container, style], size, color: color || getColor('primary')}}/>
}


