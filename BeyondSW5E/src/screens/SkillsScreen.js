import React, {useContext} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CharacterContext from '../context/CharacterContext'
import AbilitiesContext from '../context/AbilitiesContext'
import SkillsContext from '../context/SkillsContext'
import {FontAwesome} from '@expo/vector-icons'

const SkillsScreen = () => {

    const characterSkills = useContext(CharacterContext).tweaks?.abilityScores
    const characterMods = useContext(SkillsContext)
    const characterProf = useContext(AbilitiesContext)

    const numberPresent = function(score) {
        if(score >= 0) {
            return "+"
        } else {
            return
        }
    }
    
    return (
        <SafeAreaView>
            <View style={styles.parentView}>
                <Text style={styles.headerStyle}>Skills</Text>
                <View style={styles.rowStyle}>
                    <Text style={styles.profCol}>PROF</Text>
                    <Text style={styles.modCol}>MOD</Text>
                    <Text style={styles.skillCol}>SKILL</Text>
                    <Text style={styles.bonusCol}>BONUS</Text>
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Dexterity?.skills?.Acrobatics?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Dexterity?.skills?.Acrobatics?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>DEX</Text>
                    <Text style={styles.skillCol}>Acrobatics</Text>
                    {characterSkills?.Dexterity?.skills?.Acrobatics?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.dex_mod + characterProf.prof)}{characterMods.dex_mod + characterProf.prof}</Text>
                        : characterSkills?.Dexterity?.skills?.Acrobatics?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.dex_mod + (characterProf.prof * 2))}{characterMods.dex_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.dex_mod)}{characterMods.dex_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Wisdom?.skills?.animalHandling?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Wisdom?.skills?.animalHandling?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>WIS</Text>
                    <Text style={styles.skillCol}>Animal Handling</Text>
                    {characterSkills?.Wisdom?.skills?.animalHandling?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod + characterProf.prof)}{characterMods.wis_mod + characterProf.prof}</Text>
                        : characterSkills?.Wisdom?.skills?.animalHandling?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod + (characterProf.prof * 2))}{characterMods.wis_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod)}{characterMods.wis_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Strength?.skills?.Athletics?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Strength?.skills?.Athletics?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>STR</Text>
                    <Text style={styles.skillCol}>Athletics</Text>
                    {characterSkills?.Strength?.skills?.Athletics?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.str_mod + characterProf.prof)}{characterMods.str_mod + characterProf.prof}</Text>
                        : characterSkills?.Strength?.skills?.Athletics?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.str_mod + (characterProf.prof * 2))}{characterMods.str_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.str_mod)}{characterMods.str_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Charisma?.skills?.Deception?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Charisma?.skills?.Deception?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />                }
                    <Text style={styles.modCol}>CHA</Text>
                    <Text style={styles.skillCol}>Deception</Text>
                    {characterSkills?.Charisma?.skills?.Deception?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod + characterProf.prof)}{characterMods.cha_mod + characterProf.prof}</Text>
                        : characterSkills?.Charisma?.skills?.Deception?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod + (characterProf.prof * 2))}{characterMods.cha_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod)}{characterMods.cha_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Wisdom?.skills?.Insight?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Wisdom?.skills?.Insight?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>WIS</Text>
                    <Text style={styles.skillCol}>Insight</Text>
                    {characterSkills?.Wisdom?.skills?.Insight?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod + characterProf.prof)}{characterMods.wis_mod + characterProf.prof}</Text>
                        : characterSkills?.Wisdom?.skills?.Insight?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod + (characterProf.prof * 2))}{characterMods.wis_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod)}{characterMods.wis_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Charisma?.skills?.Intimidation?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Charisma?.skills?.Intimidation?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>CHA</Text>
                    <Text style={styles.skillCol}>Intimidation</Text>
                    {characterSkills?.Charisma?.skills?.Intimidation?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod + characterProf.prof)}{characterMods.cha_mod + characterProf.prof}</Text>
                        : characterSkills?.Charisma?.skills?.Intimidation?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod + (characterProf.prof * 2))}{characterMods.cha_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod)}{characterMods.cha_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Intelligence?.skills?.Investigation?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Intelligence?.skills?.Investigation?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>INT</Text>
                    <Text style={styles.skillCol}>Investigation</Text>
                    {characterSkills?.Intelligence?.skills?.Investigation?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod + characterProf.prof)}{characterMods.int_mod + characterProf.prof}</Text>
                        : characterSkills?.Intelligence?.skills?.Investigation?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod + (characterProf.prof * 2))}{characterMods.int_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod)}{characterMods.int_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Intelligence?.skills?.Lore?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Intelligence?.skills?.Lore?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>INT</Text>
                    <Text style={styles.skillCol}>Lore</Text>
                    {characterSkills?.Intelligence?.skills?.Lore?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod + characterProf.prof)}{characterMods.int_mod + characterProf.prof}</Text>
                        : characterSkills?.Intelligence?.skills?.Lore?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod + (characterProf.prof * 2))}{characterMods.int_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod)}{characterMods.int_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Wisdom?.skills?.Medicine?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Wisdom?.skills?.Medicine?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>WIS</Text>
                    <Text style={styles.skillCol}>Medicine</Text>
                    {characterSkills?.Wisdom?.skills?.Medicine?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod + characterProf.prof)}{characterMods.wis_mod + characterProf.prof}</Text>
                        : characterSkills?.Wisdom?.skills?.Medicine?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod + (characterProf.prof * 2))}{characterMods.wis_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod)}{characterMods.wis_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Intelligence?.skills?.Nature?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Intelligence?.skills?.Nature?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>WIS</Text>
                    <Text style={styles.skillCol}>Nature</Text>
                    {characterSkills?.Intelligence?.skills?.Nature?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod + characterProf.prof)}{characterMods.int_mod + characterProf.prof}</Text>
                        : characterSkills?.Intelligence?.skills?.Nature?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod + (characterProf.prof * 2))}{characterMods.int_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod)}{characterMods.int_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Wisdom?.skills?.Perception?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Wisdom?.skills?.Perception?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>WIS</Text>
                    <Text style={styles.skillCol}>Perception</Text>
                    {characterSkills?.Wisdom?.skills?.Perception?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod + characterProf.prof)}{characterMods.wis_mod + characterProf.prof}</Text>
                        : characterSkills?.Wisdom?.skills?.Perception?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod + (characterProf.prof * 2))}{characterMods.wis_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod)}{characterMods.wis_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Charisma?.skills?.Performance?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Charisma?.skills?.Performance?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>CHA</Text>
                    <Text style={styles.skillCol}>Performance</Text>
                    {characterSkills?.Charisma?.skills?.Performance?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod + characterProf.prof)}{characterMods.cha_mod + characterProf.prof}</Text>
                        : characterSkills?.Charisma?.skills?.Performance?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod + (characterProf.prof * 2))}{characterMods.cha_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod)}{characterMods.cha_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Charisma?.skills?.Persuasion?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Charisma?.skills?.Persuasion?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>CHA</Text>
                    <Text style={styles.skillCol}>Persuasion</Text>
                    {characterSkills?.Charisma?.skills?.Persuasion?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod + characterProf.prof)}{characterMods.cha_mod + characterProf.prof}</Text>
                        : characterSkills?.Charisma?.skills?.Persuasion?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod + (characterProf.prof * 2))}{characterMods.cha_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.cha_mod)}{characterMods.cha_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Intelligence?.skills?.Piloting?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Intelligence?.skills?.Piloting?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>INT</Text>
                    <Text style={styles.skillCol}>Piloting</Text>
                    {characterSkills?.Intelligence?.skills?.Piloting?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod + characterProf.prof)}{characterMods.int_mod + characterProf.prof}</Text>
                        : characterSkills?.Intelligence?.skills?.Piloting?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod + (characterProf.prof * 2))}{characterMods.int_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod)}{characterMods.int_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Dexterity?.skills?.["Sleight of Hand"]?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Dexterity?.skills?.["Sleight of Hand"]?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>DEX</Text>
                    <Text style={styles.skillCol}>Sleight of Hand</Text>
                    {characterSkills?.Dexterity?.skills?.["Sleight of Hand"]?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.dex_mod + characterProf.prof)}{characterMods.dex_mod + characterProf.prof}</Text>
                        : characterSkills?.Dexterity?.skills?.["Sleight of Hand"]?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.dex_mod + (characterProf.prof * 2))}{characterMods.dex_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.dex_mod)}{characterMods.dex_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Dexterity?.skills?.Stealth?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Dexterity?.skills?.Stealth?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>DEX</Text>
                    <Text style={styles.skillCol}>Stealth</Text>
                    {characterSkills?.Dexterity?.skills?.Stealth?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.dex_mod + characterProf.prof)}{characterMods.dex_mod + characterProf.prof}</Text>
                        : characterSkills?.Dexterity?.skills?.Stealth?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.dex_mod + (characterProf.prof * 2))}{characterMods.dex_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.dex_mod)}{characterMods.dex_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Wisdom?.skills?.Survival?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Wisdom?.skills?.Survival?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>WIS</Text>
                    <Text style={styles.skillCol}>Survival</Text>
                    {characterSkills?.Wisdom?.skills?.Survival?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod + characterProf.prof)}{characterMods.wis_mod + characterProf.prof}</Text>
                        : characterSkills?.Wisdom?.skills?.Survival?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod + (characterProf.prof * 2))}{characterMods.wis_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.wis_mod)}{characterMods.wis_mod}</Text>
                    }
                </View>
                <View style={styles.rowStyle}>
                    {characterSkills?.Intelligence?.skills?.Technology?.proficiency === "Proficient"? <FontAwesome style={styles.icon} name="circle" />
                        : characterSkills?.Intelligence?.skills?.Technology?.proficiency === "Expertise"? <FontAwesome style={styles.icon} name="star" />
                        : <FontAwesome style={styles.icon} name="circle-o" />}
                    <Text style={styles.modCol}>INT</Text>
                    <Text style={styles.skillCol}>Technology</Text>
                    {characterSkills?.Intelligence?.skills?.Technology?.proficiency === "Proficient"? <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod + characterProf.prof)}{characterMods.int_mod + characterProf.prof}</Text>
                        : characterSkills?.Intelligence?.skills?.Technology?.proficiency === "Expertise"? <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod + (characterProf.prof * 2))}{characterMods.int_mod + (characterProf.prof * 2)}</Text>
                        : <Text style={styles.bonusCol}>{numberPresent(characterMods.int_mod)}{characterMods.int_mod}</Text>
                    }
                </View>
            </View>
        </SafeAreaView>
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