import React, { useState, useContext } from 'react'
import AbilitiesContext from './AbilitiesContext'

const SkillsContext = React.createContext()

export const SkillsProvider = ({children}) => {
	
	const characterAbilities = useContext(AbilitiesContext)
	const [strengthMod, setStrengthMod] = useState(characterAbilities.abilitiesStrength)
	const [dexterityMod, setDexterityMod] = useState(characterAbilities.abilitiesDexterity)
	const [constitutionMod, setConstitutionMod] = useState(characterAbilities.abilitiesConstitution)
	const [intelligenceMod, setIntelligenceMod] = useState(characterAbilities.abilitiesIntelligence)
	const [wisdomMod, setWisdomMod] = useState(characterAbilities.abilitiesWisdom)
	const [charismaMod, setCharismaMod] = useState(characterAbilities.abilitiesCharisma)

	const modifier = function(ability) {
        return Math.floor((ability-10)/2)
    }

    /*console.log('strength Mod: ' + modifier(strengthMod))
    console.log('dexterity Mod: ' + modifier(dexterityMod))
    console.log('constitution Mod: ' + modifier(constitutionMod))
    console.log('intelligence Mod: ' + modifier(intelligenceMod))
    console.log('wisdom Mod: ' + modifier(wisdomMod))
    console.log('charisma Mod: ' + modifier(charismaMod))*/

    const characterSkills = {
    	str_mod: modifier(strengthMod),
    	dex_mod: modifier(dexterityMod),
    	con_mod: modifier(constitutionMod),
    	int_mod: modifier(intelligenceMod),
    	wis_mod: modifier(wisdomMod),
    	cha_mod: modifier(charismaMod)
    }

	return <SkillsContext.Provider value={characterSkills}>
		{children}
	</SkillsContext.Provider>
}

export default SkillsContext
