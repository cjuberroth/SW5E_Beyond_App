import React from 'react'
import charAbilities from '../../data/jalenOrso'

const SkillsContext = React.createContext()

export const SkillsProvider = ({children}) => {
	const characterAbilities = charAbilities

	return <SkillsContext.Provider value={characterAbilities}>
		{children}
	</SkillsContext.Provider>
}

export default SkillsContext