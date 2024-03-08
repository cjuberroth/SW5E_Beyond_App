import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import HeaderContext from '../context/HeaderContext'
import jalenOrso from '../../data/jalenOrso2'
import miltox from '../../data/miltox'
import archifamel from '../../data/archifamel'
import theebisRoh from '../../data/theebisRoh'
import trevalla from '../../data/trevalla'
import t3P0 from '../../data/t3P0'
import consularSentinel from '../../data/consularSentinel'
import xund from '../../data/xund'
import useStore from '../stores/store'
import useAPI_DataStore from '../stores/apiDataStore'
import calculateAbilityScores from '../components/logic/calculateAbilityScores'
import calculateSaves from '../components/logic/calculateSaves'
import { speciesData, classData, featData, powerData, archetypeData, armorPropertyData,
    	backgroundData, conditionsData, enhancedItemData, equipmentData, featureData,
    	fightingMasteryData, fightingStyleData, lightsaberFormData, maneuversData,
    	skillsData, weaponFocusData, weaponPropertyData, weaponSupremacyData } from '../api/apiCalls'

const CharacterSelectorScreen = ({navigation}) => {
	const inspiration = useContext(HeaderContext).headerUtils.inspiration
	const { setInspiration } = useContext(HeaderContext).headerUtils
	const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
	const { setCollapsed} = useContext(HeaderContext).headerUtils
	const { setCharacter } = useContext(CharacterContext)
	const { shortRestHitDiceUsed, setShortRestHitDiceUsed } = useContext(CharacterContext)
	const storeData = useStore()

	const setChar = (char) => {
        setCharacter(char)
		storeData.setCharacterData(char)
		storeData.setAbilitiesAndMods(calculateAbilityScores(char, speciesData))
		
		const apiData = useAPI_DataStore.getState().apiData
		const classInfo = apiData.classData

		if (classInfo) {
			storeData.setSaves(char, classInfo)
		}
		
		navigation.navigate('Tabs')
		if (inspiration) {setInspiration(false)}
		if (headerCollapsed) {setCollapsed(false)}
		if (shortRestHitDiceUsed.length != 1) {setShortRestHitDiceUsed([{class: '', numDice: 0}])}
    }

    const [characterJSON, changeCharacterJSON] = useState({})
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		populateAPI_Store()
	}, [])

	const populateAPI_Store = async () => {
		const api_Species = await speciesData()
		const api_Class = await classData()
		const api_Feat = await featData()
		const api_Power = await powerData()
		const api_Archetype = await archetypeData()
		const api_ArmorProperty = await armorPropertyData()
		const api_Background = await backgroundData()
		const api_Conditions = await conditionsData()
		const api_EnhancedItem = await enhancedItemData()
		const api_Equipment = await equipmentData()
		const api_Feature = await featureData()
		const api_FightingMastery = await fightingMasteryData()
		const api_FightingStyle = await fightingStyleData()
		const api_LightsaberForm = await lightsaberFormData()
		const api_Maneuvers = await maneuversData()
		const api_SkillsLU = await skillsData()
		const api_WeaponFocus = await weaponFocusData()
		const api_WeaponProperty = await weaponPropertyData()
		const api_WeaponSupremacy = await weaponSupremacyData()

		if (api_Species && api_Class && api_Feat && api_Power && api_Archetype && api_ArmorProperty &&
			api_Background && api_Conditions && api_EnhancedItem && api_Equipment && api_Feature &&
			api_FightingMastery && api_FightingStyle && api_LightsaberForm && api_Maneuvers &&
			api_SkillsLU && api_WeaponFocus && api_WeaponProperty && api_WeaponSupremacy) {
			const combinedData = {
				speciesData: api_Species, classData: api_Class, featData: api_Feat, powerData: api_Power, archetypeData: api_Archetype, armorPropertyData: api_ArmorProperty,
				backgroundData: api_Background, conditionsData: api_Conditions, enhancedItemData: api_EnhancedItem, equipmentData: api_Equipment, featureData: api_Feature,
				fightingMasteryData: api_FightingMastery, fightingStyleData: api_FightingStyle, lightsaberFormData: api_LightsaberForm, maneuversData: api_Maneuvers,
				skillsData: api_SkillsLU, weaponFocusData: api_WeaponFocus, weaponPropertyData: api_WeaponProperty, weaponSupremacyData: api_WeaponSupremacy
			}
			useAPI_DataStore.getState().setAPIData(combinedData)
		}
		setIsLoaded(true)
	}

	//console.log(useCharDataStore.getState().speciesData)

	if (isLoaded) {
	return (
		<View style={styles.containerStyle}>
			<Button title="Jalen Orso" onPress={ () => setChar(jalenOrso) }/>
			<Button title="Miltox" onPress={ () => setChar(miltox) }/>
			<Button title="Archifamel" onPress={ () => setChar(archifamel) }/>
			<Button title="Theebis Roh" onPress={ () => setChar(theebisRoh) }/>
			<Button title="Trevalla" onPress={ () => setChar(trevalla) }/>
			<Button title="T-3P0" onPress={ () => setChar(t3P0) }/>
			<Button title="Consular Sentinel" onPress={ () => setChar(consularSentinel) }/>
			<Button title="Xund" onPress={ () => setChar(xund) }/>
			<TextInput 
				style={styles.input} 
				placeholder="Enter character JSON here" 
				onChangeText={newText => changeCharacterJSON(newText)}
				multiline={true} />
			<Button title="Submit" onPress={ () => setChar(JSON.parse(characterJSON)) }/>
		</View>
	)
	} else {
		return (
			<View style={styles.loading} >
				<ActivityIndicator size='large' color='#ffe81f' />
				<Text style={{color: 'white', alignSelf: 'center'}}>Loading Data</Text>
			</View>
		)
	}
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
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'black'
	},
	activityIndicator: {
		size: 'large',
		color: '#ffe81f',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default CharacterSelectorScreen
