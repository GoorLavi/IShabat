import { getColor } from "@styles/helper";
import { StyleSheet, Dimensions } from "react-native";

export default ({} = {}) => {
  return StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      backgroundColor: getColor("background"),
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 40,
      color: getColor("primary", "contrast"),
      fontFamily: "stam",
    },
    citiesContainer: {
      width: "100%",
      maxWidth: 400,
      marginBottom: 40,
    },
    cityOption: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 10,
      backgroundColor: getColor("light"),
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "transparent",
    },
    cityOptionSelected: {
      borderColor: getColor("primary", "contrast"),
      backgroundColor: getColor("primary", "main"),
    },
    cityLabel: {
      fontSize: 24,
      textAlign: "right",
      marginLeft: 10,
      color: getColor("background", "contrast"),
      fontFamily: "stam",
    },
    radioCircle: {
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: getColor("primary", "contrast"),
      alignItems: "center",
      justifyContent: "center",
    },
    radioCircleSelected: {
      borderColor: getColor("primary", "contrast"),
    },
    radioCircleInner: {
      height: 12,
      width: 12,
      borderRadius: 6,
      backgroundColor: getColor("primary", "contrast"),
    },
    proceedButton: {
      width: "100%",
      maxWidth: 400,
      paddingVertical: 15,
      backgroundColor: getColor("primary"),
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    proceedButtonDisabled: {
      backgroundColor: getColor("light", "dark"),
    },
    proceedButtonText: {
      fontSize: 24,
      fontWeight: "bold",
      color: getColor("primary", "contrast"),
      fontFamily: "stam",
    },
  });
};
