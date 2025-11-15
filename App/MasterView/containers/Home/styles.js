import { getColor } from "@styles/helper";
import { StyleSheet } from "react-native";

export default ({} = {}) => {
  const headerImageHeightSize = 65;
  const headerImageWidthSize = 30;

  return StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      backgroundColor: getColor("background"),
      height: "100%",
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: getColor("primary"),
      borderWidth: 1,
      borderColor: "transparent",
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    content: {
      display: "flex",
      marginTop: 20,
      alignItems: "center",
      flexGrow: 1,
      flexShrink: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 300,
    },
    headerImage: {
      width: headerImageWidthSize,
      height: headerImageHeightSize,
    },
    settingsIcon: {
      backgroundColor: getColor("light"),
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      elevation: 4,
      shadowColor: getColor("dark", "darker"),
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    parashaTitle: {
      fontSize: 36,
      fontWeight: "bold",
      textAlign: "center",
      color: getColor("primary", "contrast"),
      fontFamily: "stam",
      //   marginBottom: 8,
    },
    hebDateSubtitle: {
      fontSize: 26,
      textAlign: "center",
      color: getColor("primary", "contrast"),
      fontFamily: "stam",
      marginBottom: 20,
    },
    timesTitle: {
      fontSize: 26,
      fontWeight: "600",
      textAlign: "center",
      color: getColor("primary", "contrast"),
      fontFamily: "stam",
      marginBottom: 6,
      color: getColor("dark"),
    },
    timesContainer: {
      width: "90%",
      backgroundColor: getColor("primary"),
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      elevation: 3,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    timeText: {
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "right",
      color: getColor("primary", "contrast"),
      fontFamily: "stam",
      marginVertical: 5,
    },
  });
};
