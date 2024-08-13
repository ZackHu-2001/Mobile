import { Button, View, StyleSheet } from 'react-native';
import * as Notifications from "expo-notifications";

export const verifyPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        return status === 'granted';
    }
    return true;
}

const NotificationManager = () => {

    const scheduleNotificationHandler = async () => {
        if (!verifyPermission()) return;
        try {
            const data = await Notifications.scheduleNotificationAsync(
                {
                    content: {
                        title: "Add a goal",
                        body: "Don't forget to add a goal today!",
                        data: { uri: 'https://www.google.com' }
                    },
                    trigger: {
                        seconds: 5,
                    },
                }
            );
            console.log(data)
            return data;
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <View>
            <Button title='Remind me to add a goal' onPress={scheduleNotificationHandler}></Button>
        </View>
    )
}

export default NotificationManager;

