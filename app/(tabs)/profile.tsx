import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Profile() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=1" }}
          style={styles.profileImage}
        ></Image>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.editButton,
              {
                backgroundColor: theme.secondary,
              },
            ]}
          >
            <MaterialIcons name="edit" size={18} color={theme.textInverse} />
            <Text style={{ color: theme.textInverse }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.username}>Jeff Bezos</Text>
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore,
        perferendis quis? Quod soluta nulla ullam quisquam voluptates, officiis
        dolores sequi cumque, necessitatibus accusantium, molestias magnam?
      </Text>
      <View>
        <Text style={styles.skillHeader}>Want to Learn:</Text>
        <Text>Languages: Spanish</Text>
      </View>
      <View>
        <Text style={styles.skillHeader}>Want to Teach:</Text>
        <Text>Mathematics: Algebra</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: "auto",
  },
  editButton: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  skillHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
