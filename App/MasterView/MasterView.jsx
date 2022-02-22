import React, {useMemo, memo, useEffect} from 'react';
import {View} from 'react-native';
import Home from './containers/Home/Home';
import Settings from './containers/Settings/Settings';
import getStyles from './styles';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default memo(function MasterView({}) {

    const styles = useMemo(() => getStyles(), []);

    const homeRoute = 'Home'

    return <View {...{style: styles.container}}>
        <NavigationContainer>
            <Stack.Navigator {...{initialRouteName: homeRoute, screenOptions: {headerShown: false}}}>
                <Stack.Screen {...{name: homeRoute, component: Home}}/>
                <Stack.Screen {...{name: 'Settings', component: Settings}}/>
            </Stack.Navigator>
        </NavigationContainer>
    </View>;
})


