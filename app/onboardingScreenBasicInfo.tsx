import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import ProfileImageEdit from "@/components/input/ProfileImageEdit";
import BasicInfoEdit from "@/components/input/BasicInfoEdit";

function OnboardingScreenBasicInfo() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const router = useRouter();

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.header, {color: theme.text}]}>Let's set up your profile</Text>
        <ProfileImageEdit></ProfileImageEdit>
        <BasicInfoEdit></BasicInfoEdit>

        <TouchableOpacity
          onPress={() => router.push("/onboardingScreenTeachLearn")}
          style={{marginTop: 20}}
        >
          <Text
            style={[
              styles.button,
              {
                backgroundColor: theme.text,
                color: theme.textInverse,
                fontWeight: "500",
              },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 15,
    marginTop: 30,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 350,
    marginBottom: 5,
    fontSize: 16,
    textAlign: "center",
  }
});

export default OnboardingScreenBasicInfo;