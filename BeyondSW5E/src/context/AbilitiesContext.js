import React from 'react'
import charAbilities from '../../data/jalenOrso2'

const AbilitiesContext = React.createContext()

export const AbilitiesProvider = ({children}) => {

	//console.log(charAbilities.classes)
	const classes = charAbilities.classes
	const test = classes.map((testClass) => {
		console.log(testClass.abilityScoreImprovements.abilitiesIncreased)
	})

	const abilitiesDexterity = charAbilities.baseAbilityScores.Dexterity + charAbilities.species.abilityScoreImprovement.Dexterity
	const characterAbilities = {
		abilitiesStrength: charAbilities.baseAbilityScores.Strength,
		abilitiesDexterity: abilitiesDexterity
	}
	return <AbilitiesContext.Provider value={characterAbilities}>
		{children}
	</AbilitiesContext.Provider>
}

export default AbilitiesContext