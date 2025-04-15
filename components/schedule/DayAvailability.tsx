import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, useColorScheme, View, ViewBase } from "react-native";

interface DayAvailabilityProps {
  startTime: string;
  endTime: string;
}

function DayAvailability({
  startTime,
  endTime,
}: DayAvailabilityProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  return (
      <View style={styles.timing}>
        <Text style={styles.time}>{startTime}</Text>
        <Text style={styles.time}>-</Text>
        <Text style={styles.time}>{endTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  timing: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 20,
    marginVertical: 5,
  },
  time: {
    fontSize: 20,
  }
});

export default DayAvailability;
