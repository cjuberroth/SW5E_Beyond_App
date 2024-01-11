import React, { useCallback, useContext, useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, ScrollView, Pressable, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../context/CharacterContext'
import { useSettingsContext } from '../context/SettingsContext'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles'
import DiceRoll from '../components/DiceRolls'

const AbilitiesScreen = () => {
    const navigation = useNavigation()
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const { alignmentSettings } = useSettingsContext()
    
    //import character data from context
    const characterSkills = useContext(CharacterContext).character.tweaks?.abilityScores
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterAbilities = useContext(CharacterContext).characterAbilities
    const characterMods = useContext(CharacterContext).characterMods
    const characterSaves = useContext(CharacterContext).characterSaves
    const numberPresent = useContext(CharacterContext).functions.numberPresent
    const {emblem} = useSettingsContext()
    
    const getSkillMod = function(skill) {
        let mod = 0
        switch(skill) {
            case ('Perception'):
                if(characterSkills?.Wisdom?.skills?.[skill]?.proficiency === 'Proficient'){
                    mod += characterInfo.proficiency
                }
                else if(characterSkills?.Wisdom?.skills?.[skill]?.proficiency === 'Expertise'){
                    mod += 2 * characterInfo.proficiency
                }
                mod += characterMods.wis_mod
                break
            case ('Investigation'):
                if(characterSkills?.Intelligence?.skills?.[skill]?.proficiency === 'Proficient'){
                    mod += characterInfo.proficiency
                }
                else if(characterSkills?.Intelligence?.skills?.[skill]?.proficiency === 'Expertise'){
                    mod += 2 * characterInfo.proficiency
                }
                mod += characterMods.int_mod
                break
            case ('Insight'):
                if(characterSkills?.Wisdom?.skills?.[skill]?.proficiency === 'Proficient'){
                    mod += characterInfo.proficiency
                }
                else if(characterSkills?.Wisdom?.skills?.[skill]?.proficiency === 'Expertise'){
                    mod += 2 * characterInfo.proficiency
                }
                mod += characterMods.wis_mod
                break
        }
        return mod
    }

    const perceptionMod = getSkillMod('Perception')
    const investigationMod = getSkillMod('Investigation')
    const insightMod = getSkillMod('Insight')

    const diceRoll = (numDice, numSides, rollType) => {
        const rollResult = DiceRoll(numDice, numSides)
        var mod = ''
        switch (rollType) {
            case 'Strength':
                mod = characterMods.str_mod
                break
            case 'Dexterity':
                mod = characterMods.dex_mod
                break
            case 'Constitution':
                mod = characterMods.con_mod
                break
            case 'Intelligence':
                mod = characterMods.int_mod
                break
            case 'Wisdom':
                mod = characterMods.wis_mod
                break
            case 'Charisma':
                mod = characterMods.cha_mod
                break
            case 'Strength Save':
                mod = characterSaves.str_save
                break
            case 'Dexterity Save':
                mod = characterSaves.dex_save
                break
            case 'Constitution Save':
                mod = characterSaves.con_save
                break
            case 'Intelligence Save':
                mod = characterSaves.int_save
                break
            case 'Wisdom Save':
                mod = characterSaves.wis_save
                break
            case 'Charisma Save':
                mod = characterSaves.cha_save
                break
            case 'Perception':
                mod = perceptionMod
                break
            case 'Investigation':
                mod = investigationMod
                break
            case 'Insight':
                mod = insightMod
                break
        }
        navigation.navigate('DiceResultModal', {rollResult: rollResult, mod: mod, rollType: rollType, numDice: numDice, numSides: numSides})
    }

    const [diceDimensions, setDiceDimensions] = useState([0, 0])

    const findDiceDimensions = useCallback(event => {
        const { width, height } = event.nativeEvent.layout
        let diceTranslateX = width / 2
        let diceTranslateY = height / 2 * - 1
        setDiceDimensions([ diceTranslateX, diceTranslateY ])
    }, [])

    return (
        // This style import is a POC for the ability to extract common styles into a separate file
        <View style={AppStyles.globalStyles.parentContainerView}>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{ flex: flexValue }}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                    source={ require('../../assets/starBackgroundVert.jpg') }>
                    <ImageBackground imageStyle={styles.imgBackground} 
                        //source={require('../../assets/rebel-alliance.png')}
                        source={emblem && {uri: emblem}}
                        >
                        <ScrollView>
                            <View>
                                <Text style={styles.headingStyle}>abilities</Text>
                            </View>
                            <View style={styles.parentStyle}>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Strength')} >
                                    <Text style={styles.textStyle}>Strength</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.str_mod)}{characterMods.str_mod}</Text>
                                        <FontAwesome5 onLayout={findDiceDimensions} name='dice-d20' style={[styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}]} />
                                    </View>
                                    <Text style={styles.textStyle}>{characterAbilities.abilitiesStrength}</Text>
                                </Pressable>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Dexterity')} >
                                    <Text style={styles.textStyle}>Dexterity</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.dex_mod)}{characterMods.dex_mod}</Text>
                                        <FontAwesome5 name='dice-d20' style={[styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}]} />
                                    </View>
                                    <Text style={styles.textStyle}>{characterAbilities.abilitiesDexterity}</Text>
                                </Pressable>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Constitution')} >
                                    <Text style={styles.textStyle}>Constitution</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.con_mod)}{characterMods.con_mod}</Text>
                                        <FontAwesome5 name='dice-d20' style={[styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}]} />
                                    </View>
                                    <Text style={styles.textStyle}>{characterAbilities.abilitiesConstitution}</Text>
                                </Pressable>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Intelligence')} >
                                    <Text style={styles.textStyle}>Intelligence</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.int_mod)}{characterMods.int_mod}</Text>
                                        <FontAwesome5 name='dice-d20' style={[styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}]} />
                                    </View>
                                    <Text style={styles.textStyle}>{characterAbilities.abilitiesIntelligence}</Text>
                                </Pressable>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Wisdom')} >
                                    <Text style={styles.textStyle}>Wisdom</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.wis_mod)}{characterMods.wis_mod}</Text>
                                        <FontAwesome5 name='dice-d20' style={[styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}]} />
                                    </View>
                                    <Text style={styles.textStyle}>{characterAbilities.abilitiesWisdom}</Text>
                                </Pressable>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Charisma')} >
                                    <Text style={styles.textStyle}>Charisma</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.cha_mod)}{characterMods.cha_mod}</Text>
                                        <FontAwesome5 name='dice-d20' style={[styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}]} />
                                    </View>
                                    <Text style={styles.textStyle}>{characterAbilities.abilitiesCharisma}</Text>
                                </Pressable>
                            </View>
                            <View>
                                <Text style={styles.headingStyle}>Saving throws</Text>
                            </View>
                            <View style={styles.saveView}>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Strength Save')} >
                                    <Text style={styles.textStyle}>Strength</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterSaves.str_save)}{characterSaves.str_save}</Text>
                                        <FontAwesome5 name='dice-d20' style={ characterSaves.characterSaves.includes('Strength') ? [styles.d20Proficient, {transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] : [styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] } />
                                    </View>
                                    <Text style={{fontSize: 6}}> </Text>
                                </Pressable>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Dexterity Save')} >
                                    <Text style={styles.textStyle}>Dexterity</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterSaves.dex_save)}{characterSaves.dex_save}</Text>
                                        <FontAwesome5 name='dice-d20' style={ characterSaves.characterSaves.includes('Dexterity') ? [styles.d20Proficient, {transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] : [styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] } />
                                    </View>
                                    <Text style={{fontSize: 6}}> </Text>
                                </Pressable>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Constitution Save')} >
                                    <Text style={styles.textStyle}>Constitution</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterSaves.con_save)}{characterSaves.con_save}</Text>
                                        <FontAwesome5 name='dice-d20' style={ characterSaves.characterSaves.includes('Constitution') ? [styles.d20Proficient, {transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] : [styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] } />
                                    </View>
                                    <Text style={{fontSize: 6}}> </Text>
                                </Pressable>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Intelligence Save')} >
                                    <Text style={styles.textStyle}>Intelligence</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterSaves.int_save)}{characterSaves.int_save}</Text>
                                        <FontAwesome5 name='dice-d20' style={ characterSaves.characterSaves.includes('Intelligence') ? [styles.d20Proficient, {transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] : [styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] } />
                                    </View>
                                    <Text style={{fontSize: 6}}> </Text>
                                </Pressable>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Wisdom Save')} >
                                    <Text style={styles.textStyle}>Wisdom</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterSaves.wis_save)}{characterSaves.wis_save}</Text>
                                        <FontAwesome5 name='dice-d20' style={ characterSaves.characterSaves.includes('Wisdom') ? [styles.d20Proficient, {transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] : [styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] } />
                                    </View>
                                    <Text style={{fontSize: 6}}> </Text>
                                </Pressable>
                                <Pressable style={styles.boxStyle} onPress={() => diceRoll(1, 20, 'Charisma Save')} >
                                    <Text style={styles.textStyle}>Charisma</Text>
                                    <View>
                                        <Text style={styles.modStyle}>{numberPresent(characterSaves.cha_save)}{characterSaves.cha_save}</Text>
                                        <FontAwesome5 name='dice-d20' style={ characterSaves.characterSaves.includes('Charisma') ? [styles.d20Proficient, {transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] : [styles.d20, {color: alignmentSettings.d20Color, transform: [{translateX: diceDimensions[0]}, {translateY: diceDimensions[1]}]}] } />
                                    </View>
                                    <Text style={{fontSize: 6}}> </Text>
                                </Pressable>
                            </View>
                            <View>
                        <Text style={styles.headingStyle}>passive Senses</Text>
                    </View>
                    <View style={styles.saveView}>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Perception</Text>
                            <Pressable onPress={() => Alert.alert('Passive Perception', "A passive check is a special kind of ability check that doesn’t involve any die rolls. Such a check can represent the average result for a task done repeatedly, such as searching for secret doors over and over again, or can be used when the GM wants to secretly determine whether the characters succeed at something without rolling dice, such as noticing a hidden monster.")}>
                                <Text style={ styles.modStyle }>{perceptionMod + 10}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle} adjustsFontSizeToFit numberOfLines={1}>Investigation</Text>
                            <Pressable onPress={() => Alert.alert('Passive Investigation', "A passive check is a special kind of ability check that doesn’t involve any die rolls. Such a check can represent the average result for a task done repeatedly, such as searching for secret doors over and over again, or can be used when the GM wants to secretly determine whether the characters succeed at something without rolling dice, such as noticing a hidden monster.")}>
                                <Text style={ styles.modStyle }>{investigationMod}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Insight</Text>
                            <Pressable onPress={() => Alert.alert('Passive Insight', "A passive check is a special kind of ability check that doesn’t involve any die rolls. Such a check can represent the average result for a task done repeatedly, such as searching for secret doors over and over again, or can be used when the GM wants to secretly determine whether the characters succeed at something without rolling dice, such as noticing a hidden monster.")}>
                                <Text style={ styles.modStyle }>{insightMod}</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                    </ImageBackground>
                </ImageBackground>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    // containerStyle: {
    //     flex: 1,
    //     backgroundColor: '#263238'
    // },
    header: {
        flex: 1
    },
    parentStyle: {
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //paddingTop: 20,
        
    },
    boxStyle: {
        marginBottom: 15,
        borderWidth: 2,
        //borderColor: '#4A0C05',
        borderColor: 'rgba(255, 232, 31, 0.8)',
        borderRadius: 5,
        flexBasis: '29.7%'
    },
    textStyle: {
        flexDirection: 'column',
        fontSize: 20,
        alignItems: 'center',
        textAlign: 'center',
        color: 'white'
    },
    modStyle: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        paddingTop: 5,
        marginBottom: 4,
        marginTop: 2,
        //borderWidth: 2,
        //borderColor: '#4A0C05',
        //borderColor: '#ffe81f',
        //backgroundColor: '#ffe81f',
        //overflow: 'hidden',
        alignSelf: 'center',
        width: '50%',
        //borderRadius: 20,
        zIndex: 1,
        
    },
    modStyleProficient: {
        fontSize: 30,
        textAlign: 'center',
        color: '#ffe81f',
        paddingTop: 5,
        marginBottom: 4,
        marginTop: 2,
        //borderWidth: 2,
        //borderColor: '#15f2fd',
        alignSelf: 'center',
        width: '50%',
        //borderRadius: 5,
        zIndex: 1
    },
    headingStyle: {
        fontFamily: 'star-font',
        fontSize: 30,
        //backgroundColor: '#263238',
        color: '#ffe81f',
        textAlign: 'center',
        marginBottom: 15
    },
    imgBackground: {
        width: '100%',
        resizeMode: 'contain'
    },
    saveView: {
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    saveText: {
        color: 'white',
        textAlign: 'left',
        fontSize: 20
    },
    d20: {
        fontSize: 45, 
        position: 'absolute',
        top: '52%',
        right: '48%',
        color: 'rgba(21, 242, 253, 0.4)'
    },
    d20Proficient: {
        fontSize: 45, 
        position: 'absolute',
        top: '52%',
        right: '48%',
        //color: '#15f2fd'
        color: 'rgba(255, 255, 255, 0.5)'
    }
})

export default AbilitiesScreen