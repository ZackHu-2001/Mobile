import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import { EvilIcons } from '@expo/vector-icons';

const GoalItem = ({ goal, removeItem }) => {
    const navigation = useNavigation();

    return <Pressable android_ripple={{ foreground: true }} onPress={() => navigation.navigate('GoalDetails', { goalObj: goal })} >
        <View key={goal.id} style={styles.textContainer}>
            <Text style={{ marginRight: 10 }}>{goal.text}</Text>
            <PressableButton pressedFunction={() => removeItem(goal.id)} componentStyle={styles.Button}>
                <EvilIcons name="trash" size={35} color="black" />
            </PressableButton>
        </View>
    </Pressable>
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
        // backgroundColor: 'black',
        color: 'white',
        borderRadius: 5,
        margin: 5,
    }
})

export default GoalItem;