import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { updateIswarning } from '../Firebase/firestoreHelper';
import GoalUser from './GoalUser';
import { storage } from '../Firebase/firebaseSetup';
import { getDownloadURL, ref } from "firebase/storage";


const GoalDetails = ({ route, navigation }) => {
    const goalObj = route.params?.goalObj;
    const [isWarning, setIsWarning] = useState(false);
    const [imageUri, setImageUri] = useState('');

    useEffect(() => {
        const getImageUrl = async () => {
            const reference = ref(storage, goalObj.imageUri);
            const url = await getDownloadURL(reference);
            setImageUri(url);
        }
        setIsWarning(route.params?.goalObj.isWarning);
        getImageUrl();
    }, [route])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: isWarning ? 'Warning!' : (goalObj ? goalObj.text : 'Goal Details'),
            headerRight: () => (
                <Button
                    onPress={handlePress}
                    title="Warning"
                    color="#000"
                />
            ),
        });
    }, [navigation, isWarning]);

    const handlePress = () => {
        setIsWarning(!isWarning);
        goalObj.isWarning = !isWarning;
        updateIswarning(goalObj.isWarning);
    };

    return (
        <>
            {goalObj ? (
                <View style={styles.container}>
                    <Text style={[styles.title, { color: isWarning ? 'red' : 'black' }]}>{goalObj.id}</Text>
                    <Text style={[styles.description, { color: isWarning ? 'red' : 'black' }]}>{goalObj.text}</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <Text>More Detail</Text>
                </View>
            )}
            <GoalUser id={goalObj.id} />
            {
                imageUri && <Image style={{ width: 200, height: 200 }}
                    source={{
                        uri: imageUri
                    }} />
            }
            
            <Button title="More Details" onPress={() => navigation.push('GoalDetails', { goalObj })} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        marginBottom: 10,
    }
});

export default GoalDetails;
