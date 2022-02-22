import React, {useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import Modal from '@commonComponents/Modal';
import Button from '@commonComponents/Button';


export default ({}) => {
    const [visible, setVisible] = useState(false);

    const headerText = useMemo(() => {
        return "This is header text";
    }, []);

    const content = useMemo(() => {
        return <Text>
            This is a lot of text
            This is a lot of text
            This is a lot of text
            This is a lot of text
            This is a lot of text
            This is a lot of text
            This is a lot of text
            This is a lot of text
            This is a lot of text
            This is a lot of text
        </Text>;
    }, []);

    const footer = useMemo(() => {
        return <View>
            <Button {...{onPress: () => console.log('onclick'), size: 'medium', skin: 'success'}}>Close</Button>
        </View>
    }, []);


    if (!visible)
        return null;

    return <Modal {...{
        onClose: setVisible,
        headerText,
        content,
        footer
    }}/>
}

