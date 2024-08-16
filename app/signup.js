import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import { AuthContext, useAuth } from "../context/authContext";
import CustomKeyBoardView from "../components/CustomKeyBoardView";

//import LottieView from 'lottie-react-native';

export default function signup() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Sign In", "Please fill all the fields!");
      return;
    }
    setLoading(true);
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    setLoading(false);

    console.log("got result:", response);
    if (!response.success) {
      Alert.alert("Sign up", response.msg);
    }
  };
  return (
    <GestureHandlerRootView>
      <CustomKeyBoardView>
        <StatusBar style="dark" />
        <View
          style={{ paddingTop: hp(10), paddingHorizontal: wp(5) }}
          className="flex-1 gap-12"
        >
          <View className="items-center">
            <Image
              style={{ height: hp(20) }}
              resizeMode="contain"
              source={require("../assets/images/sign.jpg")}
            />
          </View>
          <View className="gap-10">
            <Text
              style={{ fontSize: hp(4) }}
              className="font-bold tracking-wider text-center"
            >
              Register
            </Text>
            <View className="gap-3">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
              >
                <FontAwesome name="user" size={24} color="gray" />
                <TextInput
                  onChangeText={(value) => (usernameRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="font-bold flex-1"
                  placeholder="User Name"
                  placeholderTextColor="gray"
                ></TextInput>
              </View>
              <View
                style={{ height: hp(10) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
              >
                <Ionicons name="mail-sharp" size={24} color="gray" />
                <TextInput
                  onChangeText={(value) => (emailRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="font-bold flex-1"
                  placeholder="Email Adress"
                  placeholderTextColor="gray"
                ></TextInput>
              </View>
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
              >
                <Ionicons name="lock-closed" size={24} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="font-bold flex-1"
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor="gray"
                ></TextInput>
              </View>

              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
              >
                <Ionicons name="image-outline" size={24} color="gray" />
                <TextInput
                  onChangeText={(value) => (profileRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="font-bold flex-1"
                  placeholder="Image URL"
                  placeholderTextColor="gray"
                ></TextInput>
              </View>

              {/*submit button*/}
              <View>
                {loading ? (
                  <View className="flex-row justify-center">
                    <Loading size={hp(12)} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleRegister}
                    style={{ height: hp(7.5) }}
                  >
                    <View className="bg-indigo-700 p-4 rounded-xl justify-center items-center">
                      <Text
                        style={{ fontSize: 20}}
                        className="color-white font-bold"
                      >
                        Sign Up
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              <View className="justify-center flex-row">
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="font-semibold text-neutral-500"
                >
                  Already have an account?{" "}
                </Text>
                <Pressable onPress={() => router.push("signin")}>
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="font-semibold text-indigo-500"
                  >
                    Sign In
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </CustomKeyBoardView>
    </GestureHandlerRootView>
  );
}
