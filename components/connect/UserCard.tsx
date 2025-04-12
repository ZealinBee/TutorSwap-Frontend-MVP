import React from "react";

import mockUsers from "@/mocks/mockUsers";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface UserCardProps {
  id: string;
  name: string;
  wantToX: string;
  isLearn: boolean;
  profilePicture: string;
}

function UserCard(user: UserCardProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profilePicture }} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text>
          Wants to {user.isLearn ? "Learn" : "Teach"} {user.wantToX}
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.secondary }]}
        >
          <Text>View More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 20,
  },
  rightContainer: {
    width: "65%",
    marginLeft: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 55,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
});

export default UserCard;
