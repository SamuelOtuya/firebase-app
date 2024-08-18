import { MenuOption } from "react-native-popup-menu";
import { Text, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import tw from "twrnc";

export const MenuItem = ({ text, icon, value, action }) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="px-4 py-1 flex-row justify-between items-center font-bold">
        <Text style={{fontSize: hp(1.7)}} className="font-bold text-neutral-600">
            {text}
        </Text>
        {icon}
      </View>
    </MenuOption>
  );
};
