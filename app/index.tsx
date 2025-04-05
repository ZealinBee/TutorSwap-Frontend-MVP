import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const handleTermsPress = () => {
    Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  };
  const handlePrivacyPress = () => {
    Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  };
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.primary }]}>TutorSwap</Text>
        <Text style={[styles.description, { color: theme.text }]}>
          Teach to Learn, Learn to Teach
        </Text>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.secondary }]}
          onPress={() => router.replace("/(tabs)/chat")}
        >
          <View style={styles.buttonContent}>
            <AntDesign name="google" size={24} color="white" />
            <Text style={styles.buttonText}>Sign In with Google</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.signinDisclaimer}>
          Signing in the first time will automatically create an account, and in
          doing so you agree to our{" "}
          <Text onPress={handleTermsPress} style={{ color: theme.primary }}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text onPress={handlePrivacyPress} style={{ color: theme.primary }}>
            Privacy Policy
          </Text>{" "}
          .
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
    paddingBottom: 40,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: 350,
    marginBottom: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingLeft: 10,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signinDisclaimer: {
    fontSize: 13,
    color: "#888",
    marginTop: 10,
  },
});
