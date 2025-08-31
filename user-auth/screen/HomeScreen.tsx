import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../App";
import Button from "../components/Button";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/AuthSlice";

type NavProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavProp>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logout());
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Welcome {user?.username}!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20, textAlign: "center" },
});
