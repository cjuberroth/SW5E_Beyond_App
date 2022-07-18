import React, { useContext, useState, useEffect } from 'react'
import swapi from '../api/swapi'
import charAbilitiesImport from '../../data/jalenOrso2'
import jalenOrso from '../../data/jalenOrso2'
import archifamel from '../../data/archifamel'
import dauBon from '../../data/dauBon'
import miltox from '../../data/miltox'
import theebisRoh from '../../data/theebisRoh'
import trevalla from '../../data/trevalla'

const CharacterContext = React.createContext({
	character: charAbilitiesImport,
	setCharacter: (char) => {}
})

export const CharacterProvider = ({children}) => {
	const [character, setCharacter] = useState(charAbilitiesImport)
	const charData = character
	const [isLoaded, setIsLoaded] = useState(false)

	//helper function to check if an object key has an empty value
	const isEmpty = (obj) => {
		return Object.keys(obj).length === 0
	}

	//helper function to calculate mods
	const modifier = function(ability) {
        return Math.floor((ability-10)/2)
    }

	//flagging functions
	const isForceClass = (charClass) => {
		for(i = 0; i < api_Class.length; i++) {
			if(api_Class[i].name === charClass) {
				if(api_Class[i].levelChanges[1]["Force Powers Known"] != undefined) {
					return true
				} else {
					return false
				}
			}
		}
	}

	const isTechClass = (charClass) => {
		for(i = 0; i < api_Class.length; i++) {
			if(api_Class[i].name === charClass) {
				if(api_Class[i].levelChanges[1]["Tech Powers Known"] != undefined) {
					return true
				} else {
					return false
				}
			}
		}
	}
	
	var api_Species = []
	var api_Class = []
	var api_Feat = []
	var api_Power = []
	var api_Archetype = []
	var api_ArmorProperty = []
	var api_Background = []
	var api_Conditions = []
	//EnhancedItem API is not working currently 07172022
	//var [api_EnhancedItem, set_api_EnhancedItem] = []
	var api_Equipment = []
	var api_Feature = []
	var api_FightingMastery = []
	var api_FightingStyle = []
	var api_LightsaberForm = []
	var api_Maneuvers = []
	var api_WeaponFocus = []
	var api_WeaponProperty = []
	var api_WeaponSupremacy = []
	
	//this method is not working to capture the api data for some reason
	const searchApi = async () => {
        var response = await swapi.get('/species')
		//console.log(response)
        api_Species = response.data
		console.log("Species loaded")
        response = await swapi.get ('/class')
        api_Class = response.data
		console.log("Class loaded")
		response = await swapi.get('/Feat')
		api_Feat = response.data
		console.log("Feat loaded")
		response = await swapi.get('/power')
		api_Power = response.data
		console.log("Power loaded")
		response = await swapi.get('/archetype')
		api_Archetype = response.data
		console.log("Archetype loaded")
		response = await swapi.get('/ArmorProperty')
		api_ArmorProperty = response.data
		console.log("ArmorProperty loaded")
		response = await swapi.get('/background')
		api_Background = response.data
		console.log("Background loaded")
		response = await swapi.get('/conditions')
		api_Conditions = response.data
		console.log("Conditions loaded")
		/*
		response = await swapi.get('/enhancedItem')
		api_EnhancedItem = response.data
		*/
		response = await swapi.get('/equipment')
		api_Equipment = response.data
		console.log("Equipment loaded")
		response = await swapi.get('/Feature')
		api_Feature = response.data
		console.log("Feature loaded")
		response = await swapi.get('/FightingMastery')
		api_FightingMastery = response.data
		console.log("FightingMastery loaded")
		response = await swapi.get('/FightingStyle')
		api_FightingStyle = response.data
		console.log("FightingStyle loaded")
		response = await swapi.get('/LightsaberForm')
		api_LightsaberForm = response.data
		console.log("LightsaberForm loaded")
		response = await swapi.get('/Maneuvers')
		api_Maneuvers = response.data
		console.log("Maneuvers loaded")
		response = await swapi.get('/WeaponFocus')
		api_WeaponFocus = response.data
		console.log("WeaponFocus loaded")
		response = await swapi.get('/WeaponProperty')
		api_WeaponProperty = response.data
		console.log("WeaponProperty loaded")
		response = await swapi.get('/WeaponSupremacy')
		api_WeaponSupremacy = response.data
		console.log("WeaponSupremacy loaded")
		console.log("APIs finished")
		setIsLoaded(true)
    }

    useEffect(() => { searchApi() }, [])

	console.log(api_Class)
	
	//object to export raw api data
	const apiData = {
		archetype: api_Archetype,
		armorProperty: api_ArmorProperty,
		background: api_Background,
		class: api_Class,
		conditions: api_Conditions,
		equipment: api_Equipment,
		feat: api_Feat,
		feature: api_Feature,
		fightingMastery: api_FightingMastery,
		fightingStyle: api_FightingStyle,
		lightsaberForm: api_LightsaberForm,
		maneuvers: api_Maneuvers,
		power: api_Power,
		species: api_Species,
		weaponFocus: api_WeaponFocus,
		weaponProperty: api_WeaponProperty,
		weaponSupremacy: api_WeaponSupremacy
	}

	//calculate ability scores
	if(isEmpty(charData.species.abilityScoreImprovement)) {
		//several species present a choice of ability score improvements
		//if not presented with a choice, get the increases from the species api
		
		var species = character.species.name
		var speciesIncrease = []

		//this loop creates an array of objects that give the stat and increase from the api
	    for(let i = 0; i < api_Species.length; i++) {
	    	if (api_Species[i].name === species) {
		    	for(let j = 0; j < api_Species[i].abilitiesIncreased.length; j++) {
		    		for(let k = 0; k < api_Species[i].abilitiesIncreased[j].length; k++) {
		    			for(let l = 0; l < api_Species[i].abilitiesIncreased[j][k].abilities.length; l++) {
		    				speciesIncrease.push({stat: api_Species[i].abilitiesIncreased[j][k].abilities[l], up: api_Species[i].abilitiesIncreased[j][k].amount})
		    			}
		    		}
		    	}
		    }
	    }

		//set the base ability scores from the JSON
		var strength = charData.baseAbilityScores.Strength
		var dexterity = charData.baseAbilityScores.Dexterity
		var constitution = charData.baseAbilityScores.Constitution
		var intelligence = charData.baseAbilityScores.Intelligence
		var wisdom = charData.baseAbilityScores.Wisdom
		var charisma = charData.baseAbilityScores.Charisma

		//add the increases to the base ability scores
		for(let i = 0; i < speciesIncrease.length; i++) {
			switch (speciesIncrease[i].stat) {
				case 'Strength':
					strength = strength + speciesIncrease[i].up
					break
				case 'Dexterity':
					dexterity = dexterity + speciesIncrease[i].up
					break
				case 'Constitution':
					constitution = constitution + speciesIncrease[i].up
					break
				case 'Intelligence':
					intelligence = intelligence + speciesIncrease[i].up
					break
				case 'Wisdom':
					wisdom = wisdom + speciesIncrease[i].up
					break
				case 'Charisma':
					charisma = charisma + speciesIncrease[i].up
					break
			}
		}
	} else {
		//this block handles species that give a choice via data from the JSON
		var strength = charData.baseAbilityScores.Strength + (charData.species.abilityScoreImprovement.Strength ?? 0)
		var dexterity = charData.baseAbilityScores.Dexterity + (charData.species.abilityScoreImprovement.Dexterity ?? 0)
		var constitution = charData.baseAbilityScores.Constitution + (charData.species.abilityScoreImprovement.Constitution ?? 0)
		var intelligence = charData.baseAbilityScores.Intelligence + (charData.species.abilityScoreImprovement.Intelligence ?? 0)
		var wisdom = charData.baseAbilityScores.Wisdom + (charData.species.abilityScoreImprovement.Wisdom ?? 0)
		var charisma = charData.baseAbilityScores.Charisma + (charData.species.abilityScoreImprovement.Charisma ?? 0)
	}

	//variables to capture ability score increases from leveling
	var strengthIncrease = 0
	var dexterityIncrease = 0
	var constitutionIncrease = 0
	var intelligenceIncrease = 0
	var wisdomIncrease = 0
	var charismaIncrease = 0

	//this loop captures all ability score increases resulting from leveling
	for(let i = 0; i < charData.classes.length; i++) {
		for (let y = 0; y < charData.classes[i].abilityScoreImprovements.length; y++) {
			if(charData.classes[i].abilityScoreImprovements[y].type === "Ability Score Improvement") {
				for (let j = 0; j < charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased.length; j++) {
					switch (charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].name) {
						case 'Strength':
							strengthIncrease = strengthIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
						case 'Dexterity':
							dexterityIncrease = dexterityIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
						case 'Constitution':
							constitutionIncrease = constitutionIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
						case 'Intelligence':
							intelligenceIncrease = intelligenceIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
						case 'Wisdom':
							wisdomIncrease = wisdomIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
						case 'Charisma':
							charismaIncrease = charismaIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
					}
				}
			}
		}
	}

	//calculate and set the ability scores
	strength = strength + (strengthIncrease ?? 0)
	dexterity = dexterity + (dexterityIncrease ?? 0)
	constitution = constitution + (constitutionIncrease ?? 0)
	intelligence = intelligence + (intelligenceIncrease ?? 0)
	wisdom = wisdom + (wisdomIncrease ?? 0)
	charisma = charisma + (charismaIncrease ?? 0)

	//find the character level by adding together all class levels
	var charLevel = []
	var charProf = 0

	for (let i = 0; i < charData.classes.length; i++) {
		charLevel.push(charData.classes[i].levels)
	}

	charLevel = charLevel.reduce((a, b) => a + b, 0)

	//calculate proficiency based on character level 
	//(there may be a more elegant way to do this; doesn't account for homebrew)
	switch (true) {
		case (charLevel < 5):
			charProf = 2
			break
		case (charLevel < 9):
			charProf = 3
			break
		case (charLevel < 13):
			charProf = 4
			break
		case (charLevel < 17):
			charProf = 5
			break
		case (charLevel < 21):
			charProf = 6
			break
	}

	//check for overrides from website character creator
	if (charData.tweaks?.abilityScores?.Strength?.score?.override) {strength = charData.tweaks?.abilityScores?.Strength?.score?.override}
	if (charData.tweaks?.abilityScores?.Dexterity?.score?.override) {dexterity = charData.tweaks?.abilityScores?.Dexterity?.score?.override}
	if (charData.tweaks?.abilityScores?.Constitution?.score?.override) {constitution = charData.tweaks?.abilityScores?.Constitution?.score?.override}
	if (charData.tweaks?.abilityScores?.Intelligence?.score?.override) {intelligence = charData.tweaks?.abilityScores?.Intelligence?.score?.override}
	if (charData.tweaks?.abilityScores?.Wisdom?.score?.override) {wisdom = charData.tweaks?.abilityScores?.Wisdom?.score?.override}
	if (charData.tweaks?.abilityScores?.Charisma?.score?.override) {charisma = charData.tweaks?.abilityScores?.Charisma?.score?.override}

	//object for exporting character information
	const characterInformation = {
		name: charData.name,
		proficiency: charProf,
	}
	
	//object for exporting ability scores
	const characterAbilities = {
		abilitiesStrength: strength,
		abilitiesDexterity: dexterity,
		abilitiesConstitution: constitution,
		abilitiesIntelligence: intelligence,
		abilitiesWisdom: wisdom,
		abilitiesCharisma: charisma
	}

	//object for exporting ability mods
    const characterMods = {
    	str_mod: modifier(characterAbilities.abilitiesStrength),
    	dex_mod: modifier(characterAbilities.abilitiesDexterity),
    	con_mod: modifier(characterAbilities.abilitiesConstitution),
    	int_mod: modifier(characterAbilities.abilitiesIntelligence),
    	wis_mod: modifier(characterAbilities.abilitiesWisdom),
    	cha_mod: modifier(characterAbilities.abilitiesCharisma)
    }

    
	//get first class's saving throw proficiency(ies)
	if(!isEmpty(api_Class)){
		for(let i = 0; i < api_Class.length; i++){
			if (api_Class[i].name === charData.classes[0].name) {
				var charSave = api_Class[i].savingThrows
			}
		}
	}
	
    //calculate saves
	if(charSave) {
		if (charSave.includes("Strength")) {
			var strSave = characterMods.str_mod + charProf
		} else {
			var strSave = characterMods.str_mod
		}
		if (charSave.includes("Dexterity")) {
			var dexSave = characterMods.dex_mod + charProf
		} else {
			var dexSave = characterMods.dex_mod
		}
		if (charSave.includes("Constitution")) {
			var conSave = characterMods.con_mod + charProf
		} else {
			var conSave = characterMods.con_mod
		}
		if (charSave.includes("Intelligence")) {
			var intSave = characterMods.int_mod + charProf
		} else {
			var intSave = characterMods.int_mod
		}
		if (charSave.includes("Wisdom")) {
			var wisSave = characterMods.wis_mod + charProf
		} else {
			var wisSave = characterMods.wis_mod
		}
		if (charSave.includes("Charisma")) {
			var chaSave = characterMods.cha_mod + charProf
		} else {
			var chaSave = characterMods.cha_mod
		}
	}
	
	//object to export saving throw scores
	const characterSaves = {
		str_save: strSave,
		dex_save: dexSave,
		con_save: conSave,
		int_save: intSave,
		wis_save: wisSave,
		cha_save: chaSave
	}

	//capture which feats have been taken via the JSON
	//this is currently creating an array, which is not what the feature card is looking for
	//need to get the whole object, not just the name
	var featsFromClass = []
	for(let i = 0; i < charData.classes.length; i++) {
		for (let y = 0; y < charData.classes[i].abilityScoreImprovements.length; y++) {
			if(charData.classes[i].abilityScoreImprovements[y].type === "Feat") {
				featsFromClass.push(charData.classes[i].abilityScoreImprovements[y].name)
			}
		}
	}

	//capture any class archetypes taken via the JSON
	var classArchetype = []
	for(let i = 0; i < charData.classes.length; i++) {
		if(charData.classes[i].archetype?.name != undefined) {
			classArchetype.push(charData.classes[i].archetype?.name)
		}
	}

	//capture the character background feat via the JSON
	var backgroundFeat = charData.background.feat.name

	//combine the background feat and class feats into a single list
	const charFeats = featsFromClass.concat(backgroundFeat)

	//object to export character feat information
	const characterFeats = {
		archetype: classArchetype,
		feats: charFeats
	}

	
	//for some reason, the loop below is causing the app to not load 07162022AY
	var classLevel = ''
	//calculate max force points
	var forcePoints = []
	for(k = 0; k < charData.classes.length; k++) {
		if(isForceClass(charData.classes[k].name)) {
			classLevel = charData.classes[k].levels
			for(j = 0; j < api_Class.length; j++) {
				if(api_Class[j].name === charData.classes[k].name) {
					forcePoints.push(parseInt((api_Class[j]["levelChanges"][classLevel]["Force Points"]), 10))
				}
			}
		}
	}
	let numOr0 = n => isNaN(n) ? 0 : n
	forcePoints = forcePoints.reduce((a, b) => numOr0(a) + numOr0(b), 0)
	//need to add wisdom or charisma modifier to forcePoints
	//not sure how to make that decision yet; 5e website doesn't have a place where
	//the decision is made, so it may just be taking the highest mod of the two

	//object to export character force casting information
	const characterCasting = {
		forcePoints: forcePoints
	}

	var equipmentList = charData.equipment.concat(charData.customEquipment)
	for(i = 0; i < equipmentList.length; i++) {
		for(j = 0; j < equipmentList.length; j++) {
			if(i != j) {
				if(equipmentList[i].name === equipmentList[j].name) {
					console.log(equipmentList[i].name)
				}
			}
		}
	}

	return <CharacterContext.Provider value={{character, setCharacter, characterInformation, characterAbilities, characterMods, characterSaves, characterFeats, characterCasting, apiData}}>
		{children}
	</CharacterContext.Provider>
}

export default CharacterContext
