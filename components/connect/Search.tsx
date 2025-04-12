import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

//   const searchHandler = () => {

//   }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background, borderColor: theme.gray },
      ]}
    >
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />
      <TouchableOpacity style={styles.searchButton} >
        <AntDesign name="search1" size={24} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    paddingBottom: 1,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderWidth: 1,
  },
  input: {
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 40,
  },
  searchButton: {
    position: "absolute",
    right: 10,
    top: 5,
    padding: 5,
  },
});

export default Search;
