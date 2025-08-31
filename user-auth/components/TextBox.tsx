// TextBox.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  label?: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  passwordField?: boolean;
};

const TextBox: React.FC<Props> = ({ label, error, value, onChangeText, placeholder, secureTextEntry, passwordField = false }) => {
  //TextBox Component

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.error]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={showPassword}
        />
        {passwordField && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  error: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
});

export default TextBox;
