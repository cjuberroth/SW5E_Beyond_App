import React, { useState } from 'react'
import charAbilities from '../../data/jalenOrso2'
import jalenOrso from '../../data/jalenOrso2'
import archifamel from '../../data/archifamel'
import dauBon from '../../data/dauBon'
import miltox from '../../data/miltox'
import theebisRoh from '../../data/theebisRoh'
import trevalla from '../../data/trevalla'

const CharacterContext = React.createContext()

export const CharacterProvider = ({children}) => {
	const [character, setCharacter] = useState(charAbilities)
	const characterAbilities = charAbilities
	//const characterAbilities = character

	return <CharacterContext.Provider value={character}>
		{children}
	</CharacterContext.Provider>
}

export default CharacterContext