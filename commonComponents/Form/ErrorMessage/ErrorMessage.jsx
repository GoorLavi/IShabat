import React, {useMemo} from 'react';
import {Text} from 'react-native';
import getStyles from './styles';

export default ({error}) => {
    const styles = useMemo(() => getStyles({}), []);
    return <Text {...{style: styles.text}}>{error}</Text>;
};
