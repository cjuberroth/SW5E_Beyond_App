import React from 'react'
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import DiceRoll from './DiceRolls'
import { useSettingsContext } from '../context/SettingsContext'

function SkillTableRow({ skillName, skillProficiency, baseAttribute, charAttributeMod, charProficiencyMod }) {
    const navigation = useNavigation()
    const { alignmentSettings } = useSettingsContext()

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

    const displayProficiency = () => {
        navigation.navigate('SkillDetailsModal', {
            skillName: skillName,
            skillProficiency: skillProficiency,
            baseAttribute: baseAttribute,
            charAttributeMod: charAttributeMod
        })
    }

    return (
        <View style={styles.rowStyle}>
            <Pressable style={{flex: 9, flexDirection: 'row'}} onPress={() => displayProficiency(skillProficiency)}>
                <View style={styles.profCol}>
                {skillProficiency === "Proficient" ? <FontAwesome style={[styles.icon, {color: alignmentSettings.tabIndicatorColor}]} name="circle" />
                    : skillProficiency === "Expertise" ? <FontAwesome style={[styles.icon, {color: alignmentSettings.tabIndicatorColor}]} name="star" />
                    : <FontAwesome style={[styles.icon, {color: alignmentSettings.tabIndicatorColor}]} name="circle-o" />}
                </View>
                <Text style={styles.modCol}>{ baseAttribute.toUpperCase().substring(0, 3) }</Text>
                <Text style={styles.skillCol}>{ skillName }</Text>
            </Pressable>
            <Pressable style={{flex: 1, flexDirection: 'row'}} onPress={() => diceRoll(1, 20, skillName, charAttributeMod, charProficiencyMod, skillProficiency)}>
                {skillProficiency === "Proficient" ? 
                    <View style={styles.bonusCol}>
                        <Text style={styles.bonusText}>{numberPresent(charAttributeMod + charProficiencyMod)}{charAttributeMod + charProficiencyMod}</Text>
                        <FontAwesome5 name='dice-d20' style={[styles.d20, {color: alignmentSettings.d20Color}]} />
                    </View>
                : skillProficiency === "Expertise" ? 
                    <View style={styles.bonusCol}>
                        <Text style={styles.bonusText}>{numberPresent(charAttributeMod + (charProficiencyMod * 2))}{charAttributeMod + (charProficiencyMod * 2)}</Text>
                        <FontAwesome5 name='dice-d20' style={[styles.d20, {color: alignmentSettings.d20Color}]} />
                    </View>
                : 
                    <View style={styles.bonusCol}>
                        <Text style={styles.bonusText}>{numberPresent(charAttributeMod)}{charAttributeMod}</Text>
                        <FontAwesome5 name='dice-d20' style={[styles.d20, {color: alignmentSettings.d20Color}]} />
                    </View>
                }
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
    profCol: {
        flex: 1.3,
        paddingLeft: 2,
        paddingVertical: 3
    },
    modCol: {
        flex: 1,
        fontSize: 15,
        color: 'white',
        paddingRight: 3,
        paddingVertical: 3
    },
    skillCol: {
        flex: 7,
        fontSize: 15,
        color: 'white',
        paddingVertical: 3
    },
    bonusCol: {
        flex: 1,
        fontSize: 15,
        color: '#ffe81f',
        //borderWidth: 1.5,
        textAlign: 'center',
        //borderColor: 'white',
        //borderRadius: 4,
        paddingHorizontal: 2,
        paddingVertical: 3
    },
    bonusText: {
        color: 'white', 
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 18
    },
    icon: {
        fontSize: 20,
        color: 'white',
    },
    d20: {
        fontSize: 35,
        position: 'absolute',
        top: -4,
        right: 1,
        color: 'rgba(21, 242, 253, 0.4)'
    }
})

export default SkillTableRow
