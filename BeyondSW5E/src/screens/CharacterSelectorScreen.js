import React, { useContext, useState } from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import CharacterContext from '../context/CharacterContext'

const CharacterSelectorScreen = ({navigation}) => {

	const context = useContext(CharacterContext)
	const [character, setCharacter] = useState('')

	const setChar = (char) => {
		setCharacter(char)
		navigation.navigate('mainFlow')
	}

	return (
		<View>
			<Text style={styles.headerStyle}>Choose Character</Text>
			<Button title="Jalen Orso" onPress={() => setChar('jalenOrso2')}/>
			<Button title="Miltox" onPress={() => setChar('miltox')}/>
		</View>
	)
}

const styles = StyleSheet.create({
	headerStyle: {
		fontSize: 30
	}
})

export default CharacterSelectorScreen