import React from 'react'
import charData from '../../data/miltox'

const CharacterContext = React.createContext()

export const CharacterProvider = ({children}) => {
	const characterData = charData

	return <CharacterContext.Provider value={characterData}>
		{children}
	</CharacterContext.Provider>
}

export default CharacterContext
