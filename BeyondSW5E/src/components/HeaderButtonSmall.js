import React from 'react'
import { Text, View, StyleSheet, Pressable, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../context/CharacterContext'

const HeaderButtonSmall = (props) => {
  const { onPress, icon } = props

  return (
    <Pressable style={ styles.button } onPress={ onPress }>
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
  text: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  icon: {
    fontSize: 25, 
    color: 'white',
    alignSelf: 'center'
  }
})

export default HeaderButtonSmall