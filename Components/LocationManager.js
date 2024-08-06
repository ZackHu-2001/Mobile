import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, Button, Text, Alert, Image } from 'react-native';
import { Dimensions } from 'react-native';

const LocationManager = () => {
    const [location, setLocation] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null);
    const mapsApiKey = "AIzaSyDylz4EXfCqB4riHXFWHsA2oiOnabLRx4M";
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);    

    const verifyPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status);
        if (status !== 'granted') {
            Alert.alert('You need to give permission to use location services');
            return false;
        }
        return true;
    };

    const locateUserHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }
        try {
            const location = await Location.getCurrentPositionAsync();
            console.log(location);
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View>
            <Button onPress={locateUserHandler} title='Find my location' />
            {
                location && (
                    <View>
                        <Text>Latitude: {location.latitude}</Text>
                        <Text>Longitude: {location.longitude}</Text>
                    </View>
                )
            }
            {
                location && (
                    <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}` }} 
                    style={{
                        width: windowWidth,
                        height: windowWidth
                    }}/>
                )
            }


        </View>
    );
};

export default LocationManager;
