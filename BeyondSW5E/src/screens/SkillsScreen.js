import React, {useContext} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import {Entypo} from '@expo/vector-icons'

const SkillsScreen = () => {
    const characterWhole = useContext(CharacterContext)
    const characterSkills = useContext(CharacterContext).tweaks?.abilityScores
    const sleightOfHand = "Sleight of Hand"
    const modifier = function(ability) {
        return Math.floor((ability-10)/2)
    }
    //need to add ability score improvements to base ability scores, then calculat mod
    console.log(characterWhole.baseAbilityScores.Charisma)
    console.log(modifier(characterWhole.baseAbilityScores.Dexterity))
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
                {characterSkills?.Dexterity?.skills?.Acrobatics?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Dexterity?.skills?.Acrobatics?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Dexterity?.skills?.Acrobatics?.proficiency}</Text>}
                <Text style={styles.modCol}>DEX</Text>
                <Text style={styles.skillCol}>Acrobatics</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Wisdom?.skills?.animalHandling?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Wisdom?.skills?.animalHandling?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Wisdom?.skills?.animalHandling?.proficiency}</Text>}
                <Text style={styles.modCol}>WIS</Text>
                <Text style={styles.skillCol}>Animal Handling</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Strength?.skills?.Athletics?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Strength?.skills?.Athletics?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Strength?.skills?.Athletics?.proficiency}</Text>}
                <Text style={styles.modCol}>STR</Text>
                <Text style={styles.skillCol}>Athletics</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Charisma?.skills?.Deception?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Charisma?.skills?.Deception?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Charisma?.skills?.Deception?.proficiency}</Text>
                }
                <Text style={styles.modCol}>CHA</Text>
                <Text style={styles.skillCol}>Deception</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Wisdom?.skills?.Insight?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Wisdom?.skills?.Insight?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Wisdom?.skills?.Insight?.proficiency}</Text>}
                <Text style={styles.modCol}>WIS</Text>
                <Text style={styles.skillCol}>Insight</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Charisma?.skills?.Intimidation?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Charisma?.skills?.Intimidation?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Charisma?.skills?.Intimidation?.proficiency}</Text>}
                <Text style={styles.modCol}>CHA</Text>
                <Text style={styles.skillCol}>Intimidation</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Intelligence?.skills?.Investigation?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Intelligence?.skills?.Investigation?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Intelligence?.skills?.Investigation?.proficiency}</Text>}
                <Text style={styles.modCol}>INT</Text>
                <Text style={styles.skillCol}>Investigation</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Intelligence?.skills?.Lore?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Intelligence?.skills?.Lore?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Intelligence?.skills?.Lore?.proficiency}</Text>}
                <Text style={styles.modCol}>INT</Text>
                <Text style={styles.skillCol}>Lore</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Wisdom?.skills?.Medicine?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Wisdom?.skills?.Medicine?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Wisdom?.skills?.Medicine?.proficiency}</Text>}
                <Text style={styles.modCol}>WIS</Text>
                <Text style={styles.skillCol}>Medicine</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Wisdom?.skills?.Nature?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Wisdom?.skills?.Nature?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Wisdom?.skills?.Nature?.proficiency}</Text>}
                <Text style={styles.modCol}>WIS</Text>
                <Text style={styles.skillCol}>Nature</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Wisdom?.skills?.Perception?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Wisdom?.skills?.Perception?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Wisdom?.skills?.Perception?.proficiency}</Text>}
                <Text style={styles.modCol}>WIS</Text>
                <Text style={styles.skillCol}>Perception</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Charisma?.skills?.Performance?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Charisma?.skills?.Performance?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Charisma?.skills?.Performance?.proficiency}</Text>}
                <Text style={styles.modCol}>CHA</Text>
                <Text style={styles.skillCol}>Performance</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Charisma?.skills?.Persuasion?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Charisma?.skills?.Persuasion?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Charisma?.skills?.Persuasion?.proficiency}</Text>}
                <Text style={styles.modCol}>CHA</Text>
                <Text style={styles.skillCol}>Persuasion</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Intelligence?.skills?.Piloting?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Intelligence?.skills?.Piloting?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Intelligence?.skills?.Piloting?.proficiency}</Text>}
                <Text style={styles.modCol}>INT</Text>
                <Text style={styles.skillCol}>Piloting</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Dexterity?.skills?.sleightOfHand?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Dexterity?.skills?.sleightOfHand?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Dexterity?.skills?.sleightOfHand?.proficiency}</Text>}
                <Text style={styles.modCol}>DEX</Text>
                <Text style={styles.skillCol}>Sleight of Hand</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Dexterity?.skills?.Stealth?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Dexterity?.skills?.Stealth?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Dexterity?.skills?.Stealth?.proficiency}</Text>}
                <Text style={styles.modCol}>DEX</Text>
                <Text style={styles.skillCol}>Stealth</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Wisdom?.skills?.Survival?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Wisdom?.skills?.Survival?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Wisdom?.skills?.Survival?.proficiency}</Text>}
                <Text style={styles.modCol}>WIS</Text>
                <Text style={styles.skillCol}>Survival</Text>
                <Text style={styles.bonusCol}>-</Text>
            </View>
            <View style={styles.rowStyle}>
                {characterSkills?.Intelligence?.skills?.Technology?.proficiency === "Proficient"? <Entypo style={styles.icon} name="arrow-with-circle-up" />
                    : characterSkills?.Intelligence?.skills?.Technology?.proficiency === "Expertise"? <Entypo style={styles.icon} name="star" />
                    : <Text style={styles.profCol}>{characterSkills?.Intelligence?.skills?.Technology?.proficiency}</Text>}
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
        flexDirection: 'row',
        margin: 5
    },
    rowText: {
        fontSize: 15
    },
    profCol: {
        flex:2,
        paddingLeft: 2,
        fontSize: 15
    },
    modCol: {
        flex:1,
        fontSize: 15
    },
    skillCol: {
        flex:5,
        fontSize: 15
    },
    bonusCol: {
        flex: 2,
        fontSize: 15
    },
    icon: {
        fontSize: 20,
        flex:2,
        paddingLeft:2
    }
})

export default SkillsScreen