
const GoalDetails = ({ route, navigation }) => {
    const { goal } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{goal.title}</Text>
            <Text style={styles.description}>{goal.description}</Text>
            <Button title='Go back' onPress={() => navigation.goBack()} />
        </View>
    );
}

export default GoalDetails;