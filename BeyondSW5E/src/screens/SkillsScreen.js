import React, { useContext } from 'react'
import { Text, View, FlatList, StyleSheet, Animated, SafeAreaView } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import SkillTableRow from '../components/SkillTableRow'
import Header from '../components/Header'
import HeaderContext from '../context/HeaderContext'

const SkillsScreen = () => {

    const headerHeight = useContext(HeaderContext).headerUtils.headerHeight
    const translateY = useContext(HeaderContext).headerUtils.translateY
    const headerUtils = useContext(HeaderContext).headerUtils
    
    const characterSkills = useContext(CharacterContext).character.tweaks?.abilityScores
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterMods = useContext(CharacterContext).characterMods
    const skillsLU = useContext(CharacterContext).apiData.skillsLU

    return (
        <SafeAreaView style={styles.parentView}>
            <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
                <Header {...{headerHeight}} />
            </Animated.View>
            <Animated.View style={[{paddingTop: headerHeight}, {transform: [{translateY}]}]}>
                {/* <Text style={styles.headerStyle}>{characterInfo.name}</Text> */}
                <View style={styles.rowStyle}>
                    <Text style={styles.modCol}>MOD</Text>
                    <Text style={styles.skillCol}>SKILL</Text>
                    <Text style={styles.bonusCol}>BONUS</Text>
                </View>
                <Animated.FlatList 
                    bounces={false}
                    scrollEventThrottle={16}
                    //contentContainerStyle={{paddingTop: headerHeight/2}}
                    onScroll={headerUtils.handleScroll}
                    ref={headerUtils.ref}
                    onMomentumScrollEnd={headerUtils.handleSnap}
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
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: '#263238',
        flex: 1
    },
    headerStyle: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
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
    },
    header: {
        position: 'absolute',
        backgroundColor: '#263238',
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1
    }
})

export default SkillsScreen
