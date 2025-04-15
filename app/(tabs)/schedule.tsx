import { Colors } from "@/constants/Colors";
import React, { useEffect, useMemo, useState } from "react";
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

interface AvailableTime {
  id: string;
  dayOfTheWeek: string;
  startTime: string;
  endTime: string;
}

interface DayGroup {
  day: string;
  availableTimes: AvailableTime[];
}

function schedule() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  const [groupedAvailability, setGroupedAvailability] = useState(
    [] as DayGroup[]
  );

  useEffect(() => {
    const groupedAvailabilityByDayOfTheWeek = () => {
      const grouped = [
        { day: "Sunday", availableTimes: [] as AvailableTime[] },
        { day: "Monday", availableTimes: [] as AvailableTime[] },
        { day: "Tuesday", availableTimes: [] as AvailableTime[] },
        { day: "Wednesday", availableTimes: [] as AvailableTime[] },
        { day: "Thursday", availableTimes: [] as AvailableTime[] },
        { day: "Friday", availableTimes: [] as AvailableTime[] },
        { day: "Saturday", availableTimes: [] as AvailableTime[] },
      ];

      mockAvailableTimes.forEach((availableTime) => {
        const index = grouped.findIndex(
          (group) => group.day === availableTime.dayOfTheWeek
        );
        if (index !== -1) {
          grouped[index].availableTimes.push(availableTime);
        }
      });
      // doing ts ignore here because lazy rn
      // @ts-ignore
      setGroupedAvailability(grouped);
    };
    groupedAvailabilityByDayOfTheWeek();
  }, []);

  return (
    <View style={[{ backgroundColor: theme.background }, styles.container]}>
      <View style={styles.topContainer}>
        <Text>Your Availability Schedule</Text>
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.availabilityContainer}>
        <FlatList
          data={groupedAvailability}
          keyExtractor={(item) => item.day}
          renderItem={({ item }) => (
            <View style={styles.dayRow}>
              <Text
                style={[
                  styles.dayIcon,
                  {
                    color: theme.whiteAllAround,
                    backgroundColor: theme.primary,
                  },
                ]}
              >
                {item.day[0]}
              </Text>
              <Text style={styles.notAvailable}>
                {item.availableTimes.length === 0 && "Not Available"}
              </Text>
              <FlatList
                data={item.availableTimes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  console.log(item);
                  if (!item) {
                    return <Text>Not Available</Text>;
                  } else {
                    return (
                      <DayAvailability
                        startTime={item.startTime}
                        endTime={item.endTime}
                      />
                    );
                  }
                }}
              ></FlatList>
            </View>
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

  availabilityContainer: {
    marginTop: 40,
  },
  notAvailable: {
    marginLeft: "auto",
    fontSize: 20,
  },

  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginBottom:10,
    alignItems: "center",
  },
  dayIcon: {
    padding: 10,
    width: 48,
    height: 48,
    borderRadius: 30,
    textAlign: "center",
    aspectRatio: 1,
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "flex-start",
  },
});

export default schedule;
