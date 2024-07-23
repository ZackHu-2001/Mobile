import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { updateIswarning } from '../Firebase/firestoreHelper';

const GoalDetails = ({ route, navigation }) => {
    const goalObj = route.params?.goalObj;
    const [isWarning, setIsWarning] = useState(false);

    useEffect(() => {
        setIsWarning(route.params?.goalObj.isWarning);
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
        // updateDB(goalObj.id, goalObj);
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
