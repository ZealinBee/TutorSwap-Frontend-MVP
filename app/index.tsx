import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen() {
  const handleTermsPress = () => {
    Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  };
  const handlePrivacyPress = () => {
    Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>TutorSwap</Text>
        <Text style={styles.description}>Teach to Learn, Learn to Teach</Text>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <AntDesign name="google" size={24} color="white" />
            <Text style={styles.buttonText}>Sign In with Google</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.signinDisclaimer}>
          Signing in the first time will automatically create an account, and in
          doing so you agree to our{" "}
          <Text onPress={handleTermsPress} style={styles.link}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text onPress={handlePrivacyPress} style={styles.link}>
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
    marginLeft: 15,
    marginRight: 15,
    marginTop: 50,
    paddingBottom: 30,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4E008E",
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#4285F4",
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
  link: {
    color: "#4E008E",
  },
});
