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
	const sourceRebelAlliance = Image.resolveAssetSource(rebelAlliance)
	const galacticEmpire = require('../../assets/galactic_empire.png')
	const sourceGalacticEmpire = Image.resolveAssetSource(galacticEmpire)
	const galacticRepublic = require('../../assets/galactic-republic.png')
	const sourceGalacticRepublic = Image.resolveAssetSource(galacticRepublic)
	const jediOrder = require('../../assets/jedi-order.png')
	const sourceJediOrder = Image.resolveAssetSource(jediOrder)
	//const oldRepublic = 
	//const phoenixSquad = 
	//const newRepublic = 
	const firstOrder = require('../../assets/first-order-2.png')
	const sourceFirstOrder = Image.resolveAssetSource(firstOrder)
	//const tradeFederation = 
	//const sith = 
	const clanFett = require('../../assets/mandalorian.png')
	const sourceMandalorian = Image.resolveAssetSource(clanFett)
	const deathWatch = require('../../assets/death-watch.png')
	const sourceDeathWatch = Image.resolveAssetSource(deathWatch)
	//const pykeSynidcate = 

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
			case 'galacticRepublic':
				setEmblemText('Galactic Republic')
				break
			case 'jediOrder':
				setEmblemText('Jedi Order')
				break
			case 'firstOrder':
				setEmblemText('First Order')
				break
			case 'clanFett':
				setEmblemText('Mandalorian')
				break
			case 'deathWatch':
				setEmblemText('Death Watch')
				break
			default:
				setEmblemText('')
		}
	}

	//update the image uri
	const updateEmblem = (emblemImage) => {
		switch (emblemImage) {
			case 'rebelAlliance': 
				AsyncStorage.setItem('emblem', sourceRebelAlliance.uri.toString())
				setEmblem(sourceRebelAlliance.uri.toString())
				break
			case 'galacticEmpire':
				AsyncStorage.setItem('emblem', sourceGalacticEmpire.uri.toString())
				setEmblem(sourceGalacticEmpire.uri.toString())
				break
			case 'galacticRepublic':
				AsyncStorage.setItem('emblem', sourceGalacticRepublic.uri.toString())
				setEmblem(sourceGalacticRepublic.uri.toString())
				break
			case 'jediOrder':
				AsyncStorage.setItem('emblem', sourceJediOrder.uri.toString())
				setEmblem(sourceJediOrder.uri.toString())
				break
			case 'firstOrder':
				AsyncStorage.setItem('emblem', sourceFirstOrder.uri.toString())
				setEmblem(sourceFirstOrder.uri.toString())
				break
			case 'clanFett':
				AsyncStorage.setItem('emblem', sourceMandalorian.uri.toString())
				setEmblem(sourceMandalorian.uri.toString())
				break
			case 'deathWatch':
				AsyncStorage.setItem('emblem', sourceDeathWatch.uri.toString())
				setEmblem(sourceDeathWatch.uri.toString())
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