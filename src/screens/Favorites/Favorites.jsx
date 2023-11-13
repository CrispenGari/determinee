import { Text, View, FlatList, Platform, Image } from "react-native";
import React, { Component } from "react";
import { onImpact, retrieve } from "../../utils";
import AppStackBackButton from "../../components/AppStackBackButton/AppStackBackButton";
import { COLORS, FONTS, KEYS, logo } from "../../constants";
import FavoriteQuote from "../../components/FavoriteQuote/FavoriteQuote";
import { styles } from "../../styles";
export class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: { haptics: true, sound: true },
      motivations: [],
      loading: false,
    };
    this.refetchQuotes = this.refetchQuotes.bind(this);
  }
  async componentDidMount() {
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

    this.setState((state) => ({ ...state, loading: true }));
    const [appSettings, favorites] = await Promise.allSettled([
      retrieve(KEYS.APP_SETTINGS),
      retrieve(KEYS.FAVORITES),
    ]);
    if (appSettings.status === "fulfilled") {
      if (appSettings.value) {
        const d = JSON.parse(appSettings.value);
        this.setState((state) => ({
          ...state,
          settings: { ...state.settings, haptics: d.haptics, sound: d.sound },
        }));
      }
    }
    if (favorites.status === "fulfilled") {
      if (!!!favorites.value) {
        this.setState((state) => ({ ...state, motivations: [] }));
      } else {
        const favs = JSON.parse(favorites.value);
        this.setState((state) => ({ ...state, motivations: favs }));
      }
      this.setState((state) => ({ ...state, loading: false }));
    }
  }
  refetchQuotes() {
    retrieve(KEYS.FAVORITES).then((res) => {
      if (!!!res) {
        this.setState((state) => ({ ...state, motivations: [] }));
      } else {
        const favs = JSON.parse(res);
        this.setState((state) => ({ ...state, motivations: favs }));
      }
    });
  }
  render() {
    const {
      refetchQuotes,
      state: { motivations, loading },
    } = this;

    if (loading)
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.tertiary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: Image.resolveAssetSource(logo).uri }}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text style={[styles.h1, { marginHorizontal: 5 }]}>Loading...</Text>
          </View>
        </View>
      );

    if (motivations.length === 0)
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.tertiary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: Image.resolveAssetSource(logo).uri }}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text style={[styles.h1, { marginHorizontal: 5 }]}>
              You don't have favorite quotes.
            </Text>
          </View>
        </View>
      );
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.tertiary }}>
        <FlatList
          data={motivations}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
          contentContainerStyle={{
            backgroundColor: COLORS.tertiary,
            padding: 10,
            paddingBottom: 100,
          }}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <FavoriteQuote refetchQuotes={refetchQuotes} quote={item} />
          )}
        />
      </View>
    );
  }
}

export default Favorites;
