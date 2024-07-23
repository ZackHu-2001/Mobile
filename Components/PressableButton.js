import { View, Text } from 'react-native'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

export default function PressableButton({children, pressedFunction, componentStyle}) {
  return (
    <Pressable onPress={pressedFunction} style={({pressed}) => [componentStyle, pressed && styles.pressedStyle]}>
      <View>
        {children}
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    pressedStyle: {
        opacity: 0.5,
        backgroundColor: "pink",
      }
})