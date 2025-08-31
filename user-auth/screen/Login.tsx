import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../App";
import Button from "../components/Button";
import TextBox from "../components/TextBox";
import { AppDispatch } from "../store";
import { login } from "../store/AuthSlice";

type NavProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavProp>();

  //Login Handler
  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
      navigation.replace("Home");
    } catch (err: any) {
      Alert.alert("Login Failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextBox placeholder="Email" value={email} onChangeText={setEmail} />
      <TextBox placeholder="Password" value={password} onChangeText={setPassword} passwordField={true}/>
      <Button title="Login" onPress={handleLogin} style={{marginTop : 10}}/>
      <Button title="Go to Sign Up" onPress={() => navigation.navigate("SignUp")} style={{marginTop : 10}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20, textAlign: "center" },
});
