import React, { useState } from 'react'
import charAbilities from '../../data/jalenOrso2'
import jalenOrso from '../../data/jalenOrso2'
import archifamel from '../../data/archifamel'
import dauBon from '../../data/dauBon'
import miltox from '../../data/miltox'
import theebisRoh from '../../data/theebisRoh'
import trevalla from '../../data/trevalla'

const CharacterContext = React.createContext({
	character: charAbilities,
	setCharacter: (char) => {}
})

export const CharacterProvider = ({children}) => {
	const [character, setCharacter] = useState(charAbilities)

	return <CharacterContext.Provider value={{character, setCharacter}}>
		{children}
	</CharacterContext.Provider>
}

export default CharacterContext
