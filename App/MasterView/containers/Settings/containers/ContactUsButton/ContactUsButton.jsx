import React, { useCallback, useMemo } from "react";
import { Linking, Text } from "react-native";
import getStyles from "./styles";
import { texts } from "./constants";

export default function ContactUsButton({}) {
  const styles = useMemo(() => getStyles(), []);

  const onContactUs = useCallback(() => {
    Linking.openURL(`mailto:${texts.GMAIL}?subject=IShabat contact us`);
  }, []);

  return (
    <Text {...{ onPress: onContactUs, style: styles.button }}>
      {texts.EMAIL_LINK}: {texts.GMAIL}
    </Text>
  );
}
