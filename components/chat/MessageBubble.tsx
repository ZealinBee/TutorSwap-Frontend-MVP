import { StyleSheet, Text, useColorScheme, View } from "react-native";

import { Colors } from "@/constants/Colors";
import timestampToTime from "@/utils/timestampToTime";
import Message from "@/types/Message";

export default function MessageBubble(message: Message) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const isUser = message.sender === "user";
  return (
    <>

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
          <Text style={[styles.text, { color: theme.text }]}>
            {message.text}
          </Text>
          <Text style={[styles.timestamp, { color: theme.text }]}>
            {timestampToTime(message.timestamp)}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 4,
    paddingHorizontal: 20,
  },
  textBubble: {
    borderRadius: 20,
    maxWidth: "80%",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
  },
  timestamp: {
    fontSize: 11,
    marginLeft: 10,
    alignSelf: "flex-end",
  },
});
