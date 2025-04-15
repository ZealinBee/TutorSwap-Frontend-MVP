import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, useColorScheme, View, ViewBase } from "react-native";

interface DayAvailabilityProps {
  dayOfTheWeek: string;
  startTime: string;
  endTime: string;
}

function DayAvailability({
  dayOfTheWeek,
  startTime,
  endTime,
}: DayAvailabilityProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  return (
    <View style={styles.container}>
      <Text
        style={[
          { color: theme.whiteAllAround, backgroundColor: theme.primary },
          styles.dayIcon,
        ]}
      >
        {dayOfTheWeek[0]}
      </Text>
      <View style={styles.timing}>
        <Text>{startTime}</Text>
        <Text>-</Text>
        <Text>{endTime}</Text>
      </View>
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
  dayIcon: {
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    textAlign: "center",
    aspectRatio: 1,
    fontWeight: "bold",
  },
  timing: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default DayAvailability;
