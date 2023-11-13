import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";
import * as Haptics from "expo-haptics";
import * as Updates from "expo-updates";
import { Alert } from "react-native";
import { APP_NAME, COLORS } from "../constants";
import * as Notifications from "expo-notifications";
import { Audio } from "expo-av";

let sound;

export const playSound = async () => {
  const { sound: s, status } = await Audio.Sound.createAsync(
    require("../../assets/sounds/sound.mp3"),
    {
      shouldPlay: true,
      isLooping: false,
      isMuted: false,
    }
  );
  if (status.isLoaded) {
    sound = s;
  }
  if (!!sound) {
    await sound.playAsync().catch((err) => console.log(err));
  }
};

export const rateApp = async () => {
  const available = await StoreReview.isAvailableAsync();
  if (available) {
    const hasAction = await StoreReview.hasAction();
    if (hasAction) {
      await StoreReview.requestReview();
    }
  }
};

export const onImpact = () => Haptics.impactAsync();
export const onNotification = () => Haptics.notificationAsync();

export const onFetchUpdateAsync = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    Alert.alert(APP_NAME, error, [{ text: "OK", style: "destructive" }], {
      cancelable: false,
    });
  }
};

export const schedulePushNotification = async ({
  title,
  body,
  data,
  badge,
  subtitle,
}) => {
  const date = new Date();
  const day = date.getDay();
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      badge,
      color: COLORS.primary,
      sound: "default",
      subtitle,
    },
    trigger: {
      repeats: true,
      hour: 23,
      minute: 59,
      second: 60,
      day: day,
    },
  }).catch((error) => console.log({ error }));
};

export const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.log(error);
    return true;
  }
};

export const retrieve = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const del = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};
