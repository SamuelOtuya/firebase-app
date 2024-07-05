import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";

const ios = Platform.os == "ios";
export default function CustomKeyBoardView({ children }) {
  return (
    <View>
      <Text>CustomKeyBoardView</Text>
      <KeyboardAvoidingView
        behavior={ios ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          bounces="false"
          showsVerticalScrollIndicator="false"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
