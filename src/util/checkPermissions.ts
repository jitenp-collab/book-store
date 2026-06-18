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

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    return granted;
  } catch (error) {
    console.log(error);
    return 'error';
  }
};