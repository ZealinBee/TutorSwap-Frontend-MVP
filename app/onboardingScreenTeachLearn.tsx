import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import subjects from "@/mocks/mockSubjects";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

function OnboardingScreenTeachLearn() {
  const [selectedToLearn, setSelectedToLearn] = useState("");
  const [selectedToTeach, setSelectedToTeach] = useState("");

  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
        Let's be more specific with what you want to learn
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
      Let's be more specific with what you want to learn
      </Text>
      <TextInput
        placeholder="E.g. JavaScript, Spanish"
        style={styles.skillInput}
      ></TextInput>
      <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
        <Text
          style={[
            styles.button,
            {
              backgroundColor: theme.text,
              color: theme.textInverse,
              fontWeight: "500",
            },
          ]}
        >
          Finish set up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 350,
    marginBottom: 5,
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  skillInput: {
    padding: 10,
    borderRadius: 5,
    width: 350,
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  picker: {
    width: 350,
    height: 50,
    margin: 0,
    padding: 0,
    transform: [{ translateY: -3 }], // This will help center the text vertically
  },
  pickerContainer: {
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
});

export default OnboardingScreenTeachLearn;
