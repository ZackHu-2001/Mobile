import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
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
    <View style={styles.container}>
      <Header name={appName} theme='dark' />
      <Input handleInputData={handleInputData} modalVisibility={showModal} />

      <StatusBar style="auto" />
      <Button title="Confirm" onPress={handleConfirm} />
      <Text>{text}</Text>
      <Button title='Add a Goal' onPress={() => {
        setShowModal(true);
      }} />
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
