import React, { useCallback, useRef } from "react";
import { getColor } from "@styles/helper";
import { TextInput, View, Dimensions } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from "@commonComponents/Icon";
import getStyles from "./styles";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Reminder({
  reminder,
  setReminder,
  removeReminder,
  scrollViewRef,
}) {
  const { isNew, checked, value, id } = reminder;
  const styles = getStyles({ isDone: checked });
  const reminderViewRef = useRef(null);

  const onChangeText = useCallback(
    (value) => {
      setReminder({ ...reminder, value });
    },
    [setReminder, reminder]
  );

  const onCheck = useCallback(
    (checked) => {
      setReminder({ ...reminder, checked });
    },
    [setReminder, reminder]
  );

  const _removeReminder = useCallback(() => {
    removeReminder(id);
  }, [id]);

  const onBlur = useCallback(() => {
    !value && removeReminder(id);
  }, [value, removeReminder, id]);

  const onFocus = useCallback(() => {
    if (reminderViewRef.current && scrollViewRef?.current) {
      // Measure the position of this reminder
      reminderViewRef.current.measureLayout(
        scrollViewRef.current,
        (x, y, width, height) => {
          // Calculate position to center the item on screen (with 200px extra offset)
          const scrollToY = y - SCREEN_HEIGHT / 2 + height / 2 + 200;

          scrollViewRef.current.scrollTo({
            y: Math.max(0, scrollToY),
            animated: true,
          });
        },
        () => {
          console.warn("Failed to measure reminder position");
        }
      );
    }
  }, [scrollViewRef]);

  return (
    <View ref={reminderViewRef} style={styles.Reminder}>
      <BouncyCheckbox
        {...{
          style: styles.Checkbox,
          size: 20,
          fillColor: getColor("dark"),
          unfillColor: getColor("light"),
          iconStyle: { borderColor: getColor("dark"), borderRadius: 5 },
          isChecked: checked,
          onPress: onCheck,
        }}
      />
      <TextInput
        {...{
          value,
          onChangeText,
          style: styles.Input,
          autoFocus: isNew,
          onBlur,
          onFocus,
          textAlign: "right",
          placeholder: "הוסף משימה...",
        }}
      />
      <Icon
        {...{
          style: styles.TrashIcon,
          family: "Ionicons",
          name: "trash-outline",
          size: 20,
          onPress: _removeReminder,
        }}
      />
    </View>
  );
}
