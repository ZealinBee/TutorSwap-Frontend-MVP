import DetailsContainer from "@/components/profile/DetailsContainer";
import TopContainer from "@/components/profile/ProfileTopContainer";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Touchable, TouchableOpacity, useColorScheme, View } from "react-native";

export default function ProfileDetails() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color={theme.text} />
      </TouchableOpacity>
      <TopContainer ownProfile={false} />
      <DetailsContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
});
