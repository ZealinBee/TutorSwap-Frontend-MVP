import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRoute } from "@react-navigation/native";
import subjects from "@/mocks/mockSubjects";

function InterestEdit() {
  const [selectedToLearn, setSelectedToLearn] = useState("");
  const [selectedToTeach, setSelectedToTeach] = useState("");

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <>
      <Text
        style={[
          styles.label,
          {
            color: theme.text,
          },
        ]}
      >
        What do you want to learn?
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedToLearn}
          onValueChange={(itemValue) => setSelectedToLearn(itemValue)}
          style={styles.picker}
        >
          {subjects.map((subject) => {
            return (
              <Picker.Item
                key={subject.value}
                label={subject.label}
                value={subject.value}
              />
            );
          })}
        </Picker>
      </View>
      <Text style={[styles.label, { color: theme.text }]}>
        Let's be more specific
      </Text>
      <TextInput
        placeholder="E.g. JavaScript, Spanish"
        style={styles.skillInput}
      ></TextInput>

      <Text style={[styles.label, { color: theme.text }]}>
        What do you want to teach?
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedToTeach}
          onValueChange={(itemValue) => setSelectedToTeach(itemValue)}
          style={styles.picker}
        >
          {subjects.map((subject) => {
            return (
              <Picker.Item
                key={subject.value}
                label={subject.label}
                value={subject.value}
              />
            );
          })}
        </Picker>
      </View>
      <Text style={[styles.label, { color: theme.text }]}>
        Let's be more specific
      </Text>
      <TextInput
        placeholder="E.g. JavaScript, Spanish"
        style={styles.skillInput}
      ></TextInput>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  skillInput: {
    padding: 15,
    borderRadius: 5,
    width: 350,
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  picker: {
    height: 53,
    margin: 0,
    padding: 0,
    transform: [{ translateY: -3 }],
    backgroundColor: "#ffffff",
  },
  pickerContainer: {
    borderRadius: 8,
    height: 53,
  },
});

export default InterestEdit;
