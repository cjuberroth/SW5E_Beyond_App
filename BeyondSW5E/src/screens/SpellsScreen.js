import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import AbilitiesContext from '../context/AbilitiesContext'

/*
    This screen will need to be modified to accomodate the difference between force and tech powers
    Additionally, there are several comments below which identify the need to paramaterize several
    other values which come from character data and the api
*/

const SpellsScreen = () => {
    // Import contexts for char data and abilities
    const charData = useContext(CharacterContext).character
    const charInfo = useContext(CharacterContext).characterInformation
    const wisdomForceMod = useContext(CharacterContext).characterMods.wis_mod
    const charismaForceMod = useContext(CharacterContext).characterMods.cha_mod
    const charCasting = useContext(CharacterContext).characterCasting

    // This block is not yet dynamic for different force classes at this time. There will need to be an API call somewhere which
    // allows us to access the class specific data for force points
    //const maxForcePoints = charData.classes[0].levels * 3 + Math.max(wisdomForceMod, charismaForceMod) - charInfo.proficiency
    const maxForcePoints = charCasting.forcePoints
    const currentForcePoints = maxForcePoints - charData.currentStats.forcePointsUsed

    const wisdomForceSave = 8 + wisdomForceMod
    const charismaForceSave = 8 + charismaForceMod
    return (
        <View>
            <View>
                <Text>Force Points: { currentForcePoints } / { maxForcePoints }</Text>
                <Text>Force Modifier: +{ wisdomForceMod } / +{ charismaForceMod }</Text>
                <Text>Force Save: { wisdomForceSave } / { charismaForceSave }</Text>
            </View>
            <View>
                <Text>Force Powers Available</Text>
                <FlatList
                data = { charData.classes[0].forcePowers }
                renderItem={({ item }) => {
                    return <Text>{ item }</Text>
                }}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default SpellsScreen
