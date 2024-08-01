import React, { useState } from 'react';
import { TextInput, Image, View, Modal, Button, StyleSheet } from 'react-native';
import ImageManager from './ImageManager';

const Input = ({ handleInputData, handleConfirm, handleCancel, modalVisibility }) => {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleImageTaken = (uri) => {
    setImageUri(uri);
  };

  return (
    <Modal animationType="slide" visible={modalVisibility} transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>

          <Image style={styles.image} source={{ url: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }} alt="image one for toaday's goal"></Image>
          <Image style={styles.image} source={require('../assets/image.png')} alt="image two for toaday's goal"></Image>
          <TextInput
            placeholder="Type something!"
            onChangeText={(text) => {
              setText(text);
            }}
            value={text}
            autoFocus={true}
            style={styles.input}
          />
          <ImageManager onImageTaken={handleImageTaken} />
          <View style={styles.buttonContainer}>
            <Button
              title='Cancel'
              onPress={() => {
                handleCancel();
                setText('');
              }}
            />
            <Button
              title="Confirm"
              disabled={!text}
              onPress={() => {
                handleConfirm();
                handleInputData({
                  goal: text,
                  imageUri: imageUri,
                });
                setText('');
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 200,
    backgroundColor: '#efefef',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,

  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Input;
