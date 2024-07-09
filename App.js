import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, SafeAreaView } from 'react-native';
import Input from './Components/Input';
import Header from './Components/Header';
import React, { useState } from 'react';

export default function App() {
  const appName = 'Summer 2024 class';
  const [text, setText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    console.log(text);
  }

  const handleInputData = (text) => {
    setText(text);
    setShowModal(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header name={appName} theme='dark' />
        <Button title='Add a Goal' onPress={() => {
          setShowModal(true);
        }} />
      </View>

      <Input handleInputData={handleInputData} modalVisibility={showModal} />

      <View style={styles.bottomContainer}>
        <Text>{text}</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: '#fdf',
    alignItems: 'center',
  }
});
