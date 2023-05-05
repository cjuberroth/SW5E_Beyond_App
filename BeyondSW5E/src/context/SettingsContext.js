import React, { useEffect, useState } from 'react'
import { StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SettingsContext = React.createContext()
    
export const SettingsProvider = ({children}) => {
    //emblem is the uri string to the image
    const [emblem, setEmblem] = useState()
	//emblemText is what should be displayed for the user to show which emblem is current
    const [emblemText, setEmblemText] = useState('')
	
	const rebelAlliance = require('../../assets/rebel_alliance.png')
	const sourceRebel = Image.resolveAssetSource(rebelAlliance)
	const galacticEmpire = require('../../assets/galactic-empire.png')
	const sourceEmpire = Image.resolveAssetSource(galacticEmpire)
	/* const galacticRepublic = 
	const jediOrder = 
	const oldRepublic = 
	const phoenixSquad = 
	const newRepublic = 
	const firstOrder = 
	const tradeFederation = 
	const sith = 
	const clanFett = 
	const deathWatch = 
	const pykeSynidcate =  */

	//if an emblem is stored already, set it
	useEffect(() => {
		AsyncStorage.getItem('emblem').then((value) => {
			setEmblem(value)
		})
	}, [emblem])

	//if an emblem is stored already, set its text
	useEffect(() => {
		AsyncStorage.getItem('emblemText').then((value) => {
			updateEmblemText(value)
		})
	}, [emblemText])

	//translate the camel-case to the proper faction name
	const updateEmblemText = (emblemImage) => {
		switch (emblemImage) {
			case 'rebelAlliance':
				setEmblemText('Rebel Alliance')
				break
			case 'galacticEmpire':
				setEmblemText('Galactic Empire')
				break
			default:
				setEmblemText('')
		}
	}

	//update the image uri
	const updateEmblem = (emblemImage) => {
		switch (emblemImage) {
			case 'rebelAlliance': 
				AsyncStorage.setItem('emblem', sourceRebel.uri.toString())
				setEmblem(sourceRebel.uri.toString())
				break
			case 'galacticEmpire':
				AsyncStorage.setItem('emblem', sourceEmpire.uri.toString())
				setEmblem(sourceEmpire.uri.toString())
				break
			default:
				setEmblem('')
		}
	}

    return <SettingsContext.Provider value={{
        emblem, setEmblem,
        emblemText, setEmblemText,
        updateEmblem, updateEmblemText}}>
        {children}
    </SettingsContext.Provider>

}

const styles = StyleSheet.create({
    
})

export default SettingsContext