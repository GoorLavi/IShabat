import React, {useMemo, memo} from 'react';
import {TextInput, Text, View} from 'react-native';
import getStyles from './styles';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default memo(function TextInputField({style, label, onChangeText, value, onBlur, error}) {
    const styles = useMemo(() => getStyles(), []);

    return <View {...{style: styles.container}}>
        {label && <Text{...{style: styles.label}}>{label}</Text>}
        <TextInput {...{style: [styles.textInput, style], onChangeText, value, onBlur}}/>
        {error && <ErrorMessage {...{error}} />}
    </View>;
});
