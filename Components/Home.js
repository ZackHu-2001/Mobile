import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Input from './Input';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import GoalItem from './GoalItem';
import { writeToDB, deleteFromDB } from '../Firebase/firestoreHelper';
import { db, storage } from '../Firebase/firebaseSetup';
import { getAuth } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';

export default function Home({ route, navigation }) {
    const appName = 'Summer 2024 class';
    const [showModal, setShowModal] = useState(false);

    const [goals, setGoals] = useState([]);

    const handleInputData = async (data) => {

        const newData = {
            text: data.goal,
            isWarning: false,
            // imageUri: data.imageUri
        }

        let uri = data.imageUri;
        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            const imageName = uri.substring(uri.lastIndexOf('/') + 1);
            const imageRef = ref(storage, `images/${imageName}`);
            const uploadResult = await uploadBytesResumable(imageRef, blob);  // Corrected variable name from imageBlob to blob
            newData.imageUri = uploadResult.metadata.fullPath;
        } catch (e) {
            console.error('Error uploading image: ', e);
        }

        writeToDB(newData, 'goals');
    }

    const handleConfirm = () => {
        setShowModal(false);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const removeItem = (id) => {
        deleteFromDB(id, 'goals');
    }

    const handlePressGoal = (goal) => {
        navigation.navigate('GoalDetails', { goalObj: goal });
    }

    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
            // const goalsQuery = query(
            //     collection(database, "goals"),
            //     where("owner", "==", currentUser.uid)
            // );
            const q = query(
                collection(db, 'goals'),
                where('owner', '==', auth.currentUser.uid)
            );

            const unsubscribe = onSnapshot(q,
                (querySnapshot) => {
                    const newArray = [];
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            newArray.push({ id: doc.id, ...doc.data() });
                        });
                        setGoals(newArray);
                    } else {
                        setGoals([]); // Clear the goals if the snapshot is empty
                    }
                },
                (error) => {
                    console.error('Error reading goals: ', error);
                }
            );

            // Cleanup subscription on unmount
            return () => unsubscribe();
        }
    }, []);

    // useEffect(() => {
    //     const q = query(
    //         collection(db, 'goals'),
    //         where('owner', '==', auth.currentUser.uid)
    //     );
    //     // const q = query(collection(db, "goals"), where("owner", "==", auth.currentUser.uid));
    //     const unsubscribe = onSnapshot(
    //         q,
    //     (querySnapshot) => {
    //         let newArray = [];
    //         if (!querySnapshot.empty) {
    //             querySnapshot.forEach((doc) => {
    //                 newArray.push({ id: doc.id, ...doc.data() });
    //             });
    //             setGoals(newArray);
    //         }
    //     });
    //     // const unsubscribe = onSnapshot(collection(db, "goals"), (querySnapshot) => {
    //     //     const goals = [];
    //     //     querySnapshot.forEach((doc) => {
    //     //         goals.push({
    //     //             id: doc.id,
    //     //             text: doc.data().goal
    //     //         })
    //     //     });
    //     //     setGoals(goals);
    //     // })

    //     return () => unsubscribe();
    // }, [])

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
                    }} />
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
