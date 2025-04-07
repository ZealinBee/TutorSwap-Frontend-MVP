import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import ChatItem from "@/components/chat/ChatItem";

const mockChats = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Wassup, when are you available?",
    timestamp: "10:30 AM",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "Thanks for the physics help!",
    timestamp: "Yesterday",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Alice Johnson",
    lastMessage: "Let's catch up soon!",
    timestamp: "2 days ago",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Bob Brown",
    lastMessage: "Can you send me the report?",
    timestamp: "Last week",
    avatar: "https://i.pravatar.cc/150?img=4",
  }
  // Add more mock chats as needed
];

export default function Chat() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <>
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            {
              color: theme.primary,
            },
          ]}
        >
          Chats
        </Text>
        <FlatList
          data={mockChats}
          renderItem={(item) => (
            <ChatItem
              item={item.item}
            ></ChatItem>
          )}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  chatContainer: {
    flexDirection: "row",
    paddingTop: 20,
  },
  chatInfoContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  lastMessage: {},
  timestamp: {
    fontSize: 12,
    marginLeft: "auto",
    marginRight: 0,
  },
});
