import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export default function BasicInfoEdit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];

  return (
    <>
      <View>
        <Text style={[styles.label, { color: theme.text }]}>
          Your Full Name
        </Text>
        <TextInput
          placeholder="John Doe"
          value={name}
          onChangeText={setName}
          style={styles.nameInput}
          placeholderTextColor="#888"
        ></TextInput>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={[styles.label, { color: theme.text }]}>
          A Short Description About You
        </Text>
        <TextInput
          placeholder="Tell us about yourself"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
          style={styles.descriptionInput}
          placeholderTextColor="#888"
        ></TextInput>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  nameInput: {
    padding: 10,
    borderRadius: 5,
    width: 350,
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  descriptionInput: {
    padding: 10,
    borderRadius: 5,
    width: 350,
    backgroundColor: "#fff",
  },
});
