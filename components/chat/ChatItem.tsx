import { View, Text, Image, TouchableOpacity, useColorScheme, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

interface ChatItemProps {
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    id: string;
}

export default function ChatItem({item} : {item: ChatItemProps}) {
      const colorScheme = useColorScheme();
      const theme = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      style={styles.chatContainer}
      onPress={() => router.push({
        pathname: "/chat/[id]",
        params: { id: item.id },
      })}
    >
      <Image
        source={{ uri: item.avatar }}
        style={{ width: 70, height: 70, borderRadius: 50 }}
      />
      <View style={styles.chatInfoContainer}>
        <View>
          <Text
            style={[
              styles.userName,
              {
                color: theme.primary,
              },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.lastMessage,
              {
                color: theme.text,
              },
            ]}
          >
            {item.lastMessage}
          </Text>
        </View>
        <Text
          style={[
            styles.timestamp,
            {
              color: theme.text,
            },
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    </TouchableOpacity>
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
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {},
  timestamp: {
    fontSize: 12,
    marginLeft: "auto",
    marginRight: 0,
  },
});
