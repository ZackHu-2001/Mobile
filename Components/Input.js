import { TextInput, Text } from "react-native";
import { useState } from "react";

const Input = () => {
  const [text, setText] = useState('');

    return (
        <>
        <TextInput 
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Type here to translate!'
            onChangeText={text => {setText(text)}}
            value={text}
        ></TextInput>
        <Text>{text}</Text>
        </>
    )
}

export default Input;