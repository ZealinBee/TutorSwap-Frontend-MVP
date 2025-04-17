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

import { AvailableTime } from "../../types/schedule/AvailableTime";
import groupAvailabilityByDayOfTheWeek from "@/utils/groupAvailabilityByDayOfTheWeek";
import AddAvailabilityModal from "@/components/schedule/AddAvailabilityModal";

interface DayGroup {
  day: string;
  availableTimes: AvailableTime[];
}

function schedule() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  const [mode, setMode] = useState<"availability" | "meetings">("availability");
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  const [availableTimes, setAvailableTimes] = useState([] as AvailableTime[]);
  const [groupedAvailability, setGroupedAvailability] = useState(
    [] as DayGroup[]
  );

  const removeAvailability = (timeslot: AvailableTime) => {
    const updatedAvailableTimes = availableTimes.filter((availableTime) => {
      return availableTime.id !== timeslot.id;
    });
    setAvailableTimes(updatedAvailableTimes);
    setGroupedAvailability(
      groupAvailabilityByDayOfTheWeek(updatedAvailableTimes)
    );
  };

  const addAvailability = (
    startTime: string,
    endTime: string,
    dayOfTheWeek: string
  ) => {
    const newAvailability = {
      id: `${startTime}-${endTime} ${Math.random()}`,
      dayOfTheWeek,
      startTime,
      endTime,
    } as AvailableTime;

    availableTimes.push(newAvailability);
    setGroupedAvailability(groupAvailabilityByDayOfTheWeek(availableTimes));
  };

  useEffect(() => {
    const init = () => {
      setAvailableTimes(mockAvailableTimes);
      setGroupedAvailability(
        groupAvailabilityByDayOfTheWeek(mockAvailableTimes)
      );
    };
    init();
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
                    <TouchableOpacity
                      onPress={() => {
                        setIsModalOpen(true);
                        setSelectedDay(item.day);
                      }}
                    >
                      <AntDesign
                        name="plus"
                        size={20}
                        color={theme.text}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <FlatList
                  data={item.availableTimes}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item: timeslot }) => (
                    <DayAvailability
                      startTime={timeslot.startTime}
                      endTime={timeslot.endTime}
                      dayOfTheWeek={timeslot.dayOfTheWeek}
                      editMode={editMode}
                      onDelete={() => removeAvailability(timeslot)}
                      onNewTime={(startTime, endTime, dayOfTheWeek) =>
                        addAvailability(startTime, endTime, dayOfTheWeek)
                      }
                      availableTimes={availableTimes}
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

      <AddAvailabilityModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(startTime, endTime) => {
          addAvailability(startTime, endTime, selectedDay);
          setIsModalOpen(false);
        }}
        availableTimes={availableTimes}
        dayOfTheWeek={selectedDay}
      />
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
    marginLeft: 10,
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
