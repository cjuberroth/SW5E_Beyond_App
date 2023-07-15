import React, { useContext } from 'react'
import { Text, View, FlatList, StyleSheet, ImageBackground } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import { useSettingsContext } from '../context/SettingsContext'
import SkillTableRow from '../components/SkillTableRow'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles'

const SkillsScreen = () => {

    const characterSkills = useContext(CharacterContext).character.tweaks?.abilityScores
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterMods = useContext(CharacterContext).characterMods
    const skillsLU = useContext(CharacterContext).cachedData.cachedSkillsLU
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const {emblem} = useSettingsContext()

    return (
        <View style={styles.parentView}>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                    source={ require('../../assets/starBackgroundVert.jpg') }>
                    <ImageBackground imageStyle={styles.imgBackground} 
                        source={emblem && {uri: emblem}}>
                        <View style={styles.rowStyle}>
                            <Text style={styles.modCol}>prof</Text>
                            <Text style={styles.skillCol}>skill</Text>
                            <Text style={styles.bonusCol}>bonus</Text>
                        </View>
                        <View style={{height: '94.2%'}}>
                            <FlatList 
                                data = { skillsLU }
                                keyExtractor = {(skill) => skill.rowKey}
                                contentContainerStyle={{flexGrow: 1}}
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
                    </ImageBackground>
                </ImageBackground>
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
        fontFamily: 'star-font',
        fontSize: 15,
        color: '#ffe81f'
    },
    modCol: {
        flex:1,
        fontFamily: 'star-font',
        fontSize: 15,
        color: '#ffe81f',
        //fontWeight: 'bold'
    },
    skillCol: {
        flex:5,
        fontFamily: 'star-font',
        fontSize: 15,
        color: '#ffe81f',
        //fontWeight: 'bold'
    },
    bonusCol: {
        flex: 1.5,
        fontFamily: 'star-font',
        fontSize: 15,
        color: '#ffe81f',
        textAlign: 'right',
        //fontWeight: 'bold'
    },
    imgBackground: {
        width: '100%',
        flex: 1,
        resizeMode: 'contain'
    },
})

export default SkillsScreen
