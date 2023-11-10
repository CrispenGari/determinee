import { Text, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { styles } from "../../styles";
import { COLORS } from "../../constants";

export class SettingItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onPress, title, Icon, disabled, titleColor } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          padding: 10,
          marginBottom: 1,
          backgroundColor: COLORS.secondary,
          alignItems: "center",
        }}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {Icon}
        <Text
          style={[
            styles.p,
            {
              flex: 1,
              color: titleColor ? titleColor : "black",
              marginLeft: 10,
            },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default SettingItem;
