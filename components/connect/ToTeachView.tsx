import React from "react";

import mockUsers from "@/mocks/mockUsers";
import { FlatList, View } from "react-native";
import UserCard from "./UserCard";

function ToTeachView() {
  return (
    <View>
      <FlatList
        data={mockUsers}
        renderItem={({ item }) => (
          <UserCard
            id={item.id}
            name={item.name}
            profilePicture={item.profilePicture}
            wantToX={item.wantToTeachSpecific}
            isLearn={false}
          />
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
}

export default ToTeachView;
