import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

function ProfileImageEdit() {
  const [image, setImage] = useState("");

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

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

  return (
    <View style={styles.profileImageContainer}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <View>
            <Image source={{ uri: image }} style={styles.profileImage} />
            <View
              style={[styles.editIconContainer, { borderColor: theme.text }]}
            >
              <MaterialIcons name="edit" size={16} color={theme.text} />
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.profileImagePlaceholder,
              { backgroundColor: theme.gray },
            ]}
          >
            <FontAwesome name="user" size={50} color={theme.text} />
            <View
              style={[styles.editIconContainer, { borderColor: theme.text }]}
            >
              <MaterialIcons name="edit" size={16} color={theme.text} />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
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
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: -10,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  }
});
export default ProfileImageEdit;
