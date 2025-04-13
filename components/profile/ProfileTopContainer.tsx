import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import ConnectModal from "./ConnectModal";
import { useRouter } from "expo-router";

interface ProfileTopContainerProps {
  ownProfile: boolean;
}
function ProfileTopContainer({ ownProfile }: ProfileTopContainerProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [connectType, setConnectType] = useState<"teach" | "learn">("teach");



  return (
    <View style={styles.topContainer}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=1" }}
        style={styles.profileImage}
      ></Image>
      <View style={styles.buttonContainer}>
        {ownProfile ? (
          <TouchableOpacity
            style={[
              styles.editButton,
              {
                backgroundColor: theme.secondary,
              },
            ]}
            onPress={() => {
              router.push("/editProfile");
            }}
          >
            <Text style={{ color: theme.text, marginLeft: 5 }}>
              Edit Profile
            </Text>
            <MaterialIcons
              name="edit"
              size={18}
              color={theme.text}
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[
                styles.editButton,
                {
                  backgroundColor: theme.secondary,
                },
              ]}
              onPress={() => {
                setConnectType("teach");
                setModalVisible(true);
              }}
            >
              <MaterialIcons
                name="link"
                size={18}
                color={theme.text}
                style={{ marginRight: 5, paddingTop: 2 }}
              />
              <Text style={{ color: theme.text }}>Connect to Teach</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.editButton,
                {
                  backgroundColor: theme.primary,
                },
              ]}
              onPress={() => {
                setConnectType("learn");
                setModalVisible(true);
              }}
            >
              <MaterialIcons
                name="link"
                size={18}
                color={theme.text}
                style={{ marginRight: 5, paddingTop: 2 }}
              />
              <Text style={{ color: theme.text }}>Connect to Learn</Text>
            </TouchableOpacity>
            <ConnectModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onSubmit={(message) => {
                console.log(message);
                setModalVisible(false);
              }}
              type={connectType}
            ></ConnectModal>
          </>
        )}
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
    marginVertical: 5,
    justifyContent: "center",
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

export default ProfileTopContainer;
