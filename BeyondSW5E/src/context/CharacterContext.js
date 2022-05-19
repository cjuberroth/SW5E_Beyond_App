import React from 'react'
import charAbilities from '../../data/jalenOrso'

const CharacterContext = React.createContext()

export const CharacterProvider = ({children}) => {
	const characterAbilities = charAbilities

	return <CharacterContext.Provider value={characterAbilities}>
		{children}
	</CharacterContext.Provider>
}

export default CharacterContext