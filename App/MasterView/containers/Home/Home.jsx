import React, { useMemo, useRef } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import getStyles from "./styles";
import InfoCard from "./components/InfoCard/InfoCard";
import RemindersList from "./components/RemindersList/RemindersList";
import { texts } from "./constants";
import useNextEvent from "@store/nextEvent/nextEvent";
import useUser from "@store/user/user";
import useDeveloper from "@store/developer/developer";
import {
  getEffectiveEventTime,
  getActiveOverrides,
} from "@globals/devOverrides";
import Icon from "@commonComponents/Icon";

export default function Home({ navigation }) {
  const styles = useMemo(() => getStyles(), []);
  const scrollViewRef = useRef(null);

  const { nextEvent } = useNextEvent();
  const { city } = useUser();

  const effectiveEntranceTime = nextEvent
    ? getEffectiveEventTime(nextEvent, city)
    : "---";
  const { hasOverrides } = getActiveOverrides();

  return (
    <View {...{ style: styles.container }}>
      <View {...{ style: styles.headerContainer }}>
        <Image
          {...{
            style: styles.headerImage,
            source: require("../../../assets/header-logo.png"),
          }}
        />

        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon family="AntDesign" name="setting" size={28} color="#707070" />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
      >
        <View {...{ style: styles.content }}>
          <Text style={styles.parashaTitle}>
            {nextEvent?.parasha}
            {hasOverrides && " 🔧"}
          </Text>
          <Text style={styles.hebDateSubtitle}>{nextEvent?.heb_date}</Text>

          <View style={styles.timesContainer}>
            <Text style={styles.timesTitle}>זמני השבת</Text>
            <Text style={styles.timeText}>
              {texts.ENTRANCE_TIME} {effectiveEntranceTime}
            </Text>
            <Text style={styles.timeText}>
              {texts.EXIT_TIME} {nextEvent?.[`${city}_out`]}
            </Text>
          </View>

          <RemindersList scrollViewRef={scrollViewRef} />
        </View>
      </ScrollView>
    </View>
  );
}
