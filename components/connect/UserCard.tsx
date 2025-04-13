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
import { useRouter } from "expo-router";

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
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profilePicture }} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text style={[styles.name, {color:theme.text}]}>{user.name}</Text>
        <Text style={{ color: theme.text}}>
          Wants to {user.isLearn ? "Learn" : "Teach"} {user.wantToX}
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.secondary }]}
          onPress={() => router.push({
            pathname: "/profile/[id]",
            params: { id: user.id },
          })}
        >
          <Text style={{color: theme.whiteAllAround, fontSize: 12}}>View Details</Text>
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
    width: 90,
    height: 90,
    borderRadius: 55,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignSelf: "flex-start",
    width: "100%",
    alignItems: "center",
  },
});

export default UserCard;
