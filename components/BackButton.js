import { Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "expo-router";

export default function BackButton() {
    const naviagtion = useNavigation();
  return (
    <TouchableOpacity   onPress={()=>naviagtion.goBack()} style={tw`bg-white rounded-full h-8 w-8`}>
      <Icon name="arrow-back" size={30} color="#000" />
    </TouchableOpacity>
  );
}
