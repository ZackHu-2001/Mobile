import { View, Text, StyleSheet, Button } from 'react-native';

const GoalItem = ({ goal, removeItem, pressHandler }) => {
    function goalPressed(goal) {
        pressHandler(goal)
    }
    return <View key={goal.id} style={styles.textContainer}>
        <Text style={{ marginRight: 10 }}>{goal.text}</Text>
        <View style={styles.Button}>
            <Button title='X' onPress={() => removeItem(goal.id)} />
        </View>
        <View style={styles.Button}>
            <Button title='i' onPress={() => goalPressed(goal)} />
        </View>
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
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 5,
        margin: 5,
    }
})

export default GoalItem;