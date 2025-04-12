import React from "react";

import mockUsers from "@/mocks/mockUsers";
import { FlatList, View } from "react-native";
import UserCard from "./UserCard";

function ToLearnView() {
  return (
    <View>
      <FlatList
        data={mockUsers}
        renderItem={({item}) => (
            <UserCard
              id={item.id}
              name={item.name}
              wantToX={item.wantToLearnLabel}
              isLearn={true}
              profilePicture={item.profilePicture}
            />
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
}

export default ToLearnView;
