import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { Component } from "react";
import { COLORS } from "../../constants";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles";
import Quote from "../../components/Quote/Quote";
import { motivations } from "../../constants/motivations";
import Footer from "../../components/Footer/Footer";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: motivations[0],
    };
  }
  render() {
    const {
      props: { navigation },
      state: { quote },
    } = this;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.tertiary,
        }}
      >
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
            onPress={() => navigation.navigate("Favorites")}
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
            onPress={() => navigation.navigate("Settings")}
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",

            padding: 10,
          }}
        >
          <Quote quote={quote} />
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
