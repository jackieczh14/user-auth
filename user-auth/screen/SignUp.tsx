import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../App";
import Button from "../components/Button";
import TextBox from "../components/TextBox";
import { AppDispatch } from "../store";
import { register } from "../store/AuthSlice";

type NavProp = NativeStackNavigationProp<RootStackParamList, "SignUp">;

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavProp>();

  // Register Handler
  const handleRegister = async () => {
    try {
      await dispatch(register({ username, email, password })).unwrap();
      Alert.alert("Success", "User registered! Please log in.");
      navigation.navigate("Login");
    } catch (err: any) {
      Alert.alert("Registration Failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextBox placeholder="Username" value={username} onChangeText={setUsername} />
      <TextBox placeholder="Email" value={email} onChangeText={setEmail} />
      <TextBox placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} passwordField={true}/>
      <Button title="Register" onPress={handleRegister} style={{marginTop : 10}}/>
      <Button title="Go to Login" onPress={() => navigation.navigate("Login")} style={{marginTop : 10}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20, textAlign: "center" },
});
