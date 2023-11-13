import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { StatusBar, LogBox } from "react-native";
import React, { Component } from "react";
import { loadAsync } from "expo-font";
import { Fonts } from "./src/constants";
import Loading from "./src/components/Loading/Loading";
import Router from "./src/routes/Router";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();

export class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    loadAsync(Fonts)
      .then(() => {
        this.setState((state) => ({ ...state, loaded: true }));
      })
      .catch((error) => {
        console.log(error);
        this.setState((state) => ({ ...state, loaded: false }));
      });
  }

  render() {
    const { loaded } = this.state;
    if (!loaded) return <Loading />;
    return (
      <>
        <StatusBar barStyle={"default"} />
        <Router />
      </>
    );
  }
}

registerRootComponent(App);
