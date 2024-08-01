import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import { NavigationContainer, TouchableOpacity, Text } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from "./Components/SignUp";
import Login from "./Components/LogIn";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import { Ionicons } from '@expo/vector-icons';
import Profile from "./Components/Profile";

const Stack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: 'purple',
  headerTintColor: 'white'
};

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: headerStyle.backgroundColor }, headerTintColor: headerStyle.headerTintColor }}>
        {isUserAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={Home} options={({ navigation }) => ({
              title: 'All My Goals',
              headerStyle: headerStyle,
              headerRight: () => (
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color="white"
                  style={{ marginRight: 15 }}
                  onPress={() => navigation.navigate('Profile')}
                />
              )

            })} />
            <Stack.Screen name="GoalDetails" component={GoalDetails} options={({ route, navigation }) => {
              return {
                title: route.params.goalObj.text ? route.params.goalObj.text : 'Goal Details',
                headerStyle: headerStyle,
              }
            }} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}