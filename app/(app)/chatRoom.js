import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import Feather from "@expo/vector-icons/Feather";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../../context/authContext";
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getRoomId } from "../../utils/common";
import { onValue } from "firebase/database";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const item = useLocalSearchParams();
  const { user } = useAuth();
  console.log("got item data", item);
  const textRef = useRef();
  const inputRef=useRef(null);


  useEffect(() => {
    createRoomIfNotExists();
    let roomId=getRoomId(user?.userId , item?.userId);
    const docRef=doc(db,"rooms",roomId);
    const messagesRef=collection(docRef,"messages");
    const q=query(messagesRef,orderBy('createdAt','asc'));

    let unsub=onSnapshot(q,(snapshot)=>{
let allMessages=snapshot.docs.map(doc=>{return doc.data();
    });
    setMessages([...allMessages]);
  });
    return ()=> unsub();
  }, []);

  const createRoomIfNotExists = async () => {
    //room id
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };
  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;

    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current="";
      if(inputRef.current) inputRef?.current?.clear();

      const newDoc = await addDoc(messagesRef, {
        user: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log("new message id:", newDoc.id);
    } catch (err) {
      Alert.alert("message", err.message);
    }
  }

// console.log('Message',messages);
    return (
      <View className="flex-1 bg-white">
        <ChatRoomHeader user={item} router={router} />
        <View className="border-b h-0.8 border-neutral-400" />
        <View className="justify-between flex-1 bg-neutral-200 overflow-visible">
          <View className="flex-1">
            <MessageList messages={messages} currentUser={user}/>
          </View>
          <View style={{ marginBottom: hp(1.7) }} className="pt-2">
            <View className="flex-row justify-between mx-1 items-center">
              <View className="bg-white flex-row justify-between border p-1.5 border-neutral-300 rounded-3xl">
                <TextInput
                ref={inputRef}
                  onChangeText={(value) => (textRef.current = value)}
                  placeholder=" type message..."
                  style={{ fontSize: hp(2) }}
                  className="flex-1 mr-2 mx-1 "
                />
                <TouchableOpacity
                  
                  onPress={handleSendMessage}
                  className="p-2 bg-neutral-300 rounded-full mx-1 mr-[1px]"
                >
                  <Feather name="send" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  
}
