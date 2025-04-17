import { AvailableTime } from "@/types/schedule/AvailableTime";
import isTimeOverlapping from "@/utils/isTimeOverlapping";
import isTimeRangeValid from "@/utils/isTimeRangeValid";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

interface AddAvailabilityModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (startTime: string, endTime: string) => void;
  availableTimes: AvailableTime[];
  dayOfTheWeek: string;
}

function AddAvailabilityModal({
  visible,
  onClose,
  onConfirm,
  availableTimes,
  dayOfTheWeek,
}: AddAvailabilityModalProps) {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const [selectingStartTime, setSelectingStartTime] = useState(true);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour, minute);
        slots.push(
          time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
      }
    }
    return slots;
  };

  const handleTimeSelect = (time: string) => {
    if (selectingStartTime) {
      setStartTime(time);
      setSelectingStartTime(false);
    } else {
      setEndTime(time);
    }
  };

  const submitTimeSelection = () => {
    if(!isTimeRangeValid(startTime, endTime)) {
      alert("Invalid time range selected. Please select a valid range.");
      return;
    }
    if(isTimeOverlapping(availableTimes, startTime, endTime, dayOfTheWeek)) {
      alert("Selected time overlaps with existing availability.");
      return;
    }
    onConfirm(startTime, endTime);
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity
              style={[
                styles.timeSelector,
                selectingStartTime && styles.activeSelector,
              ]}
              onPress={() => setSelectingStartTime(true)}
            >
              <Text style={styles.timeSelectorLabel}>Start Time</Text>
              <Text style={styles.selectedTime}>{startTime}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.timeSelector,
                !selectingStartTime && styles.activeSelector,
              ]}
              onPress={() => setSelectingStartTime(false)}
            >
              <Text style={styles.timeSelectorLabel}>End Time</Text>
              <Text style={styles.selectedTime}>{endTime}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.timeList}>
            {generateTimeSlots().map((time, index) => (
              <TouchableOpacity
                key={index}
                style={styles.timeItem}
                onPress={() => handleTimeSelect(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    (selectingStartTime ? startTime : endTime) === time &&
                      styles.selectedTimeText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => submitTimeSelection()}
            >
              <Text style={styles.buttonText}>Use these times</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: 15,
  },
  timeSelector: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeSelector: {
    backgroundColor: "#F0F0F0",
  },
  timeSelectorLabel: {
    fontSize: 14,
    color: "#666",
  },
  selectedTime: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  timeList: {
    flex: 1,
    marginVertical: 20,
  },
  timeItem: {
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  timeText: {
    fontSize: 16,
  },
  selectedTimeText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#E5E5E5",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddAvailabilityModal;
