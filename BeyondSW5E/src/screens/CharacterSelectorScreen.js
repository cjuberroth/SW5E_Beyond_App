import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import HeaderContext from '../context/HeaderContext'
import jalenOrso from '../../data/jalenOrso2'
import miltox from '../../data/miltox'
import archifamel from '../../data/archifamel'
import theebisRoh from '../../data/theebisRoh'
import trevalla from '../../data/trevalla'
import t3P0 from '../../data/t3P0'
import consularSentinel from '../../data/consularSentinel'

const CharacterSelectorScreen = ({navigation}) => {

	const inspiration = useContext(HeaderContext).headerUtils.inspiration
	const { setInspiration } = useContext(HeaderContext).headerUtils
	const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
	const { setCollapsed} = useContext(HeaderContext).headerUtils
	const { setCharacter } = useContext(CharacterContext)
	const { shortRestHitDiceUsed, setShortRestHitDiceUsed } = useContext(CharacterContext) 
    const setChar = (char) => {
        setCharacter(char)
        navigation.navigate('Tabs')
		if (inspiration) {setInspiration(false)}
		if (headerCollapsed) {setCollapsed(false)}
		if (shortRestHitDiceUsed.length != 1) {setShortRestHitDiceUsed([{class: '', numDice: 0}])}
    }

    const [characterJSON, changeCharacterJSON] = useState({})

	return (
		<View style={styles.containerStyle}>
			<Button title="Jalen Orso" onPress={ () => setChar(jalenOrso) }/>
			<Button title="Miltox" onPress={ () => setChar(miltox) }/>
			<Button title="Archifamel" onPress={ () => setChar(archifamel) }/>
			<Button title="Theebis Roh" onPress={ () => setChar(theebisRoh) }/>
			<Button title="Trevalla" onPress={ () => setChar(trevalla) }/>
			<Button title="T-3P0" onPress={ () => setChar(t3P0) }/>
			<Button title="Consular Sentinel" onPress={ () => setChar(consularSentinel) }/>
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
	containerStyle: {
		flex: 1,
		backgroundColor: '#263238'
	},
	headerStyle: {
		fontSize: 30
	},
	input: {
		height: 100,
		margin: 5,
		borderWidth: 1,
		padding: 10,
		backgroundColor: '#ffffff'
	}
})

export default CharacterSelectorScreen
