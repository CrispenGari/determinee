import { Text, View, StatusBar } from "react-native";
import React, { Component } from "react";

export class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        <Text>App</Text>
      </View>
    );
  }
}

export default App;
