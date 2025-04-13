import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import InterestEdit from "@/components/input/InterestEdit";

function OnboardingScreenTeachLearn() {

  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <InterestEdit></InterestEdit>
      <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
        <Text
          style={[
            styles.button,
            {
              backgroundColor: theme.text,
              color: theme.textInverse,
              fontWeight: "500",
            },
          ]}
        >
          Finish set up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },

  button: {
    padding: 10,
    borderRadius: 10,
    width: 350,
    marginBottom: 5,
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default OnboardingScreenTeachLearn;
