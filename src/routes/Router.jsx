import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import Settings from "../screens/Settings/Settings";
import Favorites from "../screens/Favorites/Favorites";
import { APP_NAME, KEYS } from "../constants";
import { retrieve, schedulePushNotification, store } from "../utils";
import { motivations } from "../constants/motivations";

const Stack = createStackNavigator();
export class Router extends Component {
  async componentDidMount() {
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

    const res = await retrieve(KEYS.DAY_QUOTE_INDEX);
    if (!!res) {
      const data = JSON.parse(res);
      if (data.date === new Date().toLocaleDateString()) {
        const index = data.index;
        const motivation = motivations[index];
        await schedulePushNotification({
          badge: 1,
          body: `${motivation.quote} ~ ${motivation.author}`,
          title: `${APP_NAME} ~ ${motivation.author}`,
        });
      } else {
        const index = Math.round(Math.random() * 100000) % motivations.length;
        await store(
          KEYS.DAY_QUOTE_INDEX,
          JSON.stringify({
            date: new Date().toLocaleDateString(),
            index,
          })
        );
        const motivation = motivations[index];
        await schedulePushNotification({
          badge: 1,
          body: `${motivation.quote} ~ ${motivation.author}`,
          title: `${APP_NAME} ~ ${motivation.author}`,
        });
      }
    } else {
      const index = Math.round(Math.random() * 100000) % motivations.length;
      await store(
        KEYS.DAY_QUOTE_INDEX,
        JSON.stringify({
          date: new Date().toLocaleDateString(),
          index,
        })
      );
      const motivation = motivations[index];
      await schedulePushNotification({
        badge: 1,
        body: `${motivation.quote} ~ ${motivation.author}`,
        title: `${APP_NAME} ~ ${motivation.author}`,
      });
    }
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
