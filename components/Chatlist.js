import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useAuth } from "../context/authContext";
import { useRouter } from "expo-router";

export default function Chatlist({ users }) {
  const router=useRouter();
  return (
    <View style={{}}>
      <FlatList
        data={users}
        contentContainerStyle={{ paddingVertical: 25 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => Math.random()}
        renderItem={({ item, index }) => <ChatItem noBorder={index+1==users.length} item={item} router={router}/>}
      />
    </View>
  );
}
