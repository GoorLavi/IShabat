import { getColor } from "@styles/helper";
import { StyleSheet } from "react-native";

export default ({} = {}) => {
  return StyleSheet.create({
    RemindersList: {
      display: "flex",
      flexDirection: "column",
      width: "90%",
      paddingHorizontal: 0,
    },
    RemindersContent: {
      display: "flex",
      backgroundColor: getColor("light"),
      borderRadius: 20,
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    ScrollContent: {
      flexGrow: 1,
    },
    List: {
      paddingBottom: 20,
    },
    RemindersHeader: {
      width: "100%",
      textAlign: "right",
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "stam",
      marginBottom: 8,
    },
  });
};
