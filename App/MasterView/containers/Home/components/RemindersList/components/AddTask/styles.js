import { getColor } from "@styles/helper";
import { StyleSheet } from "react-native";

export default () => {
  return StyleSheet.create({
    Container: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      flexDirection: "row",
      alignSelf: "stretch",
      width: "100%",
    },
    Button: {
      alignItems: "center",
      backgroundColor: getColor("primary"),
      width: "100%",
      paddingVertical: 14,
      paddingHorizontal: 18,
      alignSelf: "center",
      borderRadius: 12,
      elevation: 4,
      shadowColor: getColor("dark"),
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      marginBottom: 12,
    },
    Text: {
      alignItems: "center",
      padding: 5,
      color: getColor("dark", "darker"),
      fontSize: 18,
      fontWeight: "bold",
      lineHeight: 24,
    },
  });
};
