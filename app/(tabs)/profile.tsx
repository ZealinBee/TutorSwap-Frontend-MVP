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

import ProfileTopContainer from "@/components/profile/ProfileTopContainer";
import DetailsContainer from "@/components/profile/DetailsContainer";

export default function Profile() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ProfileTopContainer ownProfile={true} />
      <DetailsContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40
  },
});
