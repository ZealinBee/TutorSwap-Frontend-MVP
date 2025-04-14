import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import MessageBubble from "@/components/chat/MessageBubble";
import { Colors } from "@/constants/Colors";

import shouldDateAppear from "@/utils/shouldDateAppear";
import DateSeparator from "@/components/chat/DateSeparator";
import formatMessageDate from "@/utils/formatMessageDate";
import mockMessages from "@/mocks/mockMessages";
import ProfileTopBar from "@/components/chat/ProfileTopBar";

export default function ChatDetails() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }, []);

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

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <ProfileTopBar></ProfileTopBar>
      <FlatList
        ref={flatListRef}
        data={messages}
        style={{marginBottom:15}}
        renderItem={({ item, index }) => (
          <>
            {shouldDateAppear(index, messages) && (
              <DateSeparator date={formatMessageDate(item.timestamp)} />
            )}
            <MessageBubble
              text={item.text}
              id={item.id}
              sender={item.sender}
              timestamp={item.timestamp}
            ></MessageBubble>
          </>
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
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 10,
  },
  sendButton: {
    marginRight: 15,
  },
});
