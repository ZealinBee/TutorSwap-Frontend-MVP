import { Colors } from "@/constants/Colors";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import Message from "@/components/Message";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const mockMessages = [
  {
    id: "1",
    sender: "user",
    text: "Hello, how are you?",
    timestamp: "2023-10-01T10:00:00Z",
  },
  {
    id: "2",
    sender: "other",
    text: "I am good, thanks! How about you?",
    timestamp: "2023-10-01T10:01:00Z",
  },
  {
    id: "3",
    sender: "user",
    text: "I am doing well, thank you!",
    timestamp: "2023-10-01T10:02:00Z",
  },
];

export default function ChatDetails() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const { id } = useLocalSearchParams();

  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const sendMessageHandler = () => {
    if (newMessage.trim().length === 0) return;

    const message = {
      id: (messages.length + 1).toString(),
      sender: "user",
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
        paddingTop: 40
      }}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message
            text={item.text}
            id={item.id}
            sender={item.sender}
            timestamp={item.timestamp}
          ></Message>
        )}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.gray }]}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        ></TextInput>
        <Pressable onPress={sendMessageHandler}>
          <AntDesign
            name="arrowright"
            size={24}
            color={theme.primary}
            style={styles.sendButton}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 10,
  },
  sendButton: {
    marginRight:15,
  },
});
