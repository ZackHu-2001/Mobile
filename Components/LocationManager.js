import * as Location from 'expo-location';
import { View, Button } from 'react-native';

LocationManager = () => {
    <View>
        <Button onPress={locateUserHandler}>click</Button>
    </View>
}

const locateUserHandler = async () => {
    try {
        const location = await Location.getCurrentPositionAsync();
    }
    catch (err) {
        console.log(err)
    }
};