import { Colors } from "@/constants/Colors";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import mockAvailableTimes from "@/mocks/mockAvailableTimes";
import DayAvailability from "@/components/schedule/DayAvailability";

function schedule() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  return (
    <View style={[{ backgroundColor: theme.background }, styles.container]}>
      <View style={styles.topContainer}>
        <Text>Your Availability Schedule</Text>
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.daysContainer}>
        <FlatList
          data={mockAvailableTimes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DayAvailability
              dayOfTheWeek={item.dayOfTheWeek}
              startTime={item.startTime}
              endTime={item.endTime}
            />
          )}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  daysContainer: {},
  dayIcons: {},
  dayIcon: {
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    textAlign: "center",
    aspectRatio: 1,
    fontWeight: "bold",
  },
});

export default schedule;
