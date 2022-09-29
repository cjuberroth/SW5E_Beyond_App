import React, { useContext } from 'react'
import { Text, View, FlatList, StyleSheet, Animated } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import SkillTableRow from '../components/SkillTableRow'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'

const SkillsScreen = () => {

    const characterSkills = useContext(CharacterContext).character.tweaks?.abilityScores
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterMods = useContext(CharacterContext).characterMods
    const skillsLU = useContext(CharacterContext).apiData.skillsLU
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed

    return (
        <View style={styles.parentView}>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <View style={styles.rowStyle}>
                    <Text style={styles.modCol}>MOD</Text>
                    <Text style={styles.skillCol}>SKILL</Text>
                    <Text style={styles.bonusCol}>BONUS</Text>
                </View>
                <FlatList 
                    data = { skillsLU }
                    keyExtractor = {(skill) => skill.rowKey}
                    renderItem = { ({ item }) => {
                        return <SkillTableRow
                                    skillName = { item.name }
                                    skillProficiency={ characterSkills?.[item.baseAttribute]?.skills?.[item.name]?.proficiency }
                                    baseAttribute = { item.baseAttribute }
                                    charAttributeMod = { characterMods[item.baseAttribute.toLowerCase().substring(0,3) + '_mod'] }
                                    charProficiencyMod = { characterInfo.proficiency }
                                />
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: '#263238',
        flex: 1
    },
    header: {
        flex: 1
    },
    rowStyle: {
        //flex: 1,
        flexDirection: 'row',
        margin: 5
    },
    profCol: {
        flex:2,
        paddingLeft: 2,
        fontSize: 15,
        color: 'white'
    },
    modCol: {
        flex:1,
        fontSize: 15,
        color: 'white'
    },
    skillCol: {
        flex:5,
        fontSize: 15,
        color: 'white'
    },
    bonusCol: {
        flex: 2,
        fontSize: 15,
        color: 'white'
    }
})

export default SkillsScreen
