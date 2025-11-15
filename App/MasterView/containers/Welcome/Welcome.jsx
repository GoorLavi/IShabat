import React, { useState, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { texts, CITY_OPTIONS } from "./constants";
import getStyles from "./styles";
import useUser from "@store/user/user";

export default function Welcome({ navigation }) {
  const styles = useMemo(() => getStyles(), []);
  const { setCity, setIsOnboarded } = useUser();
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = useCallback((cityKey) => {
    setSelectedCity(cityKey);
  }, []);

  const handleProceed = useCallback(() => {
    if (selectedCity) {
      setCity(selectedCity);
      setIsOnboarded(true);
      navigation.replace("Home");
    }
  }, [selectedCity, setCity, setIsOnboarded, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>{texts.HEADER_TITLE}</Text>

      <View style={styles.citiesContainer}>
        {CITY_OPTIONS.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.cityOption,
              selectedCity === key && styles.cityOptionSelected,
            ]}
            onPress={() => handleCitySelect(key)}
          >
            <Text style={styles.cityLabel}>{label}</Text>
            <View
              style={[
                styles.radioCircle,
                selectedCity === key && styles.radioCircleSelected,
              ]}
            >
              {selectedCity === key && <View style={styles.radioCircleInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.proceedButton,
          !selectedCity && styles.proceedButtonDisabled,
        ]}
        onPress={handleProceed}
        disabled={!selectedCity}
      >
        <Text style={styles.proceedButtonText}>{texts.PROCEED_BUTTON}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
