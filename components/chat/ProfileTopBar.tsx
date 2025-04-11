import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function ProfileTopBar() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => router.replace("/chat")}>
          <AntDesign
            name="arrowleft"
            size={24}
            color={theme.text}
            style={styles.arrow}
          />
        </Pressable>
        <TouchableOpacity style={styles.profileContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=1" }}
            style={{ width: 40, height: 40, borderRadius: 25 }}
          />
          <Text
            style={[
              styles.name,
              {
                color: theme.text,
              },
            ]}
          >
            Jeff Bezos
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  arrow: {
    marginRight: 15,
  },
});
