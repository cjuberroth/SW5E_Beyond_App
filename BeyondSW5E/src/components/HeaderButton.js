import React from 'react'
import { Text, View, StyleSheet, Pressable, Image } from 'react-native'

const HeaderButton = (props) => {
  const { onPress, title, buttonStyle = {} } = props;
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 4,
    backgroundColor: '#4A0C05',
    marginHorizontal: 20,
    marginVertical: 5,
    minWidth: '80%'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  },
})

export default HeaderButton