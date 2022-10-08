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

	//helper function to present a number with a + sign if positive
	const numberPresent = function(score) {
		if(score >= 0) {
			return "+"
		} else {
			return
		}
	  }

	  //object to export functions
	  const functions = {
		numberPresent: numberPresent
	  }
	
	const [api_Species, set_api_Species] = useState([])
	const [api_Class, set_api_Class] = useState([])
	const [api_Feat, set_api_Feat] = useState([])
	const [api_Power, set_api_Power] = useState([])
	const [api_Archetype, set_api_Archetype] = useState([])
	const [api_ArmorProperty, set_api_ArmorProperty] = useState([])
	const [api_Background, set_api_Background] = useState([])
	const [api_Conditions, set_api_Conditions] = useState([])
	const [api_EnhancedItem, set_api_EnhancedItem] = useState([])
	const [api_Equipment, set_api_Equipment] = useState([])
	const [api_Feature, set_api_Feature] = useState([])
	const [api_FightingMastery, set_api_FightingMastery] = useState([])
	const [api_FightingStyle, set_api_FightingStyle] = useState([])
	const [api_LightsaberForm, set_api_LightsaberForm] = useState([])
	const [api_Maneuvers, set_api_Maneuvers] = useState([])
	const [api_WeaponFocus, set_api_WeaponFocus] = useState([])
	const [api_WeaponProperty, set_api_WeaponProperty] = useState([])
	const [api_WeaponSupremacy, set_api_WeaponSupremacy] = useState([])
	const [api_SkillsLU, set_api_SkillsLU] = useState([])

	const searchApi = async () => {
        var response = await swapi.get('/species')
        set_api_Species(response.data)
        response = await swapi.get('/class')
        set_api_Class(response.data)
		response = await swapi.get('/Feat')
		set_api_Feat(response.data)
		response = await swapi.get('/power')
		set_api_Power(response.data)
		response = await swapi.get('/archetype')
		set_api_Archetype(response.data)
		response = await swapi.get('/ArmorProperty')
		set_api_ArmorProperty(response.data)
		response = await swapi.get('/background')
		set_api_Background(response.data)
		response = await swapi.get('/conditions')
		set_api_Conditions(response.data)
		response = await swapi.get('/enhancedItem')
		set_api_EnhancedItem(response.data)
		response = await swapi.get('/equipment')
		set_api_Equipment(response.data)
		response = await swapi.get('/Feature')
		set_api_Feature(response.data)
		response = await swapi.get('/FightingMastery')
		set_api_FightingMastery(response.data)
		response = await swapi.get('/FightingStyle')
		set_api_FightingStyle(response.data)
		response = await swapi.get('/LightsaberForm')
		set_api_LightsaberForm(response.data)
		response = await swapi.get('/Maneuvers')
		set_api_Maneuvers(response.data)
		response = await swapi.get('/WeaponFocus')
		set_api_WeaponFocus(response.data)
		response = await swapi.get('/WeaponProperty')
		set_api_WeaponProperty(response.data)
		response = await swapi.get('/WeaponSupremacy')
		set_api_WeaponSupremacy(response.data)
		response = await swapi.get('/skills')
		set_api_SkillsLU(response.data)
    }

	useEffect(() => { 
		let cancel = false
		searchApi().then(() => {
			if (cancel) return
			return () => {
				cancel = true
			}
		}) }, [])
	
	//object to export raw api data
	const apiData = {
		archetype: api_Archetype,
		armorProperty: api_ArmorProperty,
		background: api_Background,
		class: api_Class,
		conditions: api_Conditions,
		enhancedItems: api_EnhancedItem,
		equipment: api_Equipment,
		feat: api_Feat,
		feature: api_Feature,
		fightingMastery: api_FightingMastery,
		fightingStyle: api_FightingStyle,
		lightsaberForm: api_LightsaberForm,
		maneuvers: api_Maneuvers,
		power: api_Power,
		skillsLU: api_SkillsLU,
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
	//could use the CharacterAdvancementLU api, but it would add another api call
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

	//determine character hit points
	var charHP = 0
	var charHParray = []
	if (charData.tweaks?.hitPoints?.maximum?.override != null) {
		charHP = charData.tweaks?.hitPoints?.maximum?.override
	} else {
		if (!isEmpty(api_Class)) {
			for (let i = 0; i < api_Class.length; i++) {
				if (api_Class[i].name === charData.classes[0].name) {
					//first class's hit die
					charHP = charHP + api_Class[i].hitDiceDieType
				}
			}
		}
		//capture all classes hit point increases
		for (let i = 0; i < charData.classes.length; i++) {
			charHParray.push(charData.classes[i].hitPoints)
		}
		//flatten to a single array
		charHParray = charHParray.flat()
		//sum all array elements with the first class's hit die
		charHP = charHP + charHParray.reduce((a,b) => a + b, 0)
		//add the con mod multiplied by the number of total levels
		charHP = charHP + (modifier(constitution) * charLevel)
	}

	//base walking speed by species
	var charSpeed = 0
	if (!isEmpty(api_Species)) {
		for (let i = 0; i < api_Species.length; i++) {
			if (api_Species[i].name === charData.species.name) {
				for (let j = 0; j < api_Species[i].traits.length; j++) {
					if (api_Species[i].traits[j].name === 'Speed') {
						charSpeed = api_Species[i].traits[j].description.match(/\d+/)[0]
					}
				}
			}
		}
	}
	
	//object for exporting character information
	const characterInformation = {
		name: charData.name,
		proficiency: charProf,
		image: charData.image,
		hitPoints: charHP,
		hitPointsLost: charData.currentStats.hitPointsLost,
		speed: charSpeed,
		conditions: charData.currentStats.conditions
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
	var charFeats = []
	for(let i = 0; i < charData.classes.length; i++) {
		for (let y = 0; y < charData.classes[i].abilityScoreImprovements.length; y++) {
			if(charData.classes[i].abilityScoreImprovements[y].type === "Feat") {
				if (api_Feat != '') {
					for (let j = 0; j < api_Feat.length; j++) {
							if (api_Feat[j].name === charData.classes[i].abilityScoreImprovements[y].name) {
								charFeats.push(api_Feat[j])
							}
					}	
				}
			}
		}
	}

	//capture the character background feat via the JSON
	var backgroundFeat = charData.background.feat.name
	for (i = 0; i < api_Feat.length; i++) {
		if (api_Feat[i].name === backgroundFeat) {
			charFeats.push(api_Feat[i])
		}
	}

	//capture any class archetypes taken via the JSON
	var charArchetype = []
	for(let i = 0; i < charData.classes.length; i++) {
		if(charData.classes[i].archetype?.name != undefined) {
			//charArchetype.push(charData.classes[i].archetype?.name)
			for (j = 0; j < api_Archetype.length; j++) {
				if (api_Archetype[j].name === charData.classes[i].archetype?.name) {
					charArchetype.push(api_Archetype[j])
				}
			}
		}
	}

	//object to export character feat/archetype information
	const characterFeats = {
		archetype: charArchetype,
		feats: charFeats
	}

	//calculate max force points
	var classLevel = ''
	//#region ForcePowerData
	let numOr0 = n => isNaN(n) ? 0 : n
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
	forcePoints = forcePoints.reduce((a, b) => numOr0(a) + numOr0(b), 0)
	forcePoints = forcePoints + Math.max(characterMods.wis_mod, characterMods.cha_mod)

	//get force powers known
	var forcePowers = []
	for (m = 0; m < charData.classes.length; m++) {
		if (isForceClass(charData.classes[m].name)) {
			for (j = 0; j < charData.classes[m].forcePowers.length; j++) {
				forcePowers.push(charData.classes[m].forcePowers[j])
			}
		}
	}

	var forcePowersData = []
	for (i = 0; i < forcePowers.length; i++) {
		if (api_Power != '') {	
			forcePowersData.push(api_Power.filter(api_Power => {
				return api_Power.name === forcePowers[i]
			
			}))
		}
	}
	forcePowersData = forcePowersData.flat()
	//#endregion
	//#region TechPowerData
	var techPoints = []
	for(k = 0; k < charData.classes.length; k++) {
		if(isTechClass(charData.classes[k].name)) {
			classLevel = charData.classes[k].levels
			for(j = 0; j < api_Class.length; j++) {
				if(api_Class[j].name === charData.classes[k].name) {
					techPoints.push(parseInt((api_Class[j]["levelChanges"][classLevel]["Tech Points"]), 10))
				}
			}
		}
	}
	techPoints = techPoints.reduce((a, b) => numOr0(a) + numOr0(b), 0)
	techPoints = techPoints + characterMods.int_mod

	//get force powers known
	var techPowers = []
	for (m = 0; m < charData.classes.length; m++) {
		if (isTechClass(charData.classes[m].name)) {
			for (j = 0; j < charData.classes[m].techPowers.length; j++) {
				techPowers.push(charData.classes[m].techPowers[j])
			}
		}
	}

	var techPowersData = []
	for (i = 0; i < techPowers.length; i++) {
		if (api_Power != '') {	
			techPowersData.push(api_Power.filter(api_Power => {
				return api_Power.name === techPowers[i]
			
			}))
		}
	}
	techPowersData = techPowersData.flat()
	//#endregion
	//object to export character casting information
	const characterCasting = {
		forcePoints: forcePoints,
		forcePowers: forcePowers,
		forcePowersData: forcePowersData,
		techPoints: techPoints,
		techPowers: techPowers,
		techPowersData: techPowersData
	}
	
	//capture character inventory via the JSON
	var equipmentList = charData.equipment
	
	//extract out any tweaked equipment
	var tweakedEquipment = []
	for(let i = 0; i < equipmentList.length; i++) {
		if ('tweaks' in equipmentList[i]) {
			tweakedEquipment.push(equipmentList[i])
		}
	}
	
	//match up api data with equipment list from JSON
	var equipmentData = []
	for(let i = 0; i < equipmentList.length; i++) {
		if (api_Equipment != '') {
			equipmentData.push(api_Equipment.filter(api_Equipment => {
				return api_Equipment.name === equipmentList[i].name
			}))
		}
	}
	for(let i = 0; i < equipmentList.length; i++) {
		if (api_EnhancedItem != '') {
			equipmentData.push(api_EnhancedItem.filter(api_EnhancedItem => {
				return api_EnhancedItem.name === equipmentList[i].name
			}))
		}
	}

	//used to get specific returns from enhanced item api
	// for(let i = 0; i < api_EnhancedItem.length; i++) {
	// 	if (api_EnhancedItem[i].name === 'Adapted Armor') {
	// 		console.log (api_EnhancedItem[i])
	// 	}
	// }

	//add custom equipment to full equipment data list
	equipmentData = equipmentData.flat().concat(charData.customEquipment)

	//inject tweaks into equipment data
	for(let i = 0; i < equipmentData.length; i++) {
		for(let j = 0; j < tweakedEquipment.length; j++) {
			if (equipmentData[i].name === tweakedEquipment[j].name) {
				// console.log(equipmentData[i].name)
				// console.log(tweakedEquipment[j].tweaks)
				equipmentData[i]["tweaks"] = tweakedEquipment[j].tweaks
			}
		}
	}

	//inject quantity and equipped status into equipment data list
	for(let i = 0; i < equipmentData.length; i++) {
		for(let j = 0; j < equipmentList.length; j++) {
			if (equipmentData[i].name === equipmentList[j].name) {
				equipmentData[i]["quantity"] = equipmentList[j].quantity
				equipmentData[i]["equipped"] = equipmentList[j].equipped
			}
		}
	}

	//determine AC
	var charAC = 0
	for(let i = 0; i < equipmentData.length; i++) {
		if (equipmentData[i].equipmentCategory === "Armor" && equipmentData[i].equipped === true) {
			switch (equipmentData[i].armorClassification) {
				case 'Light':
					charAC = parseInt(equipmentData[i]['ac'].substring(0,2)) + characterMods.dex_mod
					break
				case 'Medium':
					if (characterMods.dex_mod >= 2) {
						charAC = parseInt(equipmentData[i]['ac'].substring(0,2)) + 2
					} else {
						charAC = parseInt(equipmentData[i]['ac'].substring(0,2)) + characterMods.dex_mod
					}
					break
				case 'Heavy':
					charAC = equipmentData[i].ac
					break
			}
			if (equipmentData[i].armorClassification === 'Shield') {
				charAC = charAC + parseInt(equipmentData[i].ac)
			}
		}
	}

	//object to export equipment data
	const characterEquipment = {
		equipment: equipmentData,
		armorClass: charAC
	}
	
	//console.log("Render")

	return <CharacterContext.Provider value={{character, setCharacter, characterInformation, characterAbilities, characterMods, characterSaves, characterFeats, characterCasting, apiData, characterEquipment, functions}}>
		{children}
	</CharacterContext.Provider>
}

export default CharacterContext
