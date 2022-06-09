import React from 'react'
import charData from '../../data/jalenOrso2'

const CharacterContext = React.createContext()

export const CharacterProvider = ({children}) => {
	const characterData = charData

	return <CharacterContext.Provider value={characterData}>
		{children}
	</CharacterContext.Provider>
}

export default CharacterContext
