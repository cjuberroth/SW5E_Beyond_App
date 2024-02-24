import React, { useContext } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, Pressable, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import HeaderContext from '../../context/HeaderContext'
import CharacterContext from '../../context/CharacterContext'
import { useSettingsContext } from '../../context/SettingsContext'
import HeaderButton from '../header/HeaderButton'
import DiceRoll from '../DiceRolls'

const Header = () => {
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterMods = useContext(CharacterContext).characterMods
    const characterEquipment = useContext(CharacterContext).characterEquipment
    const numberPresent = useContext(CharacterContext).functions.numberPresent
    const navigation = useNavigation()
    const toggleHeader = useContext(HeaderContext).headerUtils.toggleHeader
    const toggleInspiration = useContext(HeaderContext).headerUtils.toggleInspiration
    const toggleInspirationStyle = useContext(HeaderContext).headerUtils.toggleInspirationStyle
    const { conditionsState } = useContext(CharacterContext)
    const { armorProficient } = useContext(CharacterContext)
    const { alignmentSettings } = useSettingsContext()

    const diceRoll = (numDice, numSides) => {
        const rollResult = DiceRoll(numDice, numSides)
        const dexMod = characterMods.dex_mod
        navigation.navigate('DiceResultModal', {rollResult: rollResult, mod: dexMod, rollType: 'Initiative', numDice: numDice, numSides: numSides})
    }

    const getConditions = () => {
        let numConditions = 0
        conditionsState.map((el) => {
            if (el.afflicted) {
                numConditions += 1
            }
        })
        return 'Conditions ' + '(' + numConditions + ')'
    }

    return (
        <ImageBackground style={ {flex:1} }
                source={require('../../../assets/starBackground.jpg')}>
            <View style={styles.headerContainer}>
                <View style={styles.headerBtnCol}>
                    <HeaderButton onPress={() => navigation.navigate('ConditionsModal')} title={getConditions()} buttonStyle={[styles.headerButton, {backgroundColor: alignmentSettings.headerButtonColor}]} />
                    <HeaderButton onPress={() => navigation.navigate('RestModal')} title="Rest" buttonStyle={[styles.headerButton, {backgroundColor: alignmentSettings.headerButtonColor}]} />
                </View>
                <Image
                    source={
                        characterInfo.image != '' ? {uri: characterInfo.image}
                        : require('../../../assets/defaultCharImage.png')
                    }
                    style={{ flex: 1, width: '100%', height: '100%', borderRadius: 5, borderWidth: 2, borderColor: 'rgba(21, 242, 253, 0.1)' }}
                    resizeMode={"cover"}
                />
                <View style={styles.headerBtnCol}>
                    <HeaderButton onPress={() => navigation.navigate('DefensesModal')} title="Defenses" buttonStyle={[styles.headerButton, {backgroundColor: alignmentSettings.headerButtonColor}]} />
                    <HeaderButton onPress={toggleInspiration} title="Inspiration" buttonStyle={toggleInspirationStyle} />
                </View>
            </View>
            <View style={[styles.headerStats, {borderBottomColor: alignmentSettings.headerButtonColor}]}>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Prof</Text>
                    <Text style={styles.statTextBig}>{numberPresent(characterInfo.proficiency) + characterInfo.proficiency}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Speed</Text>
                    <Text style={styles.statTextBig}>{characterInfo.speed + 'ft'}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Initiative</Text>
                    <Pressable style={styles.initiative} onPress={() => diceRoll(1, 20)}>
                        <Text style={styles.statTextBig}>{numberPresent(characterMods.dex_mod) + characterMods.dex_mod}</Text>
                        <FontAwesome5 name='dice-d20' style={[styles.d20, {color: alignmentSettings.d20Color}]} />
                    </Pressable>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>AC</Text>
                    { armorProficient ? 
                        <Text style={styles.statTextBig}>{characterEquipment.armorClass}</Text>
                    :
                        <Pressable style={{flexDirection: 'row'}} onPress={() => Alert.alert('Not Proficient', 'You are not proficient in the armor you have equipped.\n\nYou have disadvantage on any ability check, attack roll, or saving throw that involves Strength or Dexterity, and you can’t force or tech cast.')}>
                            <Text style={styles.statTextBig}>{characterEquipment.armorClass} </Text>
                            <FontAwesome5 name='exclamation' style={styles.nonProficient} />
                        </Pressable>
                    }
                </View>
            </View>
            <View style={[styles.collapseButton, {backgroundColor: alignmentSettings.headerButtonColor}]}>
                <Pressable style={{flexDirection: 'row', width: '84%'}} onPress={toggleHeader}>
                    <Text style={styles.collapseButtonText} adjustsFontSizeToFit> {characterInfo.name} | Lvl {characterInfo.level} </Text>
                    <FontAwesome5 style={ styles.icon } name='angle-up' adjustsFontSizeToFit />
                </Pressable>
                <Pressable style={{flexDirection: 'row'}} onPress={() => {navigation.navigate('DiceRollModal')}}>
                    <Text style={styles.collapseButtonText} adjustsFontSizeToFit numberOfLines={1}>Roll </Text>
                    <FontAwesome5 style={ styles.icond20 } name='dice-d20' adjustsFontSizeToFit numberOfLines={1}/>
                </Pressable>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 5
    },
    headerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        //backgroundColor: '#4A0C05',
        //backgroundColor: 'rgba(21, 242, 253, 0.1)',
        //backgroundColor: props.alignmentSettings.headerButtonColor,
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%'
      },
      headerButtonActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#15f2fd',
        //backgroundColor: '#4A0C05',
        backgroundColor: 'rgba(21, 242, 253, 0.1)',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%'
      },
      inspirationButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#15f2fd',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%'
      },
    headerBtnCol: {
        flex: 1,
        alignItems: 'center'
    },
    headerStats: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: 'rgba(21, 242, 253, 0.1)',
        borderBottomWidth: 2
    },
    statBox: {
        alignItems: 'center',
        paddingHorizontal: 20
    },
    statText: {
        color: 'white'
    },
    statTextBig: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    },
    initiative: {
        fontSize: 25,
        color: 'white',
        //borderColor: '#4A0C05',
        //borderRadius: 4,
        //borderWidth: 2,
        textAlign: 'center',
        width: '90%'
    },
    collapseButton: {
        flexDirection: 'row',
        width: '100%',
        //justifyContent: 'space-between',
        //backgroundColor: '#4A0C05',
        backgroundColor: 'rgba(21, 242, 253, 0.1)',
        flex: 1.5,
        alignItems: 'center'
    },
    collapseButtonText: {
        //fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: -5,
        alignSelf: 'center'
    },
    icon: {
        fontSize: 20, 
        color: 'white',
        alignSelf: 'center',
        paddingRight: 5
    },
    icond20: {
        fontSize: 15, 
        color: 'white',
        alignSelf: 'center',
        paddingRight: 2
    },
    d20: {
        fontSize: 36, 
        position: 'absolute',
        top: -3,
        right: 5,
        color: 'rgba(21, 242, 253, 0.4)'
    },
    nonProficient: {
        fontSize: 20, 
       /*  position: 'absolute',
        top: -3,
        right: 4, */
        color: 'rgba(204, 0, 0, 0.9)',
        marginTop: 5
    }
})

export default Header

