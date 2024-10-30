import { Text, View, Image } from "react-native";
import React from "react";
import tw from "twrnc";

export default function EmptyList({message}) {
  return (
    <View style={tw`flex justify-center items-center my-8`}>
      <Image
        style={tw`w-50 h-50 shadow`}
        source={require('../assets/images/empty.png')}
      />
      <Text style={tw`text-gray-600 font-bold`}>{message || 'data not found'}</Text>
    </View>
  );
}


