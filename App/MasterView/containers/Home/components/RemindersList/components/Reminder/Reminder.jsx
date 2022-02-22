import React, {useCallback} from 'react';
import {getColor} from '@styles/helper';
import {TextInput, View} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from '@commonComponents/Icon';
import getStyles from './styles';


export default function Reminder({setReminder, removeReminder, reminder}) {

    const {isNew, isDone, value, id} = reminder;
    const styles = getStyles({isDone});

    const onChangeText = useCallback(value => {
        setReminder({...reminder, value})
    }, [setReminder, reminder]);

    const onDone = useCallback(isDone => {
        setReminder({...reminder, isDone})
    }, [setReminder, reminder]);

    const _removeReminder = useCallback(() => {
        removeReminder(id);
    }, [id]);

    const onBlur = useCallback(() => {
        !value && removeReminder(id)
    }, [value, removeReminder, id]);

    return <View {...{style: styles.Reminder}}>
        <Icon  {...{
            style: styles.TrashIcon,
            family: 'Ionicons',
            name: 'trash-outline',
            size: 18,
            onPress: _removeReminder
        }}/>
        <TextInput {...{value, onChangeText, style: styles.Input, autoFocus: isNew, onBlur}}/>
        <BouncyCheckbox {...{
            size: 20,
            fillColor: getColor('dark'),
            unfillColor: getColor('light'),
            iconStyle: {borderColor: getColor('dark'), borderRadius: 5, marginTop: 7},
            onPress: onDone
        }}/>
    </View>
}
