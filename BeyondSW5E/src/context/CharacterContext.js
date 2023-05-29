import React, { useContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import useAPIData from '../hooks/useAPIData'
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

	// Helper Functions --------------------------------------------------------------------
	//Check if an object key has an empty value
	const isEmpty = (obj) => {
		return Object.keys(obj).length === 0
	}

	//Calculate mods
	const modifier = function(ability) {
        return Math.floor((ability-10)/2)
    }

	//Flagging functions
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

	//Present a number with a + sign if positive
	const numberPresent = function(score) {
		if(score >= 0) {
			return "+"
		} else {
			return
		}
	  }

	  const getArmorProficiencies = (str) => {
		str = str.trim()
		const spaceIndex = str.indexOf(' ')
		if (spaceIndex !== -1) {
			let convertedString = str.replace(/\w\S*/g,
				function(txt) {
					return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
				})
			return convertedString.substring(0, spaceIndex)
		} else {
			return str
		}
	}

	  //------------------------------------------------------------------------------------------

	  //object to export functions
	  const functions = {
		numberPresent: numberPresent,
		isForceClass: isForceClass,
		isTechClass: isTechClass
	  }
	
	// API Calling -------------------------------------------------------------------------------
	const [api_Species, set_api_Species] = useState([])
	const [api_Class, set_api_Class] = useState([])
	const [api_Feat, set_api_Feat] = useState([])
	const [api_Power, set_api_Power] = useState([])
	const [api_Archetype, set_api_Archetype] = useState([])
	//const [api_ArmorProperty, set_api_ArmorProperty] = useState([])
	//const [api_Background, set_api_Background] = useState([])
	const [api_Conditions, set_api_Conditions] = useState([])
	const [api_EnhancedItem, set_api_EnhancedItem] = useState([])
	const [api_Equipment, set_api_Equipment] = useState([])
	//const [api_Feature, set_api_Feature] = useState([])
	//const [api_FightingMastery, set_api_FightingMastery] = useState([])
	//const [api_FightingStyle, set_api_FightingStyle] = useState([])
	//const [api_LightsaberForm, set_api_LightsaberForm] = useState([])
	//const [api_Maneuvers, set_api_Maneuvers] = useState([])
	//const [api_WeaponFocus, set_api_WeaponFocus] = useState([])
	//const [api_WeaponProperty, set_api_WeaponProperty] = useState([])
	//const [api_WeaponSupremacy, set_api_WeaponSupremacy] = useState([])
	const [api_SkillsLU, set_api_SkillsLU] = useState([])

	const searchApi = async () => {
        let response = await swapi.get('/species')
        set_api_Species(response.data)
        response = await swapi.get('/class')
        set_api_Class(response.data)
		response = await swapi.get('/Feat')
		set_api_Feat(response.data)
		response = await swapi.get('/power')
		set_api_Power(response.data)
		response = await swapi.get('/archetype')
		set_api_Archetype(response.data)
		//esponse = await swapi.get('/ArmorProperty')
		//set_api_ArmorProperty(response.data)
		//response = await swapi.get('/background')
		//set_api_Background(response.data)
		response = await swapi.get('/conditions')
		set_api_Conditions(response.data)
		response = await swapi.get('/enhancedItem')
		set_api_EnhancedItem(response.data)
		response = await swapi.get('/equipment')
		set_api_Equipment(response.data)
		//response = await swapi.get('/Feature')
		//set_api_Feature(response.data)
		// response = await swapi.get('/FightingMastery')
		//set_api_FightingMastery(response.data)
		// response = await swapi.get('/FightingStyle')
		//set_api_FightingStyle(response.data)
		// response = await swapi.get('/LightsaberForm')
		//set_api_LightsaberForm(response.data)
		// response = await swapi.get('/Maneuvers')
		//set_api_Maneuvers(response.data)
		// response = await swapi.get('/WeaponFocus')
		//set_api_WeaponFocus(response.data)
		// response = await swapi.get('/WeaponProperty')
		//set_api_WeaponProperty(response.data)
		// response = await swapi.get('/WeaponSupremacy')
		//set_api_WeaponSupremacy(response.data)
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
	//---------------------------------------------------------------------------------------------

	//object to export raw api data
	const apiData = {
		archetype: api_Archetype,
		//armorProperty: api_ArmorProperty,
		//background: api_Background,
		class: api_Class,
		conditions: api_Conditions,
		enhancedItems: api_EnhancedItem,
		equipment: api_Equipment,
		feat: api_Feat,
		//feature: api_Feature,
		//fightingMastery: api_FightingMastery,
		//fightingStyle: api_FightingStyle,
		//lightsaberForm: api_LightsaberForm,
		//maneuvers: api_Maneuvers,
		power: api_Power,
		skillsLU: api_SkillsLU,
		species: api_Species,
		//weaponFocus: api_WeaponFocus,
		//weaponProperty: api_WeaponProperty,
		//weaponSupremacy: api_WeaponSupremacy
	}

	/* const apiData = {
		archetype: ArchetypeCall(),
		armorProperty: ArmorPropertyCall(),
		background: BackgroundCall(),
		class: ClassCall(),
		conditions: ConditionsCall(),
		enhancedItems: EnhancedItemCall(),
		equipment: EquipmentCall(),
		feat: FeatCall(),
		feature: FeatureCall(),
		fightingMastery: FightingMasteryCall(),
		fightingStyle: FightingStyleCall(),
		lightsaberForm: LightsaberFormCall(),
		maneuvers: ManeuversCall(),
		power: PowerCall(),
		skillsLU: SkillsCall(),
		species: SpeciesCall(),
		weaponFocus: WeaponFocusCall(),
		weaponProperty: WeaponPropertyCall(),
		weaponSupremacy: WeaponSupremacyCall()
	} */
	
	//----------------------------------------------------------------------------------------------
	// Calculate ability scores
	var species = character.species.name
	var speciesIncrease = []

	//set the base ability scores from the JSON
	var strength = charData.baseAbilityScores.Strength
	var dexterity = charData.baseAbilityScores.Dexterity
	var constitution = charData.baseAbilityScores.Constitution
	var intelligence = charData.baseAbilityScores.Intelligence
	var wisdom = charData.baseAbilityScores.Wisdom
	var charisma = charData.baseAbilityScores.Charisma

	if(isEmpty(charData.species.abilityScoreImprovement)) {
		//several species present a choice of ability score improvements
		//if there is data here, it means at least 1 increase is a choice
		//if no data is here, ability score increases are static for the species and we get it from the api

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
		//there is data in the species abilityScoreImprovement, so we need to determine which scores are static
		//and which scores are a choice
		for(let i = 0; i < api_Species.length; i++) {
	    	if (api_Species[i].name === species) {
		    	for(let j = 0; j < api_Species[i].abilitiesIncreased.length; j++) {
		    		for(let k = 0; k < api_Species[i].abilitiesIncreased[j].length; k++) {
		    			for(let l = 0; l < api_Species[i].abilitiesIncreased[j][k].abilities.length; l++) {
							if (api_Species[i].abilitiesIncreased[j][k].abilities.length === 1 && 
								api_Species[i].abilitiesIncreased[j][k].abilities[l].includes('Any') != true) {
									speciesIncrease.push({stat: api_Species[i].abilitiesIncreased[j][k].abilities[l], up: api_Species[i].abilitiesIncreased[j][k].amount})
							}
		    			}
		    		}
		    	}
		    }
	    }

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

		//add the choices to the base ability score and/or the species increase ability score
		strength = strength + (charData.species.abilityScoreImprovement.Strength ?? 0)
		dexterity = dexterity + (charData.species.abilityScoreImprovement.Dexterity ?? 0)
		constitution = constitution + (charData.species.abilityScoreImprovement.Constitution ?? 0)
		intelligence = intelligence + (charData.species.abilityScoreImprovement.Intelligence ?? 0)
		wisdom = wisdom + (charData.species.abilityScoreImprovement.Wisdom ?? 0)
		charisma = charisma + (charData.species.abilityScoreImprovement.Charisma ?? 0)
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
	
	//check for overrides from website character creator
	if (charData.tweaks?.abilityScores?.Strength?.score?.override) {strength = charData.tweaks?.abilityScores?.Strength?.score?.override}
	if (charData.tweaks?.abilityScores?.Dexterity?.score?.override) {dexterity = charData.tweaks?.abilityScores?.Dexterity?.score?.override}
	if (charData.tweaks?.abilityScores?.Constitution?.score?.override) {constitution = charData.tweaks?.abilityScores?.Constitution?.score?.override}
	if (charData.tweaks?.abilityScores?.Intelligence?.score?.override) {intelligence = charData.tweaks?.abilityScores?.Intelligence?.score?.override}
	if (charData.tweaks?.abilityScores?.Wisdom?.score?.override) {wisdom = charData.tweaks?.abilityScores?.Wisdom?.score?.override}
	if (charData.tweaks?.abilityScores?.Charisma?.score?.override) {charisma = charData.tweaks?.abilityScores?.Charisma?.score?.override}
	//---------------------------------------------------------------------------------------------------

	//find the character level by adding together all class levels --------------------------------------
	var charLevel = []
	var charProf = 0
	var charClasses = []

	for (let i = 0; i < charData.classes.length; i++) {
		charLevel.push(charData.classes[i].levels)
		charClasses.push({class: charData.classes[i].name, level: charData.classes[i].levels})
	}

	charLevel = charLevel.reduce((a, b) => a + b, 0)

	//calculate proficiency based on character level -----------------------------------------------------
	charProf = Math.ceil(charLevel / 4) + 1

	//determine character hit points --------------------------------------------------------------------
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

	//Used to control HP in header and modal -----------------------------------------------------------
	const currentHP = charHP - charData.currentStats.hitPointsLost
	const [hitPoints, setHitPoints] = useState(currentHP)

	useEffect(() => {
		setHitPoints(currentHP)
	}, [currentHP])

	//Used to control temporary and max hit points in modal ----------------------------------------------------
	const [tempHitPoints, setTempHitPoints] = useState(0)
	const [maxHP, setMaxHP] = useState(0) //controls max HP modifier
	const [maxHitPointsState, setMaxHitPointsState] = useState(charHP) //tracks maximum hit points changes

	useEffect(() => {
		setMaxHitPointsState(charHP)
	}, [charHP])

	//Used to control temporary and mad force/tech points in modal
	const [tempForcePoints, setTempForcePoints] = useState(0)
	const [maxForcePointsMod, setMaxForcePointsMod] = useState(0)

	const [tempTechPoints, setTempTechPoints] = useState(0)
	const [maxTechPointsMod, setMaxTechPointsMod] = useState(0)

	//Used to control credits on inventory screen and modal---------------------------------------------
	const currentCredits = charData.credits
	const [credits, setCredits] = useState(currentCredits)

	useEffect(() => {
		setCredits(currentCredits)
	}, [currentCredits])

	//base walking speed by species ---------------------------------------------------------------------
	var charSpeed = 0
	if (!isEmpty(api_Species)) {
		for (let i = 0; i < api_Species.length; i++) {
			if (api_Species[i].name === species) {
				for (let j = 0; j < api_Species[i].traits.length; j++) {
					if (api_Species[i].traits[j].name === 'Speed') {
						charSpeed = api_Species[i].traits[j].description.match(/\d+/)[0]
					}
				}
			}
		}
	}
	
	//set up conditions state for use in ConditionsModal -----------------------------------------------------
	
	const [conditionsState, setConditionsState] = useState([])

	useEffect(() => {
		const characterConditions = api_Conditions.map(el => (
			charData.currentStats.conditions.includes(el.name) ? {...el, afflicted: true, collapsed: true} : {...el, afflicted: false, collapsed: true}
		))
		setConditionsState(characterConditions)
	}, [api_Conditions, charData.currentStats.conditions])
	
	//object for exporting character information -------------------------------------------------------
	const characterInformation = {
		name: charData.name,
		proficiency: charProf,
		image: charData.image,
		hitPoints: charHP,
		hitPointsLost: charData.currentStats.hitPointsLost,
		speed: charSpeed,
		conditions: charData.currentStats.conditions,
		classes: charClasses,
		level: charLevel,
		background: charData.background,
		characteristics: charData.characteristics,
		credits: charData.credits
	}
	
	//object for exporting ability scores --------------------------------------------------------------
	const characterAbilities = {
		abilitiesStrength: strength,
		abilitiesDexterity: dexterity,
		abilitiesConstitution: constitution,
		abilitiesIntelligence: intelligence,
		abilitiesWisdom: wisdom,
		abilitiesCharisma: charisma
	}

	//object for exporting ability mods ----------------------------------------------------------------
    const characterMods = {
    	str_mod: modifier(characterAbilities.abilitiesStrength),
    	dex_mod: modifier(characterAbilities.abilitiesDexterity),
    	con_mod: modifier(characterAbilities.abilitiesConstitution),
    	int_mod: modifier(characterAbilities.abilitiesIntelligence),
    	wis_mod: modifier(characterAbilities.abilitiesWisdom),
    	cha_mod: modifier(characterAbilities.abilitiesCharisma)
    }
    
	// Saving Throws ------------------------------------------------------------------------------------
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
	
	//object to export saving throw scores ---------------------------------------------------------------
	const characterSaves = {
		characterSaves: charSave,
		str_save: strSave,
		dex_save: dexSave,
		con_save: conSave,
		int_save: intSave,
		wis_save: wisSave,
		cha_save: chaSave
	}

	// Feats ---------------------------------------------------------------------------------------------
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
			for (let j = 0; j < api_Archetype.length; j++) {
				if (api_Archetype[j].name === charData.classes[i].archetype?.name) {
					charArchetype.push(api_Archetype[j])
				}
			}
		}
	}

	//object to export character feat/archetype information -------------------------------------------------
	const characterFeats = {
		archetype: charArchetype,
		feats: charFeats
	}

	// Force -------------------------------------------------------------------------------------------------
	//calculate max force points
	var classLevel = ''
	//#region ForcePowerData
	let numOr0 = n => isNaN(n) ? 0 : n
	var maxForcePoints = []
	for(k = 0; k < charData.classes.length; k++) {
		if(isForceClass(charData.classes[k].name)) {
			classLevel = charData.classes[k].levels
			for(let j = 0; j < api_Class.length; j++) {
				if(api_Class[j].name === charData.classes[k].name) {
					maxForcePoints.push(parseInt((api_Class[j]["levelChanges"][classLevel]["Force Points"]), 10))
				}
			}
		}
	}
	maxForcePoints = maxForcePoints.reduce((a, b) => numOr0(a) + numOr0(b), 0)
	if(maxForcePoints != 0){
		maxForcePoints = maxForcePoints + Math.max(characterMods.wis_mod, characterMods.cha_mod)
	}

	const currentForcePoints = maxForcePoints - charData.currentStats.forcePointsUsed

	const [forcePointsState, setForcePointsState] = useState()

	useEffect(() => {
		setForcePointsState(currentForcePoints)
	}, [currentForcePoints])

	//get force powers known
	var forcePowers = []
	for (m = 0; m < charData.classes.length; m++) {
		if (isForceClass(charData.classes[m].name)) {
			for (let j = 0; j < charData.classes[m].forcePowers.length; j++) {
				forcePowers.push(charData.classes[m].forcePowers[j])
			}
		}
	}

	//gather api data about known force powers
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

	// Tech -----------------------------------------------------------------------------------------------
	//#region TechPowerData
	//calculate max tech points
	var maxTechPoints = []
	for(k = 0; k < charData.classes.length; k++) {
		if(isTechClass(charData.classes[k].name)) {
			classLevel = charData.classes[k].levels
			for(let j = 0; j < api_Class.length; j++) {
				if(api_Class[j].name === charData.classes[k].name) {
					maxTechPoints.push(parseInt((api_Class[j]["levelChanges"][classLevel]["Tech Points"]), 10))
				}
			}
		}
	}
	maxTechPoints = maxTechPoints.reduce((a, b) => numOr0(a) + numOr0(b), 0)
	if(maxTechPoints != 0){
		maxTechPoints = maxTechPoints + characterMods.int_mod
	}

	const currentTechPoints = maxTechPoints - charData.currentStats.techPointsUsed
	const [techPointsState, setTechPointsState] = useState()

	useEffect(() => {
		setTechPointsState(currentTechPoints)
	}, [currentTechPoints])

	//get tech powers known
	var techPowers = []
	for (m = 0; m < charData.classes.length; m++) {
		if (isTechClass(charData.classes[m].name)) {
			for (let j = 0; j < charData.classes[m].techPowers.length; j++) {
				techPowers.push(charData.classes[m].techPowers[j])
			}
		}
	}

	//gather api data about known tech powers
	var techPowersData = []
	for (i = 0; i < techPowers.length; i++) {
		if (api_Power != '') {	
			techPowersData.push(api_Power.filter(api_Power => {
				return api_Power.name === techPowers[i]
			
			}))
		}
	}
	techPowersData = techPowersData.flat()

	//used to track max force/tech points changes in modal
	const [maxForcePointsState, setMaxForcePointsState] = useState(maxForcePoints)
	const [maxTechPointsState, setMaxTechPointsState] = useState(maxTechPoints)

	useEffect(() => {
		setMaxForcePointsState(maxForcePoints)
	}, [maxForcePoints])

	useEffect(() => {
		setMaxTechPointsState(maxTechPoints)
	}, [maxTechPoints])

	//#endregion
	
	//object to export character casting information ------------------------------------------------------
	const characterCasting = {
		maxForcePoints: maxForcePoints,
		forcePowers: forcePowers,
		forcePowersData: forcePowersData,
		maxTechPoints: maxTechPoints,
		techPowers: techPowers,
		techPowersData: techPowersData
	}
	
	// Equipment -----------------------------------------------------------------------------------------
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

	//add custom equipment to full equipment data list
	equipmentData = equipmentData.flat().concat(charData.customEquipment)

	//flag custom equipment as such
	for (let i = 0; i < equipmentData.length; i++) {
		for (let j = 0; j < charData.customEquipment.length; j++) {
			if (equipmentData[i].name === charData.customEquipment[j].name) {
				equipmentData[i]["custom"] = true
			}
		}
	}

	//inject tweaks into equipment data
	for(let i = 0; i < equipmentData.length; i++) {
		for(let j = 0; j < tweakedEquipment.length; j++) {
			if (equipmentData[i].name === tweakedEquipment[j].name) {
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

	//determine AC --------------------------------------------------------------------------------------
	const [characterAC, setCharacterAC] = useState(0)
	var charAC = 0
	for(let i = 0; i < equipmentData.length; i++) {
		if (equipmentData[i].equipmentCategory === "Armor" && equipmentData[i].equipped === true) {
			switch (equipmentData[i].armorClassification) {
				case 'Light':
					charAC = parseInt(equipmentData[i].ac) + characterMods.dex_mod
					break
				case 'Medium':
					if (characterMods.dex_mod >= 2) {
						charAC = parseInt(equipmentData[i].ac) + 2
					} else {
						charAC = parseInt(equipmentData[i].ac) + characterMods.dex_mod
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

	if (charAC < 10) {
		charAC = 10 + characterMods.dex_mod
	}

	useEffect(() => {
		setCharacterAC(charAC)
	}, [charAC])

	const getCharacterAC = (updatedEquipment) => {
		//check to see if there is already armor equipped
		var equippedArmorCount = 0
		for (let i = 0; i < updatedEquipment.length; i++) {
			if (updatedEquipment[i].equipmentCategory === "Armor" 
				&& updatedEquipment[i].equipped === true
				&& updatedEquipment[i].armorClassification != 'Shield') {
				equippedArmorCount+=1
			}
		}
		//if trying to equip more than one armor at a time, alert and exit
		if (equippedArmorCount >1) {
			Alert.alert('You alread have armor equipped. To equip this armor, unequip the other.')
			return 'OverArmored'
		}

		if (updatedEquipment != undefined) {
			var charAC = 0
				for(let i = 0; i < updatedEquipment.length; i++) {
					if (updatedEquipment[i].equipmentCategory === "Armor" && updatedEquipment[i].equipped === true) {
						switch (updatedEquipment[i].armorClassification) {
							case 'Light':
								charAC = parseInt(updatedEquipment[i].ac) + characterMods.dex_mod
								break
							case 'Medium':
								if (characterMods.dex_mod >= 2) {
									charAC = parseInt(updatedEquipment[i].ac) + 2
								} else {
									charAC = parseInt(updatedEquipment[i].ac) + characterMods.dex_mod
								}
								break
							case 'Heavy':
								charAC = updatedEquipment[i].ac
								break
						}
						if (updatedEquipment[i].armorClassification === 'Shield') {
							charAC = charAC + parseInt(updatedEquipment[i].ac)
						}
					}
				}

			if (charAC < 10) {
				charAC = 10 + characterMods.dex_mod
			}

			setCharacterAC(charAC)
		}
	}
	
	//object to export equipment data --------------------------------------------------------------------
	const characterEquipment = {
		equipment: equipmentData,
		armorClass: characterAC,
		getCharacterAC: getCharacterAC
	}

	const [equippable, setEquippable] = useState(equipmentData)

	const [shortRestDice, setShortRestDice] = useState([])
	const [shortRestHitDice, setShortRestHitDice] = useState([])
	const [shortRestHitDiceUsed, setShortRestHitDiceUsed] = useState([{class: '', numDice: 0}])
	
	//Proficiencies---------------------------------------------------------------------------------------
	const [armorProficient, setArmorProficient] = useState()
	
	//parse proficiencies from classes and only get the type ('light' vs 'light armor')
	const armorProfs = new Set()
	for (let i = 0; i < charData.classes.length; i++) {
		for (let j = 0; j < api_Class.length; j++) {
			if (charData.classes[i].name === api_Class[j].name) {
				for (let k = 0; k < api_Class[j].armorProficiencies.length; k++) {
					if (api_Class[j].armorProficiencies[k] === 'All armor') {
						armorProfs.add('Light')
						armorProfs.add('Medium')
						armorProfs.add('Heavy')
					} else {
						armorProfs.add(getArmorProficiencies(api_Class[j].armorProficiencies[k]))
					}
				}
			}
		}
	}

	useEffect(() => {
		const equippedArmor = new Set()
		equippable.map(el => {
			//first, get the equipped status of all armor as boolean (determines if armor is equipped at all)
			if (el.equipmentCategory === 'Armor') {
				equippedArmor.add(el.equipped)
			}
			//then, if true is in the set, move forward with determining armor proficiency
			if (equippedArmor.has(true)) {
				//if the armor is custom, do nothing (this will have to be tweaked if better data)
				if (el.custom === true) {
					return
				}
				//if the equipped armor is not a shield, set proficiency for armor
				if (el.equipped === true && el.equipmentCategory === 'Armor' && el.armorClassification !== 'Shield') {
					if (armorProfs.has(el.armorClassification)) {
						setArmorProficient(true)
					} else {
						setArmorProficient(false)
					}
				} else if (el.equipped === true && el.armorclassification === 'Shield') { //it's a shield
					if (el.name.includes('Light')) { //it's a light shield
						if (armorProfs.has('Light')) {
							setArmorProficient(true)
						} else {
							setArmorProficient(false)
						}
					} else if (el.name.includes('Medium')) { //it's a medium shield
						if (armorProfs.has('Medium')) {
							setArmorProficient(true)
						} else {
							setArmorProficient(false)
						}
					} else if (el.name.includes('Heavy')) { //it's a heavy shield
						if (armorProfs.has('Heavy')) {
							setArmorProficient(true)
						} else {
							setArmorProficient(false)
						}
					}
				}
			} else { //if no armor is equipped, set the proficiency to true
				setArmorProficient(true)
			}
		})
	}, [equippable])

	console.log("Render")

	return <CharacterContext.Provider value={{
		character, setCharacter, 
		hitPoints, setHitPoints, 
		tempHitPoints, setTempHitPoints,
		maxHitPointsState, setMaxHitPointsState,
		maxHP, setMaxHP,
		tempForcePoints, setTempForcePoints,
		maxForcePointsMod, setMaxForcePointsMod,
		tempTechPoints, setTempTechPoints,
		maxTechPointsMod, setMaxTechPointsMod,
		maxForcePointsState, setMaxForcePointsState,
		maxTechPointsState, setMaxTechPointsState,
		credits, setCredits,
		equippable, setEquippable,
		characterAC, setCharacterAC,
		forcePointsState, setForcePointsState,
		techPointsState, setTechPointsState,
		conditionsState, setConditionsState,
		shortRestDice, setShortRestDice,
		shortRestHitDice, setShortRestHitDice,
		shortRestHitDiceUsed, setShortRestHitDiceUsed,
		characterInformation, 
		characterAbilities, 
		characterMods, 
		characterSaves, 
		characterFeats, 
		characterCasting, 
		apiData, 
		characterEquipment, 
		armorProfs,
		armorProficient, setArmorProficient,
		functions}}>
		{children}
	</CharacterContext.Provider>
}

export default CharacterContext
