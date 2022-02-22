import React, {useMemo, useCallback} from 'react';
import {View, Modal as _Modal, Text} from 'react-native';
import getStyles from './styles';
import Icon from '@commonComponents/Icon';

export default function Modal({style, animationType = 'fade', headerText, content, footer, onClose, hideHeader}) {
    const styles = useMemo(() => getStyles(), []);

    const onRequestClose = useCallback(() => onClose(), []);
    const _onClose = useCallback(() => onClose(), []);

    return <_Modal {...{onRequestClose, transparent: true, animationType}}>
        <View {...{style: styles.centeredView}}>
            <View {...{style: [style, styles.modalView]}}>
                {
                    !hideHeader && <View {...{style: styles.header}}>
                        <Text {...{style: styles.headerText}}>{headerText}</Text>
                        <Icon  {...{
                            style: styles.closeHeaderButton,
                            family: 'Feather',
                            name: 'x',
                            size: 24,
                            onPress: _onClose
                        }} />
                    </View>
                }
                <View {...{style: styles.content}}>
                    {content}
                </View>
                {
                    footer && <View {...{style: styles.footer}}>
                        {footer}
                    </View>
                }
            </View>
        </View>
    </_Modal>
};
