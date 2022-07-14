/*
import React, { useState, useContext } from 'react'
import AbilitiesContext from './AbilitiesContext'
import CharacterContext from './CharacterContext'

const SkillsContext = React.createContext()

export const SkillsProvider = ({children}) => {
	
	//const characterAbilities = useContext(AbilitiesContext)
	const characterAbilities = useContext(CharacterContext)

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

	return <SkillsContext.Provider value={characterSkills}>
		{children}
	</SkillsContext.Provider>
}

export default SkillsContext
*/