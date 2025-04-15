import { Colors } from "@/constants/Colors";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import mockAvailableTimes from "@/mocks/mockAvailableTimes";
import DayAvailability from "@/components/schedule/DayAvailability";
import mockReservationPreference from "@/mocks/mockReservationPreference";
import { AntDesign } from "@expo/vector-icons";

import { AvailableTime } from "../types/schedule/AvailableTime";

interface DayGroup {
  day: string;
  availableTimes: AvailableTime[];
}

function schedule() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  const [mode, setMode] = useState<"availability" | "meetings">("availability");
  const [editMode, setEditMode] = useState(false);

  const [groupedAvailability, setGroupedAvailability] = useState(
    [] as DayGroup[]
  );

  const removeAvailability = (timeslot : AvailableTime) => {
    const updatedAvailability = groupedAvailability.map((group) => {
      if (group.day === timeslot.dayOfTheWeek) {
        return {
          ...group,
          availableTimes: group.availableTimes.filter(
            (time) => time.id !== timeslot.id
          ),
        };
      }
      return group;
    })
    setGroupedAvailability(updatedAvailability);
  }

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
    <ScrollView style={{ backgroundColor: theme.background, flex: 1 }}>
      <View style={[{ backgroundColor: theme.background }, styles.container]}>
        <View style={styles.topContainer}>
          <Text>Your Availability Schedule</Text>
          <TouchableOpacity onPress={() => setEditMode(true)}>
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
                <View style={styles.notAvailableWrapper}>
                  <Text style={styles.notAvailable}>
                    {item.availableTimes.length === 0 && "Not Available"}
                  </Text>
                  {editMode && item.availableTimes.length === 0 && (
                    <TouchableOpacity>
                      <AntDesign name="plus" size={20} color={theme.text} style={styles.icon} />
                    </TouchableOpacity>
                  )}
                </View>

                <FlatList
                  data={item.availableTimes}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item : timeslot }) => (
                    <DayAvailability
                      startTime={timeslot.startTime}
                      endTime={timeslot.endTime}
                      editMode={editMode}
                      onDelete={() => removeAvailability(timeslot)}
                    />
                  )}
                ></FlatList>
              </View>
            )}
          ></FlatList>
        </View>
        <View style={styles.noticeContainer}>
          <Text>
            Invitees can schedule up to {mockReservationPreference.futureDays}{" "}
            days into the future with at least{" "}
            {mockReservationPreference.futureDays} hours notice{" "}
          </Text>
        </View>
        {editMode && (
          <TouchableOpacity onPress={() => setEditMode(false)}>
            <Text>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
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

  notAvailableWrapper: {
    marginLeft: "auto",
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10
  },
  notAvailable: {
    marginLeft: "auto",
    fontSize: 16,
  },

  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginBottom: 10,
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
  noticeContainer: {},
});

export default schedule;
