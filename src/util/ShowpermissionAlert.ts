import { Alert, Linking } from "react-native"

export const PermisionAlert = () => {
    Alert.alert(
        "Notification Permission is required",
        "We are going to send the Otp On the Message",
        [
            { text: "Cansel", style: "cancel" },
            { text: "Enable", onPress: () => Linking.openSettings() }
        ]
    )
}