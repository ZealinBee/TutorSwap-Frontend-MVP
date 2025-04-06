import { StyleSheet, Text, useColorScheme, View } from "react-native";

import { Colors } from "@/constants/Colors";
import timestampToTime from "@/utils/timestampToTime";

type MessageProps = {
  text: string;
  id: string;
  sender: string;
  timestamp: string;
};

export default function Message(message: MessageProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const isUser = message.sender === "user";
  return (
    <View
      style={[
        styles.container,
        {
          alignItems: isUser ? "flex-end" : "flex-start",
        },
      ]}
    >
      <View
        style={[
          styles.textBubble,
          {
            backgroundColor: isUser ? theme.secondary : theme.gray,
          },
        ]}
      >
        <Text style={[styles.text, { color: theme.text }]}>{message.text}</Text>
        <Text style={[styles.timestamp, { color: theme.text }]}>
          {timestampToTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textBubble: {
    borderRadius: 20,
    marginTop: 5,
    maxWidth: "80%",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 6,
    paddingBottom: 7,
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
  },
  timestamp: {
    fontSize: 10,
    marginLeft: 10,
    alignSelf: "flex-end",
  },
});
