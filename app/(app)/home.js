import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useAuth } from "../../context/authContext";

export default function home() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  //console.log("userdata:", user);

  return (
    <View>
      <Text style={{ fontSize: 50 }}>Hello There</Text>
      <Pressable onPress={handleLogout}>
        <Text>LOG OUT</Text>
      </Pressable>
    </View>
  );
}
