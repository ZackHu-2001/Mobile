import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import { NavigationContainer, Button } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: 'purple',
  headerTintColor: 'white'
}

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{
        title: 'All My Goals',
        headerStyle: headerStyle
      }} />
      <Stack.Screen name='GoalDetails' component={GoalDetails} options={({ route, navigation }) => {
        return {
          title: route.params.goalObj.text ? route.params.goalObj.text : 'Goal Details',
          headerStyle:  headerStyle,
          
        }
      }} />
    </Stack.Navigator>
  </NavigationContainer >
}
