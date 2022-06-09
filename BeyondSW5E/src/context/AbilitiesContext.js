import React, { useState, useContext } from 'react'
import CharacterContext from './CharacterContext'

const AbilitiesContext = React.createContext()

export const AbilitiesProvider = ({children}) => {

	const charAbilities = useContext(CharacterContext)
	const charProficiency = useContext(CharacterContext)

	const [strength, setStrength] = useState(charAbilities.baseAbilityScores.Strength + (charAbilities.species.abilityScoreImprovement.Strength ?? 0))
	const [dexterity, setDexterity] = useState(charAbilities.baseAbilityScores.Dexterity + (charAbilities.species.abilityScoreImprovement.Dexterity ?? 0))
	const [constitution, setConstitution] = useState(charAbilities.baseAbilityScores.Constitution + (charAbilities.species.abilityScoreImprovement.Constitution ?? 0))
	const [intelligence, setIntelligence] = useState(charAbilities.baseAbilityScores.Intelligence + (charAbilities.species.abilityScoreImprovement.Intelligence ?? 0))
	const [wisdom, setWisdom] = useState(charAbilities.baseAbilityScores.Wisdom + (charAbilities.species.abilityScoreImprovement.Wisdom ?? 0))
	const [charisma, setCharisma] = useState(charAbilities.baseAbilityScores.Charisma + (charAbilities.species.abilityScoreImprovement.Charisma ?? 0))

	/*const [strengthIncrease, setStrengthIncrease] = useState(0)
	const [dexterityIncrease, setDexterityIncrease] = useState(0)
	const [constitutionIncrease, setConstitutionIncrease] = useState(0)
	const [intelligenceIncrease, setIntelligenceIncrease] = useState(0)
	const [wisdomIncrease, setWisdomIncrease] = useState(0)
	const [charismaIncrease, setCharismaIncrease] = useState(0)*/

	for (let i = 0; i < charAbilities.classes.length; i++) {
		for (let y = 0; y < charAbilities.classes[i].abilityScoreImprovements.length; y++) {
			// if check to see that the object's type value is Ability Score Improvement and continue if not
			for (let j = 0; j < charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased.length; j++) {
				switch (charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].name) {
					case 'Strength':
						//setStrengthIncrease(charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value)
						var strengthIncrease = charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
						break
					case 'Dexterity':
						//setDexterityIncrease(charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value)
						var dexterityIncrease = charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
						break
					case 'Constitution':
						//setConstitutionIncrease(charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value)
						var constitutionIncrease = charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
						break
					case 'Intelligence':
						//setIntelligenceIncrease(charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value)
						var intelligenceIncrease = charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
						break
					case 'Wisdom':
						//setWisdomIncrease(charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value)
						var wisdomIncrease = charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
						break
					case 'Charisma':
						//setCharismaIncrease(charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value)
						var charismaIncrease = charAbilities.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
						break
				}
			}
		}
	}

	var classLevel = []
	var charProf = 0

	for (let i = 0; i < charProficiency.classes.length; i++) {
		classLevel.push(charProficiency.classes[i].levels)
	}

	//console.log(Math.max(...classLevel))
	classLevel = Math.max(...classLevel)

	switch (true) {
		case (classLevel < 5):
			charProf = 2
			break
		case (classLevel < 9):
			charProf = 3
			break
		case (classLevel < 13):
			charProf = 4
			break
		case (classLevel < 17):
			charProf = 5
			break
		case (classLevel < 21):
			charProf = 6
			break
	}

	//console.log("Proficiency: " + charProf)

	const characterAbilities = {
		abilitiesStrength: strength + (strengthIncrease ?? 0),
		abilitiesDexterity: dexterity + (dexterityIncrease ?? 0),
		abilitiesConstitution: constitution + (constitutionIncrease ?? 0),
		abilitiesIntelligence: intelligence + (intelligenceIncrease ?? 0),
		abilitiesWisdom: wisdom + (wisdomIncrease ?? 0),
		abilitiesCharisma: charisma + (charismaIncrease ?? 0),
		prof: charProf
	}
	
	return <AbilitiesContext.Provider value={characterAbilities}>
		{children}
	</AbilitiesContext.Provider>
}

export default AbilitiesContext
