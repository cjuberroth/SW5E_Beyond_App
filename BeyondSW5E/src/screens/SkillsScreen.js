import React, {Component} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import charAbilities from '../../data/jalenOrso'

const SkillsScreen = () => {
    return (
        <View style={styles.parentView}>
            <Text style={styles.headerStyle}>Skills</Text>
            <View style={styles.rowStyle}>
                <Text style={styles.profCol}>PROF</Text>
                <Text style={styles.modCol}>MOD</Text>
                <Text style={styles.skillCol}>SKILL</Text>
                <Text style={styles.bonusCol}>BONUS</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text style={styles.profCol}>{charAbilities.tweaks?.abilityScores?.Dexterity?.skills?.Acrobatics?.proficiency}</Text>
                <Text style={styles.modCol}>DEX</Text>
                <Text style={styles.skillCol}>Acrobatics</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text style={styles.profCol}>{charAbilities.tweaks?.abilityScores?.Wisdom?.skills?.animalHandling?.proficiency}</Text>
                <Text style={styles.modCol}>WIS</Text>
                <Text style={styles.skillCol}>Animal Handling</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text style={styles.profCol}>{charAbilities.tweaks?.abilityScores?.Strength?.skills?.Athletics?.proficiency}</Text>
                <Text style={styles.modCol}>STR</Text>
                <Text style={styles.skillCol}>Athletics</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text style={styles.profCol}>{charAbilities.tweaks?.abilityScores?.Dexterity?.skills?.Stealth?.proficiency}</Text>
                <Text style={styles.modCol}>DEX</Text>
                <Text style={styles.skillCol}>Stealth</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                <Text style={styles.profCol}>{charAbilities.tweaks?.abilityScores?.Intelligence?.skills?.Technology?.proficiency}</Text>
                <Text style={styles.modCol}>INT</Text>
                <Text style={styles.skillCol}>Technology</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parentView: {
        
    },
    headerStyle: {
        fontSize: 30
    },
    rowStyle: {
        //flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        flexDirection: 'row'
    },
    rowText: {
        fontSize: 20
    },
    profCol: {
        flex:2,
        paddingLeft: 2
    },
    modCol: {
        flex:1
    },
    skillCol: {
        flex:5
    },
    bonusCol: {
        flex: 2
    }
})

export default SkillsScreen