import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, SafeAreaView } from 'react-native';
import Input from './Components/Input';
import Header from './Components/Header';
import React, { useState } from 'react';

export default function App() {
  const appName = 'Summer 2024 class';
  // const [text, setText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [goals, setGoals] = useState([]);

  const handleInputData = (data) => {
    const newGola = {
      text: data,
      id: Math.random().toString()
    }
    setGoals([...goals, newGola]);
  }

  const handleConfirm = () => {
    // setText(text);
    setShowModal(false);
  }

  const handleCancel = () => {
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

      <Input handleInputData={handleInputData} handleConfirm={handleConfirm} handleCancel={handleCancel} modalVisibility={showModal} />

      <View style={styles.bottomContainer}>
        {goals.map(goal => {
          return <View style={styles.textContainer}>
            <Text key={goal.id}>{goal.text}</Text>
          </View>
        })}
        {/* <Text >{text}</Text> */}
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
  },
  textContainer: {
    borderRadius: 5,
    backgroundColor: '#cfcfcf',
    padding: 5,
    marginTop: 10,
    
  }
});
