import React, {useCallback, useMemo, useEffect, useState} from 'react';
import {Modal, Text, View} from 'react-native';
import Button from '../Button';
import {texts} from './constants';
import getStyles from './styles';
import Icon from '@commonComponents/Icon';

export default function Alert({
                                  onClose,
                                  title,
                                  animationType = 'fade',
                                  message,
                                  skin = 'primary',
                                  buttons: _buttons,
                                  visible = true,
                                  buttonsIsHidden,
                                  hideCloseIcon
                              }) {
    const styles = useMemo(() => getStyles({skin}), [skin]);

    const _onClose = useCallback(() => onClose(), [onClose]);

    const buttons = useMemo(() => {
        if (_buttons)
            return <>
                {_buttons.map(({skin, onPress, text, size = 'small', ...rest}, index) =>
                    <Button {...{
                        key: index,
                        onPress: onPress || _onClose,
                        size,
                        skin,
                        ...rest
                    }}>{text}</Button>
                )}
            </>
        else
            return <Button {...{onPress: _onClose, size: 'small', skin}}>{texts.CONFIRMATION_TEXT}</Button>
    }, [_buttons]);

    return <Modal {...{onRequestClose: onClose, transparent: true, animationType, visible}}>
        <View {...{style: styles.centeredView, onPress: _onClose}}>
            <View {...{style: styles.modalView}}>
                <View {...{style: styles.header}}>
                    <Text  {...{style: styles.title}}>{title}</Text>
                    {hideCloseIcon && <Icon  {...{
                        style: styles.closeHeaderButton,
                        family: 'Feather',
                        name: 'x',
                        size: 24,
                        onPress: _onClose
                    }} />}
                </View>
                <View {...{style: styles.content}}>
                    <Text  {...{style: styles.message}}>{message}</Text>
                </View>
                <View {...{style: styles.footer}}>
                    {!buttonsIsHidden && buttons}
                </View>
            </View>
        </View>
    </Modal>
};

const alertTriggers = {
    show: undefined // Will be initialized in AlertProvider
}

export const AlertProvider = ({children}) => {

    const [alert, setAlert] = useState();

    useEffect(() => {
        alertTriggers.show = setAlert;
    }, [])

    const onClose = useCallback(() => setAlert(), []);
    const styles = useMemo(() => getStyles(), []);

    return <View {...{style: styles.providerContainer}}>
        {alert && <Alert {...{...alert, onClose, visible: true}}/>}
        {children}
    </View>
}

export const alert = alertTriggers;
