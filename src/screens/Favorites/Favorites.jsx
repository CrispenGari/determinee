import { Text, View, FlatList, Platform } from "react-native";
import React, { Component } from "react";
import { onImpact, retrieve } from "../../utils";
import AppStackBackButton from "../../components/AppStackBackButton/AppStackBackButton";
import { COLORS, FONTS, KEYS } from "../../constants";
import { motivations } from "../../constants/motivations";
import FavoriteQuote from "../../components/FavoriteQuote/FavoriteQuote";
export class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: { haptics: true, sound: true },
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: "Favorites",
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
  render() {
    return (
      <FlatList
        data={motivations}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          backgroundColor: COLORS.tertiary,
          padding: 10,
          paddingBottom: 100,
        }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <FavoriteQuote quote={item} />}
      />
    );
  }
}

export default Favorites;
