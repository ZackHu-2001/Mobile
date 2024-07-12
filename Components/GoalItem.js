import { View, Text, StyleSheet, Button } from 'react-native';

const GoalItem = ({ goal, removeItem }) => {
    return <View key={goal.id} style={styles.textContainer}>
        <Text style={{ marginRight: 10 }}>{goal.text}</Text>
        <Button title='X' onPress={() => removeItem(goal.id)} />
    </View>
}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#cfcfcf',
        padding: 5,
        marginTop: 10,
    },
    Button: {
        backgroundColor: 'red',
        color: 'white',
    }
})

export default GoalItem;