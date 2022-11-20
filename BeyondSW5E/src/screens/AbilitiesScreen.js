import React, { useContext } from 'react'
import { Text, View, StyleSheet, ImageBackground, ScrollView, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CharacterContext from '../context/CharacterContext'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles'
import DiceRoll from '../components/DiceRolls'

const AbilitiesScreen = () => {
    const navigation = useNavigation()
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    
    //import character data from context
    const characterAbilities = useContext(CharacterContext).characterAbilities
    const characterMods = useContext(CharacterContext).characterMods
    const characterSaves = useContext(CharacterContext).characterSaves
    const numberPresent = useContext(CharacterContext).functions.numberPresent

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
        }
        navigation.navigate('DiceResultModal', {rollResult: rollResult, mod: mod, rollType: rollType, numDice: numDice, numSides: numSides})
    }

    return (
        // This style import is a POC for the ability to extract common styles into a separate file
        <View style={AppStyles.globalStyles.parentContainerView}>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            
            <View style={{ flex: flexValue }}>
            <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                    source={ require('../../assets/header-background.jpg') }>
                <ScrollView>
                    <ImageBackground style={styles.imgBackground} source={require('../../assets/rebel-alliance.png')}>
                        <View style={styles.parentStyle}>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Strength</Text>
                                <Pressable onPress={() => diceRoll(1, 20, 'Strength')}>
                                    <Text style={styles.modStyle}>{numberPresent(characterMods.str_mod)}{characterMods.str_mod}</Text>
                                </Pressable>
                                <Text style={styles.textStyle}>{characterAbilities.abilitiesStrength}</Text>
                            </View>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Dexterity</Text>
                                <Pressable onPress={() => diceRoll(1, 20, 'Dexterity')}>
                                    <Text style={styles.modStyle}>{numberPresent(characterMods.dex_mod)}{characterMods.dex_mod}</Text>
                                </Pressable>
                                <Text style={styles.textStyle}>{characterAbilities.abilitiesDexterity}</Text>
                            </View>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Constitution</Text>
                                <Pressable onPress={() => diceRoll(1, 20, 'Constitution')}>
                                    <Text style={styles.modStyle}>{numberPresent(characterMods.con_mod)}{characterMods.con_mod}</Text>
                                </Pressable>
                                <Text style={styles.textStyle}>{characterAbilities.abilitiesConstitution}</Text>
                            </View>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Intelligence</Text>
                                <Pressable onPress={() => diceRoll(1, 20, 'Intelligence')}>
                                    <Text style={styles.modStyle}>{numberPresent(characterMods.int_mod)}{characterMods.int_mod}</Text>
                                </Pressable>
                                <Text style={styles.textStyle}>{characterAbilities.abilitiesIntelligence}</Text>
                            </View>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Wisdom</Text>
                                <Pressable onPress={() => diceRoll(1, 20, 'Wisdom')}>
                                    <Text style={styles.modStyle}>{numberPresent(characterMods.wis_mod)}{characterMods.wis_mod}</Text>
                                </Pressable>
                                <Text style={styles.textStyle}>{characterAbilities.abilitiesWisdom}</Text>
                            </View>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Charisma</Text>
                                <Pressable onPress={() => diceRoll(1, 20, 'Charisma')}>
                                    <Text style={styles.modStyle}>{numberPresent(characterMods.cha_mod)}{characterMods.cha_mod}</Text>
                                </Pressable>
                                <Text style={styles.textStyle}>{characterAbilities.abilitiesCharisma}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View>
                        <Text style={styles.headingStyle}>Saving Throws</Text>
                    </View>
                    <View style={styles.saveView}>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Strength</Text>
                            <Pressable onPress={() => diceRoll(1, 20, 'Strength Save')}>
                                <Text style={styles.modStyle}>{numberPresent(characterSaves.str_save)}{characterSaves.str_save}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Dexterity</Text>
                            <Pressable onPress={() => diceRoll(1, 20, 'Dexterity Save')}>
                                <Text style={styles.modStyle}>{numberPresent(characterSaves.dex_save)}{characterSaves.dex_save}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Constitution</Text>
                            <Pressable onPress={() => diceRoll(1, 20, 'Constitution Save')}>
                                <Text style={styles.modStyle}>{numberPresent(characterSaves.con_save)}{characterSaves.con_save}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Intelligence</Text>
                            <Pressable onPress={() => diceRoll(1, 20, 'Intelligence Save')}>
                                <Text style={styles.modStyle}>{numberPresent(characterSaves.int_save)}{characterSaves.int_save}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Wisdom</Text>
                            <Pressable onPress={() => diceRoll(1, 20, 'Wisdom Save')}>
                                <Text style={styles.modStyle}>{numberPresent(characterSaves.wis_save)}{characterSaves.wis_save}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Charisma</Text>
                            <Pressable onPress={() => diceRoll(1, 20, 'Charisma Save')}>
                            <Text style={styles.modStyle}>{numberPresent(characterSaves.cha_save)}{characterSaves.cha_save}</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
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
        paddingVertical: 35
    },
    boxStyle: {
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#4A0C05',
        borderRadius: 5,
        flexBasis: 115
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
        marginBottom: 9,
        marginTop: 2,
        borderWidth: 2,
        borderColor: '#4A0C05',
        alignSelf: 'center',
        width: '50%',
        borderRadius: 5
    },
    headingStyle: {
        fontSize: 30,
        //backgroundColor: '#263238',
        color: 'white',
        textAlign: 'center',
        marginBottom: 15
    },
    imgBackground: {
        width: '100%'
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
    }
})

export default AbilitiesScreen