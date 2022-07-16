import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import jalenOrso from '../../data/jalenOrso2'
import miltox from '../../data/miltox'
import archifamel from '../../data/archifamel'
import theebisRoh from '../../data/theebisRoh'

const CharacterSelectorScreen = ({navigation}) => {

	const { setCharacter } = useContext(CharacterContext)
    const setChar = (char) => {
        setCharacter(char)
        navigation.navigate('SW5EBeyond')
    }

    const [characterJSON, changeCharacterJSON] = useState({})

	return (
		<View>
			<Text style={styles.headerStyle}>Choose Character</Text>
			<Button title="Jalen Orso" onPress={ () => setChar(jalenOrso) }/>
			<Button title="Miltox" onPress={ () => setChar(miltox) }/>
			<Button title="Archifamel" onPress={ () => setChar(archifamel) }/>
			<Button title="Theebis Roh" onPress={ () => setChar(theebisRoh) }/>
			<TextInput 
				style={styles.input} 
				placeholder="Enter character JSON here" 
				onChangeText={newText => changeCharacterJSON(newText)}
				multiline={true} />
			<Button title="Submit" onPress={ () => setChar(JSON.parse(characterJSON)) }/>
		</View>
	)
}

const styles = StyleSheet.create({
	headerStyle: {
		fontSize: 30
	},
	input: {
		height: 100,
		margin: 5,
		borderWidth: 1,
		padding: 10
	}
})

export default CharacterSelectorScreen
