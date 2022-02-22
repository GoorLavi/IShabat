import React, {useMemo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Spinner from '@commonComponents/Spinner';
import getStyles from './styles';

export default ({onPress, children, size, style, textStyle, skin, waiting, disabled}) => {
    const styles = useMemo(() => getStyles({size, skin, disabled}), [size, skin, disabled]);

    return <TouchableOpacity {...{style: [styles.container, style], onPress, activeOpacity: .7, disabled: waiting || disabled}}>
        {
            !waiting ?
                <Text {...{style: [styles.text, textStyle]}}>{children}</Text> :
                <Spinner {...{size: 'small', color: styles.spinner?.color}}/>
        }
    </TouchableOpacity>
};
