import React, { useContext, useState } from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import CharacterContext from '../context/CharacterContext'
import jalenOrso from '../../data/jalenOrso2'
import miltox from '../../data/miltox'

const CharacterSelectorScreen = ({navigation}) => {

	const { setCharacter } = useContext(CharacterContext)
    const setChar = (char) => {
        setCharacter(char)
        navigation.navigate('mainFlow')
    }

	return (
		<View>
			<Text style={styles.headerStyle}>Choose Character</Text>
			<Button title="Jalen Orso" onPress={ () => setChar(jalenOrso) }/>
			<Button title="Miltox" onPress={ () => setChar(miltox) }/>
		</View>
	)
}

const styles = StyleSheet.create({
	headerStyle: {
		fontSize: 30
	}
})

export default CharacterSelectorScreen
