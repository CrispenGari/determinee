import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { Component } from "react";
import { COLORS, KEYS } from "../../constants";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles";
import Quote from "../../components/Quote/Quote";
import { motivations } from "../../constants/motivations";
import Footer from "../../components/Footer/Footer";
import { onImpact, playSound, retrieve, store } from "../../utils";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: motivations[0],
      settings: { haptics: true, sound: true },
    };
    this.shuffle = this.shuffle.bind(this);
  }
  async componentDidMount() {
    const [appSettings, index] = await Promise.allSettled([
      retrieve(KEYS.APP_SETTINGS),
      KEYS.DAY_QUOTE_INDEX,
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
    if (index.status === "fulfilled") {
      if (!!!index.value) {
        const index = Math.round(Math.random() * 100000) % motivations.length;
        store(
          KEYS.DAY_QUOTE_INDEX,
          JSON.stringify({
            date: new Date().toLocaleDateString(),
            index,
          })
        ).then(() => {
          this.setState((state) => ({ ...state, quote: motivations[index] }));
        });
      } else {
        const i = JSON.parse(index.value);
        this.setState((state) => ({ ...state, quote: motivations[i] }));
      }
    }
  }

  shuffle() {
    if (this.state.settings.haptics) {
      onImpact();
    }
    const index = Math.round(Math.random() * 100000) % motivations.length;
    this.setState((state) => ({ ...state, quote: motivations[index] }));
    if (this.state.settings.sound) {
      playSound();
    }
  }

  render() {
    const {
      props: { navigation },
      state: { quote, settings },
      shuffle,
    } = this;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.tertiary,
        }}
      >
        <SafeAreaView>
          <View
            style={{
              padding: 10,
              backgroundColor: COLORS.secondary,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              borderBottomLeftRadius: 50,
              borderTopRightRadius: 50,
              margin: 10,
              maxWidth: 600,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (settings.haptics) {
                  onImpact();
                }
                navigation.navigate("Favorites");
              }}
              activeOpacity={0.7}
              style={s.btn}
            >
              <MaterialIcons name="favorite" size={24} color={COLORS.main} />
              <Text
                style={[
                  styles.p,
                  {
                    fontSize: 16,
                    color: COLORS.main,
                  },
                ]}
              >
                favorites
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (settings.haptics) {
                  onImpact();
                }
                navigation.navigate("Settings");
              }}
              activeOpacity={0.7}
              style={s.btn}
            >
              <Ionicons name="settings" size={24} color={COLORS.main} />
              <Text
                style={[
                  styles.p,
                  {
                    fontSize: 16,
                    color: COLORS.main,
                  },
                ]}
              >
                settings
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",

            padding: 10,
          }}
        >
          <Quote quote={quote} shuffle={shuffle} />
        </View>
        <Footer />
      </View>
    );
  }
}

export default Home;

const s = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
  },
});
