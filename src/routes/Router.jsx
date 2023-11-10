import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import Settings from "../screens/Settings/Settings";
import Favorites from "../screens/Favorites/Favorites";
import { KEYS } from "../constants";
import { del, retrieve, store } from "../utils";

const Stack = createStackNavigator();
export class Router extends Component {
  componentDidMount() {
    retrieve(KEYS.APP_SETTINGS).then((res) => {
      if (!!!res) {
        store(
          KEYS.APP_SETTINGS,
          JSON.stringify({
            haptics: true,
            sound: true,
          })
        ).then(() => {});
      }
    });
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Favorites" component={Favorites} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Router;
