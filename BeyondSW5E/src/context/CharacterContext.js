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

	const [api_Species, set_api_Species] = useState([])
	const [api_Class, set_api_Class] = useState([])
	const [api_Feat, set_api_Feat] = useState([])
	const [api_Power, set_api_Power] = useState([])
	const [api_Archetype, set_api_Archetype] = useState([])
	const [api_ArmorProperty, set_api_ArmorProperty] = useState([])
	const [api_Background, set_api_Background] = useState([])
	const [api_Conditions, set_api_Conditions] = useState([])
	//EnhancedItem API is not working currently 07172022
	//const [api_EnhancedItem, set_api_EnhancedItem] = useState([])
	const [api_Equipment, set_api_Equipment] = useState([])
	const [api_Feature, set_api_Feature] = useState([])
	const [api_FightingMastery, set_api_FightingMastery] = useState([])
	const [api_FightingStyle, set_api_FightingStyle] = useState([])
	const [api_LightsaberForm, set_api_LightsaberForm] = useState([])
	const [api_Maneuvers, set_api_Maneuvers] = useState([])
	const [api_WeaponFocus, set_api_WeaponFocus] = useState([])
	const [api_WeaponProperty, set_api_WeaponProperty] = useState([])
	const [api_WeaponSupremacy, set_api_WeaponSupremacy] = useState([])

	const searchApi = async () => {
        var response = await swapi.get('/species')
        set_api_Species(response.data)
		//console.log("Species call run")
        response = await swapi.get('/class')
        set_api_Class(response.data)
		//console.log("Class call run")
		response = await swapi.get('/Feat')
		set_api_Feat(response.data)
		//console.log("Feat call run")
		response = await swapi.get('/power')
		set_api_Power(response.data)
		//console.log("Power call run")
		response = await swapi.get('/archetype')
		set_api_Archetype(response.data)
		//console.log("Archetype call run")
		response = await swapi.get('/ArmorProperty')
		set_api_ArmorProperty(response.data)
		//console.log("ArmorProperty call run")
		response = await swapi.get('/background')
		set_api_Background(response.data)
		//console.log("Background call run")
		response = await swapi.get('/conditions')
		set_api_Conditions(response.data)
		//console.log("Conditions call run")
		/*
		response = await swapi.get('/enhancedItem')
		set_api_EnhancedItem(response.data)
		//console.log("EnhancedItem call run")
		*/
		response = await swapi.get('/equipment')
		set_api_Equipment(response.data)
		//console.log("Equipment call run")
		response = await swapi.get('/Feature')
		set_api_Feature(response.data)
		//console.log("Feature call run")
		response = await swapi.get('/FightingMastery')
		set_api_FightingMastery(response.data)
		//console.log("FightingMastery call run")
		response = await swapi.get('/FightingStyle')
		set_api_FightingStyle(response.data)
		//console.log("FightingStyle call run")
		response = await swapi.get('/LightsaberForm')
		set_api_LightsaberForm(response.data)
		//console.log("LightsaberForm call run")
		response = await swapi.get('/Maneuvers')
		set_api_Maneuvers(response.data)
		//console.log("Maneuvers call run")
		response = await swapi.get('/WeaponFocus')
		set_api_WeaponFocus(response.data)
		//console.log("WeaponFocus call run")
		response = await swapi.get('/WeaponProperty')
		set_api_WeaponProperty(response.data)
		//console.log("WeaponProperty call run")
		response = await swapi.get('/WeaponSupremacy')
		set_api_WeaponSupremacy(response.data)
		//console.log("WeaponSupremacy call run")
    }

    useEffect(() => { searchApi() }, [])
	

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
	var backgroundFeat = [charData.background.feat.name]

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


	return <CharacterContext.Provider value={{character, setCharacter, characterInformation, characterAbilities, characterMods, characterSaves, characterFeats, characterCasting}}>
		{children}
	</CharacterContext.Provider>
}

export default CharacterContext
