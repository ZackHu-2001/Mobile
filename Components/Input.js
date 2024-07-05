import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const Input = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  return (
    <View >
      <TextInput
        placeholder="Type here to translate!"
        onChangeText={(text) => {
          setText(text);
          setShowThankYou(false);
        }}
        value={text}
        autoFocus={true}
        onBlur={() => setShowThankYou(true)}
        onFocus={() => setShowThankYou(false)}
      />
      {showThankYou && <Text>Thank you</Text>}
    </View>
  );
};


export default Input;
