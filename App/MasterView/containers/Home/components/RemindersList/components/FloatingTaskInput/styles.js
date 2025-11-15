import { getColor } from "@styles/helper";
import { StyleSheet, Platform } from "react-native";

export default () => {
  return StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: getColor("light"),
      borderTopWidth: 1,
      borderTopColor: getColor("light", "dark"),
      paddingHorizontal: 16,
      paddingVertical: 12,
      paddingBottom: Platform.OS === "ios" ? 34 : 12, // Safe area for iOS
      elevation: 8,
      shadowColor: getColor("dark", "darker"),
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      zIndex: 1000,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    input: {
      flex: 1,
      backgroundColor: getColor("background"),
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      fontFamily: "stam",
      textAlign: "right",
      borderWidth: 1,
      borderColor: getColor("light", "dark"),
      minHeight: 44,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 8,
    },
    addButton: {
      backgroundColor: getColor("primary"),
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 12,
      minHeight: 44,
      justifyContent: "center",
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: "transparent",
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 12,
      minHeight: 44,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 16,
      fontFamily: "stam",
      fontWeight: "bold",
      color: getColor("primary", "contrast"),
    },
    cancelButtonText: {
      fontSize: 16,
      fontFamily: "stam",
      color: getColor("dark", "contrast"),
    },
  });
};
