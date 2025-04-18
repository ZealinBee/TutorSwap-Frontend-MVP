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
import { AntDesign } from "@expo/vector-icons";

import { AvailableTime } from "../../types/schedule/AvailableTime";
import groupAvailabilityByDayOfTheWeek from "@/utils/groupAvailabilityByDayOfTheWeek";
import AddAvailabilityModal from "@/components/schedule/AddAvailabilityModal";
import AvailabilityPreference from "@/components/schedule/AvailabilityPreference";
import mockAvailableTimes from "@/mocks/mockAvailableTimes";
import DayAvailability from "@/components/schedule/DayAvailability";
import mockReservationPreference from "@/mocks/mockReservationPreference";

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
  const [futureDays, setFutureDays] = useState(
    mockReservationPreference.futureDays
  );
  const [minimumNoticeHours, setMinimumNoticeHours] = useState(
    mockReservationPreference.minimumNoticeHours
  );

  const [availableTimes, setAvailableTimes] = useState([] as AvailableTime[]);
  const [tempAvailableTimes, setTempAvailableTimes] = useState(
    [] as AvailableTime[]
  );

  const [groupedAvailability, setGroupedAvailability] = useState(
    [] as DayGroup[]
  );

  const removeAvailability = (timeslot: AvailableTime) => {
    const updatedAvailableTimes = tempAvailableTimes.filter((availableTime) => {
      return availableTime.id !== timeslot.id;
    });
    setTempAvailableTimes(updatedAvailableTimes);
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

    tempAvailableTimes.push(newAvailability);
    setGroupedAvailability(groupAvailabilityByDayOfTheWeek(tempAvailableTimes));
  };

  useEffect(() => {
    const init = () => {
      setAvailableTimes(mockAvailableTimes);
      setTempAvailableTimes(mockAvailableTimes);
      setGroupedAvailability(
        groupAvailabilityByDayOfTheWeek(mockAvailableTimes)
      );
    };
    init();
  }, []);

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <View style={[{ backgroundColor: theme.background }, styles.container]}>
        <View style={styles.topContainer}>
          <Text
            style={[
              styles.header,
              {
                color: theme.primary,
              },
            ]}
          >
            Your Availability Schedule
          </Text>
          {!editMode && (
            <TouchableOpacity
              onPress={() => setEditMode(true)}
              style={[styles.editButton, { backgroundColor: theme.primary }]}
            >
              <Text style={{ color: theme.whiteAllAround, fontSize: 16 }}>
                Edit
              </Text>
            </TouchableOpacity>
          )}
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
          {editMode ? (
            <AvailabilityPreference
              futureDays={futureDays}
              minimumNoticeHours={minimumNoticeHours}
              setFutureDays={setFutureDays}
              setMinimumNoticeHours={setMinimumNoticeHours}
            />
          ) : (
            <Text>
              Invitees can schedule up to {futureDays}{" "}
              days into the future with at least{" "}
              {minimumNoticeHours} hours notice
            </Text>
          )}
        </View>

        {editMode && (
          <View style={styles.editButtonWrapper}>
            <TouchableOpacity
              onPress={() => setEditMode(false)}
              style={[
                styles.saveAndCancelButton,
                { backgroundColor: theme.secondary },
              ]}
            >
              <Text
                style={{
                  color: theme.whiteAllAround,
                  fontSize: 16,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEditMode(false);
                setTempAvailableTimes(availableTimes);
                setGroupedAvailability(
                  groupAvailabilityByDayOfTheWeek(availableTimes)
                );
              }}
              style={[
                styles.saveAndCancelButton,
                { borderWidth: 1, borderColor: theme.danger },
              ]}
            >
              <Text style={{ color: theme.danger, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 20,
    flex: 1,
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

  editButtonWrapper: {
    flexDirection: "row",
    marginTop: 20,
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  saveAndCancelButton: {
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
    width: 80,
    alignItems: "center",
  },
});

export default schedule;
