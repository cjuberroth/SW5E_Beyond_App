import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import PowerCardList from '../components/PowerCardList'
import CharacterContext from '../context/CharacterContext'

/*
    This screen will need to be modified to accomodate the difference between force and tech powers
    Additionally, there are several comments below which identify the need to paramaterize several
    other values which come from character data and the api
*/

const SpellsScreen = () => {
    // Import contexts for char data
    const charData = useContext(CharacterContext).character
    const forcePoints = useContext(CharacterContext).characterCasting.forcePoints
    const powers = useContext(CharacterContext).characterCasting.forcePowersData
    const charMods = useContext(CharacterContext).characterMods

    const currentForcePoints = forcePoints - charData.currentStats.forcePointsUsed
    const wisdomForceSave = 8 + charMods.wis_mod
    const charismaForceSave = 8 + charMods.cha_mod
    
    return (
        <View style = { styles.screenContainer }>
            <View>
                <Text>Force Points: { currentForcePoints } / { forcePoints }</Text>
                <Text>Force Modifier: WIS +{ charMods.wis_mod } / CHA +{ charMods.cha_mod }</Text>
                <Text>Force Save: WIS { wisdomForceSave } / CHA { charismaForceSave }</Text>
            </View>
            <View>
                <Text style = { styles.headerStyle }>Force Powers Available</Text>
                
                {
                    powers.length === 0
                    ? <Text>No force powers</Text>
                    : <PowerCardList
                        powers = { powers }
                    />
                }
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

/*
<FlatList
                data = { charCasting.forcePowers }
                renderItem={({ item }) => {
                    return <Text>{ item }</Text>
                }}
*/