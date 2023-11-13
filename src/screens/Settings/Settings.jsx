import { ScrollView, Platform, Linking, Alert } from "react-native";
import React, { Component } from "react";
import { APP_NAME, COLORS, FONTS, KEYS } from "../../constants";
import { onImpact, retrieve, store } from "../../utils";
import AppStackBackButton from "../../components/AppStackBackButton/AppStackBackButton";
import SettingItem from "../../components/SettingItem/SettingItem";
import Divider from "../../components/Divider/Divider";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: { haptics: true, sound: true },
    };
    this.updateSound = this.updateSound.bind(this);
    this.updateHaptics = this.updateHaptics.bind(this);
    this.clearFavorites = this.clearFavorites.bind(this);
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: "Settings",
      headerShown: true,
      headerStyle: {
        backgroundColor: COLORS.main,
        elevation: 0,
      },
      headerTitleStyle: {
        fontFamily: FONTS.regularBold,
        color: COLORS.white,
      },
      headerLeft: () => (
        <AppStackBackButton
          label={Platform.OS === "ios" ? "Home" : ""}
          onPress={() => {
            if (this.state.settings.haptics) {
              onImpact();
            }
            this.props.navigation.goBack();
          }}
        />
      ),
    });

    retrieve(KEYS.APP_SETTINGS).then((res) => {
      if (res) {
        const d = JSON.parse(res);
        this.setState((state) => ({
          ...state,
          settings: { ...state.settings, haptics: d.haptics, sound: d.sound },
        }));
      }
    });
  }

  updateHaptics() {
    const { settings } = this.state;
    if (settings.haptics) {
      onImpact();
    }
    store(
      KEYS.APP_SETTINGS,
      JSON.stringify({
        ...this.state.settings,
        haptics: !settings.haptics,
      })
    ).then(() => {
      this.setState((state) => ({
        ...state,
        settings: {
          ...state.settings,
          haptics: !state.settings.haptics,
        },
      }));
    });
  }

  updateSound() {
    const { settings } = this.state;
    if (settings) {
      onImpact();
    }
    store(
      KEYS.APP_SETTINGS,
      JSON.stringify({
        ...this.state.settings,
        sound: !settings.sound,
      })
    ).then(() => {
      this.setState((state) => ({
        ...state,
        settings: {
          ...state.settings,
          sound: !state.settings.sound,
        },
      }));
    });
  }
  clearFavorites() {
    if (this.state.settings.haptics) {
      onImpact();
    }
    Alert.alert(
      APP_NAME,
      `Are you sure you want to clear your favorite quotes?`,
      [
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            if (this.state.settings.haptics) {
              onImpact();
            }
            await store(KEYS.FAVORITES, JSON.stringify([]));
          },
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            if (this.state.settings.haptics) {
              onImpact();
            }
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }

  render() {
    const {
      state: { settings },
      updateHaptics,
      updateSound,
      clearFavorites,
    } = this;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        style={{ flex: 1, backgroundColor: COLORS.tertiary }}
      >
        <Divider color={COLORS.black} title="MISC" />
        <SettingItem
          title={settings.haptics ? "Disable Haptics" : "Enable Haptics"}
          Icon={
            settings.haptics ? (
              <MaterialCommunityIcons
                name="vibrate"
                size={24}
                color={COLORS.white}
              />
            ) : (
              <MaterialCommunityIcons
                name="vibrate-off"
                size={24}
                color={COLORS.white}
              />
            )
          }
          onPress={updateHaptics}
        />
        <SettingItem
          title={settings.sound ? "Disable Sound" : "Enable Sound"}
          Icon={
            settings.sound ? (
              <Ionicons
                name="ios-notifications-circle"
                size={24}
                color={COLORS.white}
              />
            ) : (
              <Ionicons
                name="ios-notifications-off-circle"
                size={24}
                color={COLORS.white}
              />
            )
          }
          onPress={updateSound}
        />
        <SettingItem
          title={"Rate App"}
          Icon={
            <MaterialIcons name="star-rate" size={24} color={COLORS.white} />
          }
          onPress={async () => {
            if (settings.haptics) {
              onImpact();
            }
            await rateApp();
          }}
        />
        <SettingItem
          title={"Check for Updates"}
          Icon={
            <MaterialIcons
              name="system-update"
              size={24}
              color={COLORS.white}
            />
          }
          onPress={async () => {
            if (settings.haptics) {
              onImpact();
            }
            await onFetchUpdateAsync();
          }}
        />
        <Divider color={COLORS.black} title="PERSONALIZATION & STORAGE" />
        <SettingItem
          title="Clear Favorite Quotes"
          Icon={<MaterialIcons name="clear-all" size={24} color={COLORS.red} />}
          onPress={clearFavorites}
        />
        <Divider color={COLORS.black} title="ISSUES & BUGS" />
        <SettingItem
          title="Report an Issue"
          Icon={<Ionicons name="bug" size={24} color={COLORS.red} />}
          onPress={async () => {
            if (settings.haptics) {
              onImpact();
            }
            await Linking.openURL(
              "https://github.com/CrispenGari/determinee/issues"
            );
          }}
        />
      </ScrollView>
    );
  }
}

export default Settings;
