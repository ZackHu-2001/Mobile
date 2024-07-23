import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Input from './Input';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import GoalItem from './GoalItem';
import { onSnapshot, collection } from 'firebase/firestore';
import { writeToDB, deleteFromDB } from '../Firebase/firestoreHelper';
import { db } from '../Firebase/firebaseSetup';

export default function Home({ route, navigation }) {
    const appName = 'Summer 2024 class';
    const [showModal, setShowModal] = useState(false);

    const [goals, setGoals] = useState([]);

    const handleInputData = (data) => {
        writeToDB(data);
    }

    const handleConfirm = () => {
        setShowModal(false);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const removeItem = (id) => {
        deleteFromDB(id);
    }

    const handlePressGoal = (goal) => {
        navigation.navigate('GoalDetails', { goalObj: goal });
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "goals"), (querySnapshot) => {
            const goals = [];
            querySnapshot.forEach((doc) => {
                goals.push({
                    id: doc.id,
                    text: doc.data().goal
                })
            });
            setGoals(goals);
        })

        return () => unsubscribe();
    }, [])

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
                    return <GoalItem goal={item} removeItem={() => {
                        removeItem(item.id)
                    }} pressHandler={handlePressGoal}/>
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
