import React, { useContext } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DiceRoll from './DiceRolls'
import CharacterContext from '../context/CharacterContext'

const ActionCard = ({ item: action }) => {
    const characterMods = useContext(CharacterContext).characterMods
    const proficiency = useContext(CharacterContext).characterInformation.proficiency
    const navigation = useNavigation()
    
    const diceSize = action.tweaks?.damageDice?.dieSize ?
        action.tweaks.damageDice.dieSize :
        action.damageDiceDieTypeEnum 
    const numberOfDice = action.damageNumberOfDice
    const dexMod = characterMods.dex_mod
    const strMod = characterMods.str_mod
    const hitMod = action.weaponClassification?.includes("Blaster") ? dexMod
        : action.propertiesMap?.hasOwnProperty('Finesse') ? dexMod : strMod
    const attackMod = action.tweaks?.toHit?.override ?
        action.tweaks.toHit.override :
        action.tweaks?.toHit?.bonus ?
        proficiency + hitMod + action.tweaks.toHit.bonus :
        proficiency + hitMod
    const damageMod = action.tweaks?.damage?.override ?
        action.tweaks.damage.override : 
        action.tweaks?.damage?.bonus ?
        hitMod + action.tweaks.damage.bonus :
        hitMod

    const hitRoll = (numDice, numSides, rollName) => {
        const rollResult = DiceRoll(numDice, numSides)
        navigation.navigate('DiceResultModal', {rollResult: rollResult, mod: attackMod, rollType: rollName, numDice: numDice, numSides: numSides})
    }

    const damageRoll = (numDice, numSides, rollName) => {
        const rollResult = DiceRoll(numDice, numSides)
        navigation.navigate('DiceResultModal', {rollResult: rollResult, mod: damageMod, rollType: rollName, numDice: numDice, numSides: numSides})
    }

    return (
        <View style={styles.card}>
            <Text style={ styles.cardText }>{action.name}</Text>
            <View style={ styles.pressables }>
                <Pressable onPress={() => hitRoll(1, 20, action.name+' | Attack')}>
                    <Text style={ styles.rollable }> + { attackMod } </Text>
                </Pressable>
                {
                    action.name == 'Unarmed Strike' ?
                        action.isMonk ?
                        <Pressable onPress={() => damageRoll(numberOfDice, diceSize, action.name+' | Damage')}>
                            <Text style={ styles.rollable }>{ numberOfDice }d{ diceSize } + { damageMod } { action.damageType }</Text>
                        </Pressable> :
                        <Text style={ styles.rollable }>2 { action.damageType }</Text> :  
                    <Pressable onPress={() => damageRoll(numberOfDice, diceSize, action.name+' | Damage')}>
                        <Text style={ styles.rollable }>{ numberOfDice }d{ diceSize } + { damageMod } { action.damageType }</Text>
                    </Pressable>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderWidth: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        padding: 5,
        paddingLeft: 10,
        borderColor: 'white'
    },
    cardText: {
        fontSize: 24,
        color: 'white'
    },
    rollable: {
        borderWidth: 2,
        margin: 5,
        padding: 5,
        fontSize: 18,
        color: 'white',
        borderColor: 'white',
        borderRadius: 5
    },
    pressables: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default ActionCard