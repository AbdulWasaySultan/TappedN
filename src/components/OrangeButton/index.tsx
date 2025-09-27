import React from "react";  
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ViewStyle, TextStyle, StyleProp } from "react-native";
import { FontType } from "../Constants/FontType";

type OrangeButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const OrangeButton: React.FC<OrangeButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F27122",
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: FontType.medium,
    fontFamily: "Montserrat-Regular",
    fontWeight: "600",
  },
});

export default OrangeButton;
