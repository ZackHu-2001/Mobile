import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Input from './Input';
import Header from './Header';
import React, { useState } from 'react';
import GoalItem from './GoalItem';

export default function Home({ route, navigation }) {
    const appName = 'Summer 2024 class';
    const [showModal, setShowModal] = useState(false);

    const [goals, setGoals] = useState([]);

    const handleInputData = (data) => {
        const newGola = {
            text: data,
            id: Math.random().toString()
        }
        setGoals([...goals, newGola]);
    }

    const handleConfirm = () => {
        setShowModal(false);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const removeItem = (id) => {
        setGoals(goals.filter((goal) => goal.id !== id));
    }

    const handlePressGoal = () => {
        console.log('pressed');
        navigation.navigate('GoalDetails');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Header name={appName} theme='dark' />
                <Button title='Add a Goal' onPress={() => {
                    setShowModal(true);
                }} />
            </View>

            <Input handleInputData={handleInputData} handleConfirm={handleConfirm} handleCancel={handleCancel} modalVisibility={showModal} />

            <View style={styles.bottomContainer}>

                <FlatList data={goals} renderItem={({ item }) => {
                    return <GoalItem goal={item} removeItem={removeItem} pressHandler={handlePressGoal}/>
                }}>
                </FlatList>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    topContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 4,
        backgroundColor: '#fdf',
        alignItems: 'center',
    }
});
