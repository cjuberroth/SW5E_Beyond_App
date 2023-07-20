import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SettingsContext = React.createContext()
    
const SettingsProvider = ({children}) => {
    //emblem is the uri string to the image
    const [emblem, setEmblem] = useState()
	//emblemText is what should be displayed for the user to show which emblem is current
    const [emblemText, setEmblemText] = useState('')
	const [alignment, setAlignment] = useState('')
	const [diceRollSound, setDiceRollSound] = useState()
	
	const rebelAlliance = require('../../assets/rebel_alliance.png')
	const sourceRebelAlliance = Image.resolveAssetSource(rebelAlliance)
	const galacticEmpire = require('../../assets/galactic_empire.png')
	const sourceGalacticEmpire = Image.resolveAssetSource(galacticEmpire)
	const galacticRepublic = require('../../assets/galactic-republic.png')
	const sourceGalacticRepublic = Image.resolveAssetSource(galacticRepublic)
	const jediOrder = require('../../assets/jedi-order.png')
	const sourceJediOrder = Image.resolveAssetSource(jediOrder)
	const oldRepublic = require('../../assets/old-republic.png')
	const sourceOldRepublic = Image.resolveAssetSource(oldRepublic) 
	const phoenixSquad = require('../../assets/phoenix-squad.png')
	const sourcePhoenixSquad = Image.resolveAssetSource(phoenixSquad) 
	const newRepublic = require('../../assets/new-republic.png')
	const sourceNewRepublic = Image.resolveAssetSource(newRepublic) 
	const firstOrder = require('../../assets/first-order-2.png')
	const sourceFirstOrder = Image.resolveAssetSource(firstOrder)
	const tradeFederation = require('../../assets/trade-federation.png')
	const sourceTradeFederation = Image.resolveAssetSource(tradeFederation) 
	const sith = require('../../assets/sith.png')
	const sourceSith = Image.resolveAssetSource(sith) 
	const clanFett = require('../../assets/mandalorian.png')
	const sourceMandalorian = Image.resolveAssetSource(clanFett)
	const deathWatch = require('../../assets/death-watch.png')
	const sourceDeathWatch = Image.resolveAssetSource(deathWatch)
	const pykeSyndicate = require('../../assets/pyke-syndicate.png')
	const sourcePykeSyndicate = Image.resolveAssetSource(pykeSyndicate) 

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

	//if alignment is already stored, set it
	useEffect(() => {
		AsyncStorage.getItem('alignment').then((value) => {
			setAlignment(value)
		})
	}, [alignment])

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
			case 'oldRepublic':
				setEmblemText('Old Republic')
				break
			case 'phoenixSquad':
				setEmblemText('Phoenix Squad')
				break
			case 'newRepublic':
				setEmblemText('New Republic')
				break
			case 'firstOrder':
				setEmblemText('First Order')
				break
			case 'tradeFederation':
				setEmblemText('Trade Federation')
				break
			case 'sith':
				setEmblemText('Sith')
				break
			case 'clanFett':
				setEmblemText('Mandalorian')
				break
			case 'deathWatch':
				setEmblemText('Death Watch')
				break
			case 'pykeSyndicate':
				setEmblemText('Pyke Syndicate')
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
			case 'oldRepublic':
				AsyncStorage.setItem('emblem', sourceOldRepublic.uri.toString())
				setEmblem(sourceOldRepublic.uri.toString())
				break
			case 'phoenixSquad':
				AsyncStorage.setItem('emblem', sourcePhoenixSquad.uri.toString())
				setEmblem(sourcePhoenixSquad.uri.toString())
				break
			case 'newRepublic':
				AsyncStorage.setItem('emblem', sourceNewRepublic.uri.toString())
				setEmblem(sourceNewRepublic.uri.toString())
				break
			case 'firstOrder':
				AsyncStorage.setItem('emblem', sourceFirstOrder.uri.toString())
				setEmblem(sourceFirstOrder.uri.toString())
				break
			case 'tradeFederation':
				AsyncStorage.setItem('emblem', sourceTradeFederation.uri.toString())
				setEmblem(sourceTradeFederation.uri.toString())
				break
			case 'sith':
				AsyncStorage.setItem('emblem', sourceSith.uri.toString())
				setEmblem(sourceSith.uri.toString())
				break
			case 'clanFett':
				AsyncStorage.setItem('emblem', sourceMandalorian.uri.toString())
				setEmblem(sourceMandalorian.uri.toString())
				break
			case 'deathWatch':
				AsyncStorage.setItem('emblem', sourceDeathWatch.uri.toString())
				setEmblem(sourceDeathWatch.uri.toString())
				break
			case 'pykeSyndicate':
				AsyncStorage.setItem('emblem', sourcePykeSyndicate.uri.toString())
				setEmblem(sourcePykeSyndicate.uri.toString())
				break
			default:
				setEmblem('')
		}
	}

	let alignmentSettings = {}
	if (alignment === 'Light') {
		alignmentSettings = {
			tabIndicatorColor: '#15f2fd',
			d20Color: 'rgba(21, 242, 253, 0.4)',
			headerButtonColor: 'rgba(21, 242, 253, 0.1)',
			creditsButtonColor: 'rgba(21, 242, 253, 0.1)',
			inspirationButtonColor: '#15f2fd'
		}
	} else if (alignment === 'Dark') {
		alignmentSettings = {
			tabIndicatorColor: '#EB212E',
			d20Color: 'rgba(235, 33, 46, 0.4)',
			headerButtonColor: 'rgba(235, 33, 46, 0.1)',
			creditsButtonColor: 'rgba(235, 33, 46, 0.1)',
			inspirationButtonColor: '#EB212E'
		}
	} else {
		alignmentSettings = {
			tabIndicatorColor: '#ffe81f',
			d20Color: 'rgba(255, 232, 31, 0.4)',
			headerButtonColor: 'rgba(255, 232, 31, 0.1)',
			creditsButtonColor: 'rgba(255, 232, 31, 0.1)',
			inspirationButtonColor: '#ffe81f'
		}
	}

	//console.log('SettingsContext Render')

    return <SettingsContext.Provider value={{
        emblem, setEmblem,
        emblemText, setEmblemText,
        updateEmblem, updateEmblemText,
		alignment, setAlignment,
		diceRollSound, setDiceRollSound,
		alignmentSettings
		}}>
        {children}
    </SettingsContext.Provider>

}

const useSettingsContext = () => useContext(SettingsContext)

const styles = StyleSheet.create({
    
})

//export default SettingsContext
export { SettingsProvider, useSettingsContext }