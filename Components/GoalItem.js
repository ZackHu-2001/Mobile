import { View, Text, StyleSheet } from 'react-native';

const GoalItem = ({ goal }) => {
    return <View key={goal.id} style={styles.textContainer}>
        <Text >{goal.text}</Text>
    </View>
}

const styles = StyleSheet.create({
    textContainer: {
        borderRadius: 5,
        backgroundColor: '#cfcfcf',
        padding: 5,
        marginTop: 10,
    }
})

export default GoalItem;