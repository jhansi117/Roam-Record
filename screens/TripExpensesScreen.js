import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import tw from "twrnc";
import ScreenWrapper from "../components/ScreenWrapper";
import { TouchableOpacity } from "react-native";
import randomImages from "../assets/images/randomImage";
import EmptyList from "../components/EmptyList";
import { useNavigation } from "expo-router";
import BackButton from "../components/BackButton";
import ExpenseCard from "../components/ExpenseCard";
import { useIsFocused } from "@react-navigation/native";
import { getDocs, query, where } from "firebase/firestore";
import { expensesRef } from "../config/firebase";

let items = [
  {
    id: 1,
    title: "Ate sandwich",
    amount: "₹4",
    category: "food",
  },
  {
    id: 2,
    title: "bought a jacket",
    amount: "₹50",
    category: "shopping",
  },
  {
    id: 3,
    title: "watched a movie",
    amount: "₹100",
    category: "entertainment",
  },
];

function TripExpensesScreen(props) {
  // console.log(props)
  const { id, place, country } = props.route.params;
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState();
  const isFocused = useIsFocused();

  async function fetchExpenses() {
    const q = query(expensesRef, where("tripId", "==", id));
    const querySnapShort = await getDocs(q);
    let data = [];
    querySnapShort.forEach((doc) => {
      console.log("document: ", doc.data());
      data.push({ ...doc.data(), id: doc.id });
    });
    setExpenses(data);
  }

  useEffect(()=>{
    if(isFocused){
      fetchExpenses()
    }
  },[isFocused])

  return (
    <ScreenWrapper style={tw`flex-1`}>
      <View>
        <View style={tw`relative mt-2`}>
          <View style={tw`absolute top-2 left-4`}>
            <BackButton />
          </View>
          <View>
            <Text
              style={tw`font-bold text-gray-600 text-2xl shadow-sm text-center`}
            >
              {place}
            </Text>
            <Text
              style={tw`font-bold text-gray-600 text-xs shadow-sm text-center`}
            >
              {country}
            </Text>
          </View>
        </View>

        <View style={tw`flex-row justify-center items-center rounded-xl mb-4`}>
          <Image
            source={require("../assets/images/10.png")}
            style={tw`w-60 h-50`}
          />
        </View>

        <View>
          <View style={tw`flex-row justify-between items-center p-4`}>
            <Text style={tw`font-bold text-gray-600 text-xl shadow-sm`}>
              Expenses
            </Text>
            <TouchableOpacity
              style={tw`p-2 px-3 bg-white border border-gray-200 rounded-full`}
              onPress={() =>
                navigation.navigate("AddExpense", { id, place, country })
              }
            >
              <Text style={tw`text-gray-600`}>Add Expense</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 370 }}>
            <FlatList
              style={tw`mx-2`}
              data={expenses}
              ListEmptyComponent={
                <EmptyList message="You have not recorded any expenses.." />
              }
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return <ExpenseCard item={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default TripExpensesScreen;
