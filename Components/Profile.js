// Profile.js
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../Firebase/firebaseSetup';
import { signOut } from 'firebase/auth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Profile = ({ navigation }) => {
    const user = auth.currentUser;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Profile',
            headerRight: () => (
                <MaterialIcons name="logout" size={24} color="black" onPress={() => {
                    try {
                        signOut(auth)
                    } catch (error) {
                        console.log('Error signing out: ', error);
                    }
                }} />
            ),
        });
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
            <Text style={styles.text}>UID: {user.uid}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        color: '#6a0dad',
        textAlign: 'center',
        marginVertical: 20,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginVertical: 10,
    },
});

export default Profile;
