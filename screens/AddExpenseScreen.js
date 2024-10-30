import { Text, View, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import ScreenWrapper from "../components/ScreenWrapper";
import BackButton from "../components/BackButton";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { categories } from "../constants";
import { addDoc } from "firebase/firestore";
import { expensesRef } from "../config/firebase";

export default function AddExpenseScreen(props) {
  let {id} = props.route.params;
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  async function handleAddExpense() {

    if (title && amount && category) {
      // navigation.goBack();
      let doc = await addDoc(expensesRef,{
        title,
        amount,
        category,
        tripId:id
      })

      if(doc && doc.id){
        navigation.goBack();
      }
    } else {
      Alert.alert("Nope!", "Please fill all the fields");
    }
  }

  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={tw`flex-grow`} keyboardShouldPersistTaps="handled">
          <View style={tw`flex justify-between h-full mx-4`}>
            <View>
              <View style={tw`relative mt-2`}>
                <View>
                  <BackButton style={tw`absolute top-0 left-0`} />
                </View>
                <Text style={tw`font-bold text-gray-600 text-xl shadow-sm text-center`}>
                  Add Expense
                </Text>
                <View style={tw`flex-row justify-center mb-3`}>
                  <Image
                    source={require("../assets/images/expenseBanner.png")}
                    style={tw`h-72 w-72`}
                  />
                </View>
                <View style={tw`my-2 mx-2`}>
                  <Text style={tw`font-bold text-gray-600 text-lg shadow-sm`}>
                    For What?
                  </Text>
                  <TextInput
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                    style={tw`p-3 bg-white rounded-full mb-3`}
                  />
                  <Text style={tw`font-bold text-gray-600 text-lg shadow-sm`}>
                    How much?
                  </Text>
                  <TextInput
                    value={amount}
                    onChangeText={(value) => setAmount(value)}
                    style={tw`p-3 bg-white rounded-full mb-3`}
                  />
                </View>
                <View style={tw`mx-2`}>
                  <Text style={tw`font-bold text-gray-600 text-lg shadow-sm`}>Category</Text>
                  <View style={tw`flex-row flex-wrap items-center`}>
                    {
                      categories.map(cat=>{
                        let bgColor = 'bg-white';
                        if(cat.value==category){
                          bgColor = 'bg-yellow-200'
                        }
                        return(
                          <TouchableOpacity key={cat.value}  onPress={()=>setCategory(cat.value)}   style={tw`${bgColor} rounded-full px-4 p-2 mr-2 mb-2`}>
                            <Text>{cat.title}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={tw`my-6 rounded-full p-3 shadow-sm bg-yellow-500`}
                onPress={handleAddExpense}
              >
                <Text style={tw`text-center text-white text-lg font-bold`}>
                  Add Expense
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}
