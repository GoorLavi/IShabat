import React, {useMemo, useState} from 'react';
import Alert from './index';


// Confirmation Alert
export default ({}) => {
    const [visible, setVisible] = useState(false);

    const buttons = useMemo(() => [
        {text: 'Ok', skin: 'primary', onPress: () => console.log('Ok')},
        {text: 'Cancel', skin: 'danger'}
    ], []);

    if (!visible)
        return null;

    return <Alert {...{
        buttons,
        onClose: setVisible,
        title: 'What do you want to do?',
        message: "You did something so make sure you know what you did"
    }}/>
}

// Simple Alert
export default ({}) => {
    const [visible, setVisible] = useState(false);

    if (!visible)
        return null;

    return <Alert {...{
        onClose: setVisible,
        title: 'What do you want to do?',
        message: "You did something so make sure you know what you did"
    }}/>
}
