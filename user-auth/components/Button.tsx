// Button.tsx
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false, style, textStyle }) => {
  //Button Component
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.buttonDisabled : styles.buttonEnabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          disabled ? styles.textDisabled : styles.textEnabled,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonEnabled: {
    backgroundColor: "#2563EB",
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  textEnabled: {
    color: "#FFFFFF",
  },
  textDisabled: {
    color: "#F3F4F6",
  },
});

export default Button;
