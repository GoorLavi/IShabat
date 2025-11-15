import React, { useMemo, memo } from "react";
import { View, StatusBar } from "react-native";
import Home from "./containers/Home/Home";
import Settings from "./containers/Settings/Settings";
import Welcome from "./containers/Welcome/Welcome";
import Developer from "./containers/Developer/Developer";
import SafeAreaTop from "@commonComponents/SafeAreaTop";
import getStyles from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import useUser from "@store/user/user";

const Stack = createStackNavigator();

export default memo(function MasterView({}) {
  const styles = useMemo(() => getStyles(), []);
  const { isOnboarded } = useUser();

  const initialRoute = isOnboarded ? "Home" : "Welcome";

  return (
    <>
      <SafeAreaTop />
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View {...{ style: styles.container }}>
        <NavigationContainer>
          <Stack.Navigator
            {...{
              initialRouteName: initialRoute,
              screenOptions: { headerShown: false },
            }}
          >
            <Stack.Screen {...{ name: "Welcome", component: Welcome }} />
            <Stack.Screen {...{ name: "Home", component: Home }} />
            <Stack.Screen {...{ name: "Settings", component: Settings }} />
            <Stack.Screen {...{ name: "Developer", component: Developer }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
});
