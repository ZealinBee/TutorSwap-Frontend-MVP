import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface FuturePreferenceModalProps {
  futureDays: number;
  setFutureDays: (days: number) => void;
}

function FuturePreferenceModal({
  futureDays,
  setFutureDays,
}: FuturePreferenceModalProps) {
  const [duration, setDuration] = useState(futureDays.toString());

  const handleChange = (value: string) => {
    const numericValue = parseInt(value, 10);
    if(value === "") {
      setDuration(value);
      setFutureDays(0);
    }
    if (!isNaN(numericValue)) {
      setDuration(value);
      setFutureDays(numericValue);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={handleChange}
        keyboardType="numeric"
      />
      <Text style={{fontSize: 16}}>days into the future</Text>
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

export default FuturePreferenceModal;
