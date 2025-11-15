import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeAreaTop = () => {
  return <SafeAreaView style={styles.safeAreaTop} edges={["top"]} />;
};

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0,
    backgroundColor: "#000000",
  },
});

export default SafeAreaTop;
