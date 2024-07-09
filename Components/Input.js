import React, { useState } from 'react';
import { TextInput, Text, View, Modal, Button } from 'react-native';

const Input = ({ handleInputData, modalVisibility }) => {
  const [text, setText] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  return (
    <Modal animationType="slide" visible={modalVisibility}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: '1' }}>

        <TextInput
          placeholder="Type here to translate!"
          onChangeText={(text) => {
            setText(text);
            // handleInputData(text);
            // setShowThankYou(false);
          }}
          value={text}
          autoFocus={true}
          onBlur={() => setShowThankYou(true)}
          onFocus={() => setShowThankYou(false)}
        />
        <Button title='Confirm' style={{ width: '33%' }}
          onPress={() => {
            handleInputData(text);
          }} />
        {/* {showThankYou && <Text>Thank you</Text>} */}
      </View>
    </Modal>
  );
};

// fkexL 1;


export default Input;
