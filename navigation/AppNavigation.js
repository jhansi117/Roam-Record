// In App.js in a new project
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../redux/slices/user';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const {user} = useSelector(state=>state.user);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, u=>{
    console.log(u)
    dispatch(setUser(u));
  })

  if(user){
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen  options={{headerShown:false}} name="Home" component={HomeScreen} />
          <Stack.Screen  options={{headerShown:false}} name="AddTrip" component={AddTripScreen} />
          <Stack.Screen  options={{headerShown:false}} name="AddExpense" component={AddExpenseScreen} />
          <Stack.Screen  options={{headerShown:false}} name="TripExpenses" component={TripExpensesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  }else{
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen  options={{headerShown:false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen  options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
          <Stack.Screen  options={{headerShown:false}} name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
}

export default AppNavigation;