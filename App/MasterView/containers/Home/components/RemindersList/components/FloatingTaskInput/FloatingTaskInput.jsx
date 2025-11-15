import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import { Keyboard } from "react-native";
import { getColor } from "@styles/helper";
import { texts } from "./constants";
import getStyles from "./styles";

export default function FloatingTaskInput({ onAddTask, onCancel, visible }) {
  const styles = getStyles();
  const [taskText, setTaskText] = useState("");
  const inputRef = useRef(null);

  const handleAdd = useCallback(() => {
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText("");
      Keyboard.dismiss();
      onCancel?.();
    }
  }, [taskText, onAddTask, onCancel]);

  const handleCancel = useCallback(() => {
    setTaskText("");
    Keyboard.dismiss();
    onCancel?.();
  }, [onCancel]);

  // Don't render if not visible
  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.container]}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={taskText}
          onChangeText={setTaskText}
          placeholder={texts.PLACEHOLDER}
          placeholderTextColor={getColor("dark", "contrast")}
          textAlign="right"
          multiline={false}
          returnKeyType="done"
          onSubmitEditing={handleAdd}
          blurOnSubmit={true}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.buttonText}>{texts.ADD}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>{texts.CANCEL}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
