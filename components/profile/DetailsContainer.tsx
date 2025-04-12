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
  return (
    <View>
      <Text style={styles.username}>Jeff Bezos</Text>
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore,
        perferendis quis? Quod soluta nulla ullam quisquam voluptates, officiis
        dolores sequi cumque, necessitatibus accusantium, molestias magnam?
      </Text>
      <View>
        <Text style={styles.skillHeader}>Want to Learn:</Text>
        <Text>Languages: Spanish</Text>
      </View>
      <View>
        <Text style={styles.skillHeader}>Want to Teach:</Text>
        <Text>Mathematics: Algebra</Text>
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
