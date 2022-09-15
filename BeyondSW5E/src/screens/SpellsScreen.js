import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { DataTable } from 'react-native-paper'
import DuoToggleSwitch from "react-native-duo-toggle-switch"
import CharacterContext from '../context/CharacterContext'
import PowerTable from '../components/PowerTable'

/*
    This screen will need to be modified to accomodate the difference between force and tech powers
    Additionally, there are several comments below which identify the need to paramaterize several
    other values which come from character data and the api
*/

const SpellsScreen = () => {
    const charData = useContext(CharacterContext).character
    const proficiency = useContext(CharacterContext).characterInformation.proficiency
    const forcePoints = useContext(CharacterContext).characterCasting.forcePoints
    const charMods = useContext(CharacterContext).characterMods
    const currentForcePoints = forcePoints - charData.currentStats.forcePointsUsed
    const wisdomForceSave = 8 + charMods.wis_mod + proficiency
    const charismaForceSave = 8 + charMods.cha_mod + proficiency
    const techSave = 8 + charMods.int_mod + proficiency
    const techPoints = useContext(CharacterContext).characterCasting.techPoints
    const currentTechPoints = techPoints - charData.currentStats.techPointsUsed

    const [powerToggle, setPowerToggle] = useState(true)
    return (
        <View style = {{flex: 1}}>
            <View style={{alignItems: 'center'}}>
                <DuoToggleSwitch 
                    primaryText="FORCE"
                    secondaryText="TECH"
                    onPrimaryPress={() => {setPowerToggle(!powerToggle)}}
                    onSecondaryPress={() => {setPowerToggle(!powerToggle)}}
                />
            </View>
            <View style={{flex:1}}>
                {
                    powerToggle
                    ?
                        <View style={{alignItems: 'center'}}>
                            <Text>Force Points: {currentForcePoints} / {forcePoints}</Text>
                            <Text>Force Saves: {wisdomForceSave} / {charismaForceSave}</Text>
                            <Text>Force Power Hit: +{charMods.wis_mod + proficiency} / +{charMods.cha_mod + proficiency}</Text>
                        </View>
                    :   //this block for the tech has not been updated to reflect actual tech power data
                        <View style={{alignItems: 'center'}}>
                            <Text>Tech Points: {currentTechPoints} / {techPoints}</Text>
                            <Text>Tech Save: {techSave}</Text>
                            <Text>Tech Power Hit: +{charMods.int_mod + proficiency}</Text>
                        </View>
                }
                <ScrollView bounces={false}>
                    <PowerTable powerLevel = { 0 } powerToggle = { powerToggle } />
                    <PowerTable powerLevel = { 1 } powerToggle = { powerToggle } />
                    <PowerTable powerLevel = { 2 } powerToggle = { powerToggle } />
                    <PowerTable powerLevel = { 3 } powerToggle = { powerToggle } />
                    <PowerTable powerLevel = { 4 } powerToggle = { powerToggle } />
                    <PowerTable powerLevel = { 5 } powerToggle = { powerToggle } />
                    <PowerTable powerLevel = { 6 } powerToggle = { powerToggle } />
                    <PowerTable powerLevel = { 7 } powerToggle = { powerToggle } />
                    <PowerTable powerLevel = { 8 } powerToggle = { powerToggle } />
                    <PowerTable powerLevel = { 9 } powerToggle = { powerToggle } />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        alignItems: 'center',
        flex: 1
    },
    headerStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default SpellsScreen