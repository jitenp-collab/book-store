import { PermissionsAndroid, Platform } from "react-native";

export const requestPermission = async () => {
  if (Platform.OS === "android" && Platform.Version >= 33) {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      return result;
    } catch (e) {
      return "error";
    }
  }
  return "granted";
};