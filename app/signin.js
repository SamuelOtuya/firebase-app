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
import { Ionicons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";
//import LottieView from "lottie-react-native";

export default function signin() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill all the fields!");
      return;
    }
    //login process
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign in", response.msg);
    }
  };

  return (
    <GestureHandlerRootView>
      <View className="flex-1">
        <StatusBar style="dark" />
        <View
          style={{ paddingTop: hp(10), paddingHorizontal: wp(5) }}
          className="flex-1 gap-12"
        >
          <View className="items-center">
            <Image
              style={{ height: hp(40) }}
              resizeMode="contain"
              source={require("../assets/images/15-01.jpg")}
            />
          </View>
          <View className="gap-10">
            <Text
              style={{ fontSize: hp(4) }}
              className="font-bold tracking-wider text-center"
            >
              Sign In
            </Text>
            <View className="gap-3">
              <View
                style={{ height: hp(7) }}
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
              <Text className="text-right font-bold color-slate-500">
                Forgot password?
              </Text>

              {/*submit button*/}
              <View>
                {loading ? (
                  <View className="flex-row justify-center">
                    <Loading size={hp(10)} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleLogin}
                    style={{ height: hp(7.5) }}
                  >
                    <View className="bg-indigo-700 p-4 rounded-xl justify-center items-center">
                      <Text
                        style={{ fontSize: 25 }}
                        className="color-white font-bold"
                      >
                        Sign In
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
                  Dont have an account?{" "}
                </Text>
                <Pressable onPress={() => router.push("signup")}>
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="font-semibold text-indigo-500"
                  >
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
