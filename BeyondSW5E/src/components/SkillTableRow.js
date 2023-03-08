import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import DiceRoll from './DiceRolls'

function SkillTableRow({ skillName, skillProficiency, baseAttribute, charAttributeMod, charProficiencyMod }) {
    const navigation = useNavigation()
    const numberPresent = function(score) {
        if(score >= 0) {
            return "+"
        } else {
            return
        }
    }

    const diceRoll = (numDice, numSides, rollType, skillMod, proficiency, skillProficiency) => {
        const rollResult = DiceRoll(numDice, numSides)
        var mod = 0
        if (skillProficiency === 'Proficient') {
            mod = skillMod + proficiency
        } else if (skillProficiency === 'Expertise') {
            mod = skillMod + (proficiency * 2)
        } else {
            mod = skillMod
        }

        navigation.navigate('DiceResultModal', {rollResult: rollResult, mod: mod, rollType: rollType, numDice: numDice, numSides: numSides})
    }


    return (
        <View style={styles.rowStyle}>
            {skillProficiency === "Proficient" ? <FontAwesome style={styles.icon} name="circle" />
                : skillProficiency === "Expertise" ? <FontAwesome style={styles.icon} name="star" />
                : <FontAwesome style={styles.icon} name="circle-o" />}
            <Text style={styles.modCol}>{ baseAttribute.toUpperCase().substring(0, 3) }</Text>
            <Text style={styles.skillCol}>{ skillName }</Text>
            <Pressable style={styles.bonusCol} onPress={() => diceRoll(1, 20, skillName, charAttributeMod, charProficiencyMod, skillProficiency)}>
                {skillProficiency === "Proficient" ? <Text style={{color: 'white', textAlign: 'center'}}>{numberPresent(charAttributeMod + charProficiencyMod)}{charAttributeMod + charProficiencyMod}</Text>
                    : skillProficiency === "Expertise" ? <Text style={{color: 'white', textAlign: 'center'}}>{numberPresent(charAttributeMod + (charProficiencyMod * 2))}{charAttributeMod + (charProficiencyMod * 2)}</Text>
                    : <Text style={{color: 'white', textAlign: 'center'}}>{numberPresent(charAttributeMod)}{charAttributeMod}</Text>}
            </Pressable>        
        </View>
    )
}

const styles = StyleSheet.create({
    rowStyle: {
        //flex: 1,
        flexDirection: 'row',
        margin: 5
    },
    modCol: {
        flex: 1,
        fontSize: 15,
        color: 'white',
        paddingRight: 3,
        paddingVertical: 3
    },
    skillCol: {
        flex: 7.5,
        fontSize: 15,
        color: 'white'
    },
    bonusCol: {
        flex: 1,
        fontSize: 15,
        color: 'white',
        borderWidth: 1.5,
        textAlign: 'center',
        borderColor: '#4A0C05',
        borderRadius: 4,
        paddingHorizontal: 2
    },
    icon: {
        fontSize: 20,
        flex: 1.5,
        paddingLeft: 2,
        color: 'white'
    }
})

export default SkillTableRow
