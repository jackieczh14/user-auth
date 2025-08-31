import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState, store } from "./store";
import { loadAuth } from "./store/AuthSlice";

import HomeScreen from "./screen/HomeScreen";
import Login from "./screen/Login";
import SignUp from "./screen/SignUp";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

function MainNavigator() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    dispatch(loadAuth());
  }, [dispatch]);

  if (loading) return null; // Loading Spinner (inactive)

  return (
    //Creating NavigationStack Container
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Sign Up" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home", headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
