import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const Checkbox = (props) => {
  const {checked,
    onChange,
    buttonStyle = {},
    activeButtonStyle = {},
    inactiveButtonStyle = {},
    activeIconProps = {},
    inactiveIconProps = {},
  } = props
  
  function onCheckmarkPress() {
    onChange(!checked);
  }

  const iconProps = checked ? activeIconProps : inactiveIconProps;

  return (
    <Pressable
      style={[
        buttonStyle,
        checked
          ? activeButtonStyle
          : inactiveButtonStyle,
      ]}
      onPress={onCheckmarkPress}>
      {checked && (
        <Ionicons
          name="checkmark"
          size={8}
          color="white"
          {...iconProps}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  
})

export default Checkbox