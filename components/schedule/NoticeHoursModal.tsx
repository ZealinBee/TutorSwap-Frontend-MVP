import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface NoticeHoursModalProps {
  minimumNoticeHours: number;
  setMinimumNoticeHours: (hours: number) => void;
}

function NoticeHoursModal({
  minimumNoticeHours,
  setMinimumNoticeHours,
}: NoticeHoursModalProps) {
  const [duration, setDuration] = useState(minimumNoticeHours.toString());

  const handleChange = (value: string) => {
    const numericValue = parseInt(value, 10);
    if (value === "") {
      setDuration(value);
      setMinimumNoticeHours(0);
    }
    if (!isNaN(numericValue)) {
      setDuration(value);
      setMinimumNoticeHours(numericValue);
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={handleChange}
          keyboardType="numeric"
        />
        <Text style={{ fontSize: 16 }}>hours notice</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    width: 50,
    borderRadius: 5,
    textAlign: "center",
  },
});

export default NoticeHoursModal;
