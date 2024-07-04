import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Input from './Components/Input';
import Header from './Components/Header';

export default function App() {
  const appName = 'Summer 2024 class';
  return (
    <View style={styles.container}>
      <Header name={appName} theme='dark' />
      <Input />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
