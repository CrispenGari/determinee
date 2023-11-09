import { Text, SafeAreaView, View } from "react-native";
import React, { Component } from "react";
import { APP_NAME } from "../../constants";
import { styles } from "../../screens/styles";

export class Footer extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingHorizontal: 20,
            justifyContent: "center",
            paddingVertical: 5,
          }}
        >
          <Text style={[styles.p, { color: "black", textAlign: "center" }]}>
            Copyright © {new Date().getFullYear()} {APP_NAME} Inc. All rights
            reserved.
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Footer;
