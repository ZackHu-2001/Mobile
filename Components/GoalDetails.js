import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

const GoalDetails = ({ route, navigation }) => {
    const { goalObj } = route.params;
    console.log(route.params);
    return (
        <>
            {route.params ? (< View style={styles.container} >
                <Text style={styles.title}>{goalObj.id}</Text>
                <Text style={styles.description}>{goalObj.text}</Text>
            </View>
            ) : <Text>More Detail</Text>
            }
            <Button title='More Details' onPress={() => navigation.push('GoalDetails')} />
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