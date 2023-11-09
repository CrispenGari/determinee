import { StatusBar, View } from "react-native";
import React, { Component } from "react";
import * as Animatable from "react-native-animatable";
import { COLORS, logo } from "../../constants";

export class Loading extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.tertiary,
        }}
      >
        <StatusBar hidden />
        <Animatable.Image
          animation={"zoomIn"}
          duration={1000}
          iterationCount={"infinite"}
          easing={"linear"}
          direction={"alternate-reverse"}
          useNativeDriver={false}
          source={logo}
          style={{
            width: 100,
            height: 100,
            marginVertical: 30,
            resizeMode: "contain",
          }}
        />
      </View>
    );
  }
}

export default Loading;
