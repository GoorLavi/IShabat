import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import getStyles from './styles';
import {texts} from './constants';


export default function AddTask({style, onPress}) {

    const styles = getStyles();

    return <View>
        <TouchableOpacity{...{onPress, style: [styles.Button, style]}}>
            <Text
                style={styles.Text}
            >{texts.TEXT}</Text>
        </TouchableOpacity>
    </View>

}
