import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../Firebase/firebaseSetup';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label} onPress={() => this.emailInput.focus()}>Email Address</Text>
                <TextInput
                    ref={(input) => { this.emailInput = input }}
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label} onPress={() => this.passwordInput.focus()}>Password</Text>
                <TextInput
                    ref={(input) => { this.passwordInput = input }}
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label} onPress={() => this.confirmPasswordInput.focus()}>Confirm Password</Text>
                <TextInput
                    ref={(input) => { this.confirmPasswordInput = input }}
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => {
                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }
                if (!email || !password) {
                    alert('Please fill all fields');
                    return;
                }
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log('User created:', user);
                        // navigation.replace('Home');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log('Error:', errorCode, errorMessage);
                        alert(errorMessage);
                    });
            }}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={styles.link}>Already Registered? Login</Text>
            </TouchableOpacity>
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
    inputContainer: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    button: {
        backgroundColor: '#6a0dad',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    link: {
        color: '#6a0dad',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default SignupScreen;
