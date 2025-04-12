import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

interface ConnectModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
  type: "teach" | "learn";
}

function ConnectModal({ visible, onClose, onSubmit, type }: ConnectModalProps) {
  const [message, setMessage] = useState("");
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[styles.modalContent, { backgroundColor: theme.background }]}
        >
          <Text style={[styles.modalTitle, { color: theme.text }]}>
            Connect to {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
          <TextInput
            style={[
              styles.messageInput,
              { color: theme.text, borderColor: theme.gray },
            ]}
            placeholder="Hi! I want to learn xyz..."
            placeholderTextColor={theme.text}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.secondary }]}
              onPress={onClose}
            >
              <Text style={{ color: theme.textInverse }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.primary }]}
              onPress={() => {
                onSubmit(message);
                setMessage("");
              }}
            >
              <Text style={{ color: theme.textInverse }}>Send Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  messageInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  modalButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default ConnectModal;
