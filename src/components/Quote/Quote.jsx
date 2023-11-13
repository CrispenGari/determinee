import { Text, View, Image, StyleSheet } from "react-native";
import React, { Component } from "react";
import { styles } from "../../styles";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, KEYS, logo } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TypeWriter from "react-native-typewriter";
import { onImpact, playSound, retrieve, store } from "../../utils";
import * as Clipboard from "expo-clipboard";
export class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      settings: { haptics: true, sound: true },
    };
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.copy = this.copy.bind(this);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.quote.quote !== this.props.quote.quote) {
      const favs = await retrieve(KEYS.FAVORITES);
      if (!!!favs) {
        this.setState((state) => ({ ...state, liked: false }));
      } else {
        const f = JSON.parse(favs);
        const liked = f.find((q) => q.quote === this.props.quote.quote);
        this.setState((state) => ({ ...state, liked: !!liked }));
      }
    }
  }

  async componentDidMount() {
    const [appSettings] = await Promise.allSettled([
      retrieve(KEYS.APP_SETTINGS),
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
    const favs = await retrieve(KEYS.FAVORITES);
    if (!!!favs) {
      this.setState((state) => ({ ...state, liked: false }));
    } else {
      const f = JSON.parse(favs);
      const liked = f.find((q) => q.quote === this.props.quote.quote);
      this.setState((state) => ({ ...state, liked: !!liked }));
    }
  }
  async copy() {
    if (this.state.settings.haptics) {
      onImpact();
    }
    await Clipboard.setStringAsync(
      `${this.props.quote.quote} ~ ${this.props.quote.author}`
    ).then(() => {
      if (this.state.settings.sound) {
        playSound();
      }
    });
  }
  async like() {
    if (this.state.settings.haptics) {
      onImpact();
    }
    const favs = await retrieve(KEYS.FAVORITES);
    if (!!!favs) {
      await store(KEYS.FAVORITES, JSON.stringify([]));
    } else {
      const f = JSON.parse(favs);
      this.setState((state) => ({ ...state, liked: true }));
      await store(KEYS.FAVORITES, JSON.stringify([this.props.quote, ...f]));
    }
    if (this.state.settings.sound) {
      playSound();
    }
  }

  async unlike() {
    if (this.state.settings.haptics) {
      onImpact();
    }
    const favs = await retrieve(KEYS.FAVORITES);

    if (!!!favs) {
      await store(KEYS.FAVORITES, JSON.stringify([]));
    } else {
      const f = JSON.parse(favs).filter(
        (q) => q.quote !== this.props.quote.quote
      );
      this.setState((state) => ({ ...state, liked: false }));
      await store(KEYS.FAVORITES, JSON.stringify(f));
    }
    if (this.state.settings.sound) {
      playSound();
    }
  }

  render() {
    const {
      props: { shuffle, quote },
      state: { liked },
      copy,
      like,
      unlike,
    } = this;
    return (
      <LinearGradient
        colors={[COLORS.main, COLORS.primary, COLORS.secondary]}
        style={{
          padding: 10,
          maxWidth: 500,
          width: "100%",
          borderRadius: 10,
          position: "relative",
          zIndex: 0,
        }}
      >
        <Text
          style={[
            styles.p,
            {
              color: COLORS.white,
              alignSelf: "flex-end",
              marginBottom: 10,
            },
          ]}
        >
          {new Date().toDateString()}
        </Text>
        <Image
          source={{ uri: Image.resolveAssetSource(logo).uri }}
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            top: -50,
            zIndex: 3,
            left: 10,
          }}
        />
        <Image
          source={{ uri: Image.resolveAssetSource(logo).uri }}
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            bottom: -50,
            zIndex: 3,
            right: 10,
          }}
        />
        <TypeWriter
          typing={1}
          maxDelay={0}
          style={[styles.h1, { color: COLORS.white, minHeight: 50 }]}
        >
          {quote.quote}
        </TypeWriter>
        <Text
          style={[styles.h1, { alignSelf: "flex-end", color: COLORS.white }]}
        >
          ~{quote.author}
        </Text>

        <View style={{ paddingVertical: 10, flexDirection: "row" }}>
          <TouchableOpacity onPress={shuffle} style={s.btn} activeOpacity={0.7}>
            <Ionicons name="shuffle-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={liked ? unlike : like}
            style={[
              s.btn,
              {
                marginLeft: 10,
              },
            ]}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={liked ? "favorite" : "favorite-border"}
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={copy}
            style={[s.btn, { marginLeft: 10 }]}
            activeOpacity={0.7}
          >
            <Ionicons name="copy-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

export default Quote;

const s = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.main,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
