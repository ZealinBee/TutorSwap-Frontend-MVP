import ToLearnView from "@/components/connect/ToLearnView";
import ToTeachView from "@/components/connect/ToTeachView";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";

function Connect() {
  const [mode, setMode] = useState<"learn" | "teach">("learn");

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  return (
    <View style={styles.container}>
      <View
        style={[styles.toggleContainer, { backgroundColor: theme.background }]}
      >
        <TouchableOpacity
          style={[
            styles.toggleButton,
            mode === "learn" && { backgroundColor: theme.primary },
          ]}
          onPress={() => setMode("learn")}
        >
          <Text
            style={[styles.toggleText, mode === "learn" && styles.activeText]}
          >
            To Learn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            mode === "teach" && { backgroundColor: theme.primary },
          ]}
          onPress={() => setMode("teach")}
        >
          <Text
            style={[styles.toggleText, mode === "teach" && styles.activeText]}
          >
            To Teach
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {mode === "learn" ? <ToLearnView /> : <ToTeachView />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 8,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
  },
  toggleText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  activeText: {
    color: "#fff",
  },
  content: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
});

export default Connect;
