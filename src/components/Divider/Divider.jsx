import { Text, View } from "react-native";
import React, { Component } from "react";
import { styles } from "../../styles";

export class Divider extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { color, title } = this.props;
    return (
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Text style={[styles.p, { color, fontSize: 18 }]}>{title}</Text>
        <View
          style={{
            borderBottomColor: color,
            flex: 1,
            borderBottomWidth: 0.5,
            marginLeft: 10,
          }}
        />
      </View>
    );
  }
}

export default Divider;
