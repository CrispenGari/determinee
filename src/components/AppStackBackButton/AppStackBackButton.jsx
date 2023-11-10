import { Text, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { COLORS, FONTS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

export class AppStackBackButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onPress, label } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <Ionicons name="arrow-back-outline" size={24} color={COLORS.white} />
        <Text
          style={{
            marginLeft: 2,
            color: COLORS.white,
            fontFamily: FONTS.regularBold,
            fontSize: 18,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default AppStackBackButton;
