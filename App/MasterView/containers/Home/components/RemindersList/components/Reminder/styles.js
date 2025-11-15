import { getColor } from "@styles/helper";
import { StyleSheet } from "react-native";

export default ({ isDone } = {}) => {
  return StyleSheet.create({
    Reminder: {
      display: "flex",
      flexDirection: "row",
      direction: "rtl",
      paddingVertical: 12,
      paddingHorizontal: 6,
      marginBottom: 10,
    },
    Input: {
      flexGrow: 1,
      flexShrink: 1,
      borderBottomWidth: 1,
      ...(isDone && {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
      }),
      textAlign: "right",
      fontSize: 18,
    },
    TrashIcon: {
      margin: 0,

      marginRight: 6,
    },
    Checkbox: {},
  });
};
