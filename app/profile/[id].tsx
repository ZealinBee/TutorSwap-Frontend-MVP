import DetailsContainer from "@/components/profile/DetailsContainer";
import TopContainer from "@/components/profile/ProfileTopContainer";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";

export default function ProfileDetails() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
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
