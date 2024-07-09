import React, { useState } from 'react';
import { TextInput, Text, View, Modal } from 'react-native';

const Input = ({ handleInputData, modalVisibility }) => {
  const [text, setText] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  return (
    <Modal animationType="slide" visible={modalVisibility}>
      <View style={{ width: 'full', justifyContent: 'center', alignContent:'center' }}>

        <TextInput
          placeholder="Type here to translate!"
          onChangeText={(text) => {
            setText(text);
            handleInputData(text);
            setShowThankYou(false);
          }}
          value={text}
          autoFocus={true}
          onBlur={() => setShowThankYou(true)}
          onFocus={() => setShowThankYou(false)}
        />
        {showThankYou && <Text>Thank you</Text>}
      </View>
    </Modal>
  );
};


export default Input;
