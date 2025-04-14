import BasicInfoEdit from "@/components/input/BasicInfoEdit";
import InterestEdit from "@/components/input/InterestEdit";
import ProfileImageEdit from "@/components/input/ProfileImageEdit";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

function EditProfile() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  const router = useRouter();

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.header, { color: theme.text }]}>
          Edit Your Profile
        </Text>
        <View style={{ alignSelf: "center", marginTop: 20 }}>
          <ProfileImageEdit></ProfileImageEdit>
        </View>
        <BasicInfoEdit></BasicInfoEdit>
        <InterestEdit></InterestEdit>
        <TouchableOpacity onPress={() => router.back()}>
          <Text
            style={[
              styles.button,
              {
                backgroundColor: theme.text,
                color: theme.textInverse,
              },
            ]}
          >
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    flex: 1,
    paddingBottom: 50,
  },
  button: {
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
    marginTop: 20,
    fontWeight: "500",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 20,
  },
});

export default EditProfile;
