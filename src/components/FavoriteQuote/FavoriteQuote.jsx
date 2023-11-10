import { Text, View, Image, StyleSheet } from "react-native";
import React, { Component } from "react";
import { styles } from "../../styles";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, logo } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export class FavoriteQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: true,
    };
  }

  copy() {}
  unlike() {}
  render() {
    const {
      props: { quote },
      state: { liked },
      copy,

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
          marginVertical: 50,
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
        <Text style={[styles.h1, { color: COLORS.white, minHeight: 50 }]}>
          {quote.quote}
        </Text>
        <Text
          style={[styles.h1, { alignSelf: "flex-end", color: COLORS.white }]}
        >
          ~{quote.author}
        </Text>

        <View style={{ paddingVertical: 10, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={unlike}
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

export default FavoriteQuote;

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