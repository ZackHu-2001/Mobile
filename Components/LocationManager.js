import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, Button, Text, Alert, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { writeWithIdToDB, getADoc } from '../Firebase/firestoreHelper';
import { auth } from '../Firebase/firebaseSetup';

const LocationManager = () => {
    const [location, setLocation] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null);
    const mapsApiKey = "AIzaSyDylz4EXfCqB4riHXFWHsA2oiOnabLRx4M";
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        if (route.params?.location) {
            setLocation(route.params.location);
        }
    }, [route.params?.location]);

    useEffect(() => {
        async function fetchUserLocation() {
            const userDoc = await getADoc('users', auth.currentUser.uid);
            if (userDoc) {
                setLocation(userDoc.location);
            }
        }

        if (!route.params?.location) {
            fetchUserLocation();
        }
    }, []);


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

    const saveLocationHandler = async () => {
        if (location) {
            await writeWithIdToDB(auth.currentUser.uid, 'users', { location });
            navigation.navigate('Home');
        }
    };

    return (
        <View>
            <Button onPress={locateUserHandler} title='Find my location' />
            <Button title='Let me choose a location' onPress={() => navigation.navigate('Map', { location })} />
            <Button
                title="Save my location"
                onPress={saveLocationHandler}
                disabled={!location}
            />
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
                        }} />
                )
            }


        </View>
    );
};

export default LocationManager;
