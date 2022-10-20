import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

const HeaderButtonSmall = (props) => {
  const { onPress, icon, buttonStyle = {} } = props

  return (
    <Pressable style={ buttonStyle } onPress={ onPress }>
        <FontAwesome5 style={ styles.icon } name={ icon } />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 1,
    borderRadius: 4,
    backgroundColor: '#4A0C05',
    marginHorizontal: 20,
    width: '75%'
  },
  icon: {
    fontSize: 25, 
    color: 'white',
    alignSelf: 'center'
  }
})

export default HeaderButtonSmall