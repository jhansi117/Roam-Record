import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { categoryBG } from "../theme";

export default function ExpenseCard({ item }) {
  return (
    <View style={[tw`flex-row justify-between items-center p-3 px-5 mb-3 rounded-xl`, { backgroundColor: categoryBG[item.category] }]}>
      <View>
        <Text style={tw`text-gray-600 font-bold`}>{item.title}</Text>
        <Text  style={tw`text-gray-600 text-xs`}>{item.category}</Text>
      </View>

      <View>
        <Text style={tw`text-gray-600 font-bold`}>{item.amount}</Text>
      </View>
    </View>
  );
}
