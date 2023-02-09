import React, { useContext } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DiceRoll from './DiceRolls'
import CharacterContext from '../context/CharacterContext'

const ActionCard = ({ item }) => {
    const characterMods = useContext(CharacterContext).characterMods
    const proficiency = useContext(CharacterContext).characterInformation.proficiency
    const navigation = useNavigation()
    
    const diceSize = item.tweaks?.damageDice?.dieSize ?
        item.tweaks.damageDice.dieSize :
        item.damageDiceDieTypeEnum 
    const numberOfDice = item.damageNumberOfDice
    const dexMod = characterMods.dex_mod
    const strMod = characterMods.str_mod
    const hitMod = item.weaponClassification?.includes("Blaster") ? dexMod
        : item.propertiesMap?.hasOwnProperty('Finesse') ? dexMod : strMod
    const attackMod = item.tweaks?.toHit?.override ?
        item.tweaks.toHit.override :
        item.tweaks?.toHit?.bonus ?
        proficiency + hitMod + item.tweaks.toHit.bonus :
        proficiency + hitMod
    const damageMod = item.tweaks?.damage?.override ?
        item.tweaks.damage.override : 
        item.tweaks?.damage?.bonus ?
        hitMod + item.tweaks.damage.bonus :
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
            <Text style={ styles.cardText }>{item.name}</Text>
            <View style={ styles.pressables }>
                <Pressable onPress={() => hitRoll(1, 20, item.name+' | Attack')}>
                    <Text style={ styles.rollable }> + { attackMod } </Text>
                </Pressable>
                {
                    item.name == 'Unarmed Strike' ?
                    <Text style={ styles.rollable }>2 { item.damageType }</Text> :  //TODO: this is not always two for every character
                    <Pressable onPress={() => damageRoll(numberOfDice, diceSize, item.name+' | Damage')}>
                        <Text style={ styles.rollable }>{ numberOfDice }d{ diceSize } + { damageMod } { item.damageType }</Text>
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
        borderColor: '#4A0C05'
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
        borderColor: '#4A0C05',
        borderRadius: 5
    },
    pressables: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default ActionCard