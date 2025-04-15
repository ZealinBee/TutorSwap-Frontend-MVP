import { AvailableTime } from "@/app/types/schedule/AvailableTime";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewBase,
} from "react-native";
import AddAvailabilityModal from "./AddAvailabilityModal";

interface DayAvailabilityProps {
  startTime: string;
  endTime: string;
  editMode: boolean;
  onDelete: () => void;
  onNewTime: (startTime: string, endTime: string, dayOfTheWeek: string) => void;
  dayOfTheWeek: string;
}

function DayAvailability({
  startTime,
  endTime,
  editMode,
  onDelete,
  onNewTime,
  dayOfTheWeek,
}: DayAvailabilityProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  const [startTimeInput, setStartTimeInput] = useState(startTime);
  const [endTimeInput, setEndTimeInput] = useState(endTime);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {editMode ? (
        <>
          <View style={styles.timing}>
            <TextInput
              value={startTimeInput}
              onChangeText={setStartTimeInput}
              style={styles.timeInput}
            ></TextInput>
            <Text style={styles.time}>-</Text>

            <TextInput
              value={endTimeInput}
              onChangeText={setEndTimeInput}
              style={styles.timeInput}
            ></TextInput>
            <TouchableOpacity style={styles.icon} onPress={onDelete}>
              <AntDesign name="delete" size={20} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setIsModalOpen(true)}
            >
              <AntDesign name="plus" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>
          {isModalOpen && (
            <AddAvailabilityModal
              visible={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={(startTime, endTime) => {
                onNewTime(startTime, endTime, dayOfTheWeek);
                setIsModalOpen(false);
              }}
            />
          )}
        </>
      ) : (
        <View style={styles.timing}>
          <Text style={styles.time}>{startTime}</Text>
          <Text style={styles.time}>-</Text>
          <Text style={styles.time}>{endTime}</Text>
        </View>
      )}
    </>
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
    fontSize: 16,
    marginVertical: 5,
  },
  time: {
    fontSize: 16,
  },
  timeInput: {
    borderWidth: 1,
    width: 60,
    textAlign: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  icon: {
    marginLeft: 10,
  },
});

export default DayAvailability;
