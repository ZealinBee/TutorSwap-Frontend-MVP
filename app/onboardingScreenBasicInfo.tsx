import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants/Colors";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

function OnboardingScreenBasicInfo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to upload your profile picture.",
          [{ text: "OK" }]
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Let's set up your profile</Text>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <View>
                <Image source={{ uri: image }} style={styles.profileImage} />
                <View style={styles.editIconContainer}>
                  <MaterialIcons name="edit" size={16} color={theme.text} />
                </View>
              </View>
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <FontAwesome name="user" size={50} color={theme.text} />
                <View style={styles.editIconContainer}>
                  <MaterialIcons name="edit" size={16} color={theme.text} />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.label}>Your Full Name</Text>
          <TextInput
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            style={styles.nameInput}
            placeholderTextColor="#888"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.label}>A Short Description About You</Text>
          <TextInput
            placeholder="Tell us about yourself"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
            style={styles.descriptionInput}
            placeholderTextColor="#888"
          ></TextInput>
        </View>

        <TouchableOpacity onPress={() => router.push("/onboardingScreenTeachLearn")}>
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
  nameInput: {
    padding: 10,
    borderRadius: 5,
    width: 350,
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  descriptionInput: {
    padding: 10,
    borderRadius: 5,
    width: 350,
    marginBottom: 25,
    backgroundColor: "#fff",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 350,
    marginBottom: 5,
    textAlign: "center",
  },
  profileImageContainer: {
    marginBottom: 20,
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  placeholder: {
    color: "#888",
  },
});

export default OnboardingScreenBasicInfo;
