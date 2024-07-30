// Profile.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../Firebase/firebaseSetup';

const Profile = () => {
    const user = auth.currentUser;

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
