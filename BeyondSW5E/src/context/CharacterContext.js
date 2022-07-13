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
	const charSpecies = character
	const charAbilities = character
	const charProficiency = character
	const charClass = character

	const isEmpty = (obj) => {
		return Object.keys(obj).length === 0
	}

	const [characterSpecies, setCharacterSpecies] = useState([])
	const [characterClass, setCharacterClass] = useState([])

	const searchApi = async () => {
        var response = await swapi.get('/species')
        setCharacterSpecies(response.data)
        var response2 = await swapi.get('/class')
        setCharacterClass(response2.data)
    }

    useEffect(() => { searchApi() }, [])

	if(isEmpty(charSpecies.species.abilityScoreImprovement)) {

		var species = charSpecies.species.name
		var speciesIncrease = []

	    for(let i = 0; i < characterSpecies.length; i++) {
	    	if (characterSpecies[i].name === species) {
		    	for(let j = 0; j < characterSpecies[i].abilitiesIncreased.length; j++) {
		    		for(let k = 0; k < characterSpecies[i].abilitiesIncreased[j].length; k++) {
		    			for(let l = 0; l < characterSpecies[i].abilitiesIncreased[j][k].abilities.length; l++) {
		    				speciesIncrease.push({stat: characterSpecies[i].abilitiesIncreased[j][k].abilities[l], up: characterSpecies[i].abilitiesIncreased[j][k].amount})
		    			}
		    		}
		    	}
		    }
	    }

	    var strength = charAbilities.baseAbilityScores.Strength
		var dexterity = charAbilities.baseAbilityScores.Dexterity
		var constitution = charAbilities.baseAbilityScores.Constitution
		var intelligence = charAbilities.baseAbilityScores.Intelligence
		var wisdom = charAbilities.baseAbilityScores.Wisdom
		var charisma = charAbilities.baseAbilityScores.Charisma

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
		var strength = charAbilities.baseAbilityScores.Strength + (charAbilities.species.abilityScoreImprovement.Strength ?? 0)
		var dexterity = charAbilities.baseAbilityScores.Dexterity + (charAbilities.species.abilityScoreImprovement.Dexterity ?? 0)
		var constitution = charAbilities.baseAbilityScores.Constitution + (charAbilities.species.abilityScoreImprovement.Constitution ?? 0)
		var intelligence = charAbilities.baseAbilityScores.Intelligence + (charAbilities.species.abilityScoreImprovement.Intelligence ?? 0)
		var wisdom = charAbilities.baseAbilityScores.Wisdom + (charAbilities.species.abilityScoreImprovement.Wisdom ?? 0)
		var charisma = charAbilities.baseAbilityScores.Charisma + (charAbilities.species.abilityScoreImprovement.Charisma ?? 0)
	}

	var strengthIncrease = 0
	var dexterityIncrease = 0
	var constitutionIncrease = 0
	var intelligenceIncrease = 0
	var wisdomIncrease = 0
	var charismaIncrease = 0

	for(let i = 0; i < charAbilities.classes.length; i++) {
		for (let y = 0; y < charAbilities.classes[i].abilityScoreImprovements.length; y++) {
			if(charAbilities.classes[i].abilityScoreImprovements[y].type === "Ability Score Improvement") {
				for (let j = 0; j < charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased.length; j++) {
					switch (charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].name) {
						case 'Strength':
							strengthIncrease = strengthIncrease + charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
						case 'Dexterity':
							dexterityIncrease = dexterityIncrease + charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
						case 'Constitution':
							constitutionIncrease = constitutionIncrease + charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
						case 'Intelligence':
							intelligenceIncrease = intelligenceIncrease + charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
						case 'Wisdom':
							wisdomIncrease = wisdomIncrease + charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
						case 'Charisma':
							charismaIncrease = charismaIncrease + charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
							break
					}
				}
			}
		}
	}

	//calculate ability score
	strength = strength + (strengthIncrease ?? 0)
	dexterity = dexterity + (dexterityIncrease ?? 0)
	constitution = constitution + (constitutionIncrease ?? 0)
	intelligence = intelligence + (intelligenceIncrease ?? 0)
	wisdom = wisdom + (wisdomIncrease ?? 0)
	charisma = charisma + (charismaIncrease ?? 0)

	//find the character level by adding together all class levels
	var charLevel = []
	var charProf = 0

	for (let i = 0; i < charProficiency.classes.length; i++) {
		charLevel.push(charProficiency.classes[i].levels)
	}

	charLevel = charLevel.reduce((a, b) => a + b, 0)

	//calculate proficiency based on character level
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

	//check for overrides
	if (charAbilities.tweaks?.abilityScores?.Strength?.score?.override) {strength = charAbilities.tweaks?.abilityScores?.Strength?.score?.override}
	if (charAbilities.tweaks?.abilityScores?.Dexterity?.score?.override) {dexterity = charAbilities.tweaks?.abilityScores?.Dexterity?.score?.override}
	if (charAbilities.tweaks?.abilityScores?.Constitution?.score?.override) {constitution = charAbilities.tweaks?.abilityScores?.Constitution?.score?.override}
	if (charAbilities.tweaks?.abilityScores?.Intelligence?.score?.override) {intelligence = charAbilities.tweaks?.abilityScores?.Intelligence?.score?.override}
	if (charAbilities.tweaks?.abilityScores?.Wisdom?.score?.override) {wisdom = charAbilities.tweaks?.abilityScores?.Wisdom?.score?.override}
	if (charAbilities.tweaks?.abilityScores?.Charisma?.score?.override) {charisma = charAbilities.tweaks?.abilityScores?.Charisma?.score?.override}

	const characterAbilities = {
		abilitiesStrength: strength,
		abilitiesDexterity: dexterity,
		abilitiesConstitution: constitution,
		abilitiesIntelligence: intelligence,
		abilitiesWisdom: wisdom,
		abilitiesCharisma: charisma,
		prof: charProf,
		name: charAbilities.name
	}

	const modifier = function(ability) {
        return Math.floor((ability-10)/2)
    }

    const characterSkills = {
    	str_mod: modifier(characterAbilities.abilitiesStrength),
    	dex_mod: modifier(characterAbilities.abilitiesDexterity),
    	con_mod: modifier(characterAbilities.abilitiesConstitution),
    	int_mod: modifier(characterAbilities.abilitiesIntelligence),
    	wis_mod: modifier(characterAbilities.abilitiesWisdom),
    	cha_mod: modifier(characterAbilities.abilitiesCharisma)
    }

    //get first class's saving throw proficiency(ies)
	if(!isEmpty(characterClass)){
		for(let i = 0; i < characterClass.length; i++){
			if (characterClass[i].name === charClass.classes[0].name) {
				var charSave = characterClass[i].savingThrows
			}
		}
	}

    //calculate saves
	if(charSave) {
		if (charSave.includes("Strength")) {
			var strSave = characterSkills.str_mod + charProf
		} else {
			var strSave = characterSkills.str_mod
		}
		if (charSave.includes("Dexterity")) {
			var dexSave = characterSkills.dex_mod + charProf
		} else {
			var dexSave = characterSkills.dex_mod
		}
		if (charSave.includes("Constitution")) {
			var conSave = characterSkills.con_mod + charProf
		} else {
			var conSave = characterSkills.con_mod
		}
		if (charSave.includes("Intelligence")) {
			var intSave = characterSkills.int_mod + charProf
		} else {
			var intSave = characterSkills.int_mod
		}
		if (charSave.includes("Wisdom")) {
			var wisSave = characterSkills.wis_mod + charProf
		} else {
			var wisSave = characterSkills.wis_mod
		}
		if (charSave.includes("Charisma")) {
			var chaSave = characterSkills.cha_mod + charProf
		} else {
			var chaSave = characterSkills.cha_mod
		}
	}
	
	const characterSaves = {
		str_save: strSave,
		dex_save: dexSave,
		con_save: conSave,
		int_save: intSave,
		wis_save: wisSave,
		cha_save: chaSave
	}

	return <CharacterContext.Provider value={{character, setCharacter, characterAbilities, characterSkills, characterSaves}}>
		{children}
	</CharacterContext.Provider>
}

export default CharacterContext
