import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Tip() {
  return (
    <View style={styles.tip}>
      <Text style={styles.tipText}>
        Tap anywhere to drop a marker
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tip: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tipText: {
    color: 'white',
  },
})
