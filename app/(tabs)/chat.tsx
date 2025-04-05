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
  // Add more mock chats as needed
];

export default function Chat() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatContainer}>
      <Image
        source={{ uri: item.avatar }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <View style={styles.chatInfoContainer}>
        <View>
          <Text style={[styles.userName, {
            color: theme.primary
          }]}>{item.name}</Text>
          <Text
            style={[
                styles.lastMessage,
                {
                    color: theme.text,
                }
            ]}
          >{item.lastMessage}</Text>
        </View>
        <Text style={[
            styles.timestamp,
            {
                color: theme.text,
            },
        ]}>{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

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
          renderItem={renderChatItem}
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
    flex:1,
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
  lastMessage: {

  },
    timestamp: {
        fontSize: 12,
        marginLeft: "auto",
        marginRight: 0
    },
});
