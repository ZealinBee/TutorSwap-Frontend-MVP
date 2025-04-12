import React from "react";

import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

function DetailsContainer() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View>
      <Text style={[styles.username, { color: theme.text }]}>Jeff Bezos</Text>
      <Text style={{ color: theme.text }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore,
        perferendis quis? Quod soluta nulla ullam quisquam voluptates, officiis
        dolores sequi cumque, necessitatibus accusantium, molestias magnam?
      </Text>
      <View >
        <Text style={[styles.skillHeader, {color: theme.text}]}>Want to Learn:</Text>
        <Text style={{color: theme.text}}>Languages: Spanish</Text>
      </View>
      <View>
        <Text style={[styles.skillHeader, {color: theme.text}]}>Want to Teach:</Text>
        <Text style={{color: theme.text}}>Mathematics: Algebra</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  skillHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default DetailsContainer;
