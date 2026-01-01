import React, { useMemo, useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import Icon from "@commonComponents/Icon";
import { texts, CITY_OPTIONS } from "./constants";
import getStyles from "./styles";
import useUser from "@store/user/user";
import useNextEvent from "@store/nextEvent/nextEvent";
import useDeveloper from "@store/developer/developer";
import { scheduleNotification } from "@globals/notifications";
import { getNotificationMessage } from "@globals/notificationMessages";
import { devLogError } from "@utils/devLogger";

import ContactUsButton from "./containers/ContactUsButton/ContactUsButton";

export default function Settings({ navigation }) {
  const styles = useMemo(() => getStyles(), []);
  const { city, setCity, notificationTimes, setNotificationTimes } = useUser();
  const { nextEvent } = useNextEvent();
  const { isDevMode, setDevMode } = useDeveloper();

  const [selectedCity, setSelectedCity] = useState(city);
  const [firstNotification, setFirstNotification] = useState(
    String(notificationTimes[0])
  );
  const [secondNotification, setSecondNotification] = useState(
    String(notificationTimes[1])
  );
  const [lastTapTime, setLastTapTime] = useState(0);

  const onBack = useCallback(
    () => navigation.canGoBack() && navigation.goBack(),
    [navigation]
  );

  const handleDoubleTap = useCallback(() => {
    navigation.navigate("Developer");
  }, [navigation]);

  const onDevLongPress = useCallback(() => {
    const newDevMode = !isDevMode;
    setDevMode(newDevMode);
    Alert.alert(
      "Developer Mode",
      newDevMode ? "Developer Mode Enabled 🔧" : "Developer Mode Disabled"
    );
  }, [lastTapTime, isDevMode, setDevMode]);

  const handleSave = useCallback(() => {
    const first = parseFloat(firstNotification);
    const second = parseFloat(secondNotification);

    if (isNaN(first) || isNaN(second) || first <= 0 || second <= 0) {
      Alert.alert("שגיאה", "נא להזין מספרים חיוביים בלבד");
      return;
    }

    setCity(selectedCity);
    setNotificationTimes([first, second]);
    Alert.alert("הצלחה", texts.SAVE_SUCCESS);
  }, [
    selectedCity,
    firstNotification,
    secondNotification,
    setCity,
    setNotificationTimes,
  ]);

  return (
    <View {...{ style: styles.container }}>
      <View {...{ style: styles.header }}>
        <Icon
          {...{
            style: styles.backIcon,
            family: "AntDesign",
            name: "left",
            size: 34,
            onPress: onBack,
          }}
        />
        <Text {...{ style: styles.headerTitle }}>{texts.HEADER_TITLE}</Text>

        {/* Double-tap area in top-right corner to toggle dev mode */}
        <TouchableOpacity
          style={styles.devModeTrigger}
          onPress={handleDoubleTap}
          onLongPress={onDevLongPress}
          activeOpacity={0.7}
        >
          {isDevMode && <Text style={styles.devModeIndicator}>🔧</Text>}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.content}
      >
        {/* City Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{texts.CITY_LABEL}</Text>
          <View style={styles.citiesContainer}>
            {CITY_OPTIONS.map(({ key, label }) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.cityOption,
                  selectedCity === key && styles.cityOptionSelected,
                ]}
                onPress={() => setSelectedCity(key)}
              >
                <Text style={styles.cityLabel}>{label}</Text>
                <View
                  style={[
                    styles.radioCircle,
                    selectedCity === key && styles.radioCircleSelected,
                  ]}
                >
                  {selectedCity === key && (
                    <View style={styles.radioCircleInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            {texts.NOTIFICATION_SETTINGS_HEADER}
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {texts.FIRST_NOTIFICATION_LABEL}
            </Text>
            <TextInput
              style={styles.input}
              value={firstNotification}
              onChangeText={setFirstNotification}
              keyboardType="number-pad"
              textAlign="right"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {texts.SECOND_NOTIFICATION_LABEL}
            </Text>
            <TextInput
              style={styles.input}
              value={secondNotification}
              onChangeText={setSecondNotification}
              keyboardType="number-pad"
              textAlign="right"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{texts.SAVE}</Text>
        </TouchableOpacity>

        <ContactUsButton />
      </ScrollView>
    </View>
  );
}
