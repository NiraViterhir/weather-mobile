import { Text, View } from "react-native";
import React from "react";
import { styles } from "./Tip.styles";

export default function Tip() {
  return (
    <View style={styles.tip}>
      <Text style={styles.tipText}>
        Long-press anywhere to drop a marker
      </Text>
    </View>
  )
}

