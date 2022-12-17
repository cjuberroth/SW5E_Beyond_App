import React, { useContext } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import HeaderContext from '../context/HeaderContext'
import CharacterContext from '../context/CharacterContext'
import HeaderButton from './HeaderButton'
import DiceRoll from './DiceRolls'

const Header = () => {
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterMods = useContext(CharacterContext).characterMods
    const characterEquipment = useContext(CharacterContext).characterEquipment
    const numberPresent = useContext(CharacterContext).functions.numberPresent
    const navigation = useNavigation()
    const toggleHeader = useContext(HeaderContext).headerUtils.toggleHeader
    const toggleInspiration = useContext(HeaderContext).headerUtils.toggleInspiration
    const toggleInspirationStyle = useContext(HeaderContext).headerUtils.toggleInspirationStyle

    const diceRoll = (numDice, numSides) => {
        const rollResult = DiceRoll(numDice, numSides)
        const dexMod = characterMods.dex_mod
        navigation.navigate('DiceResultModal', {rollResult: rollResult, mod: dexMod, rollType: 'Initiative', numDice: numDice, numSides: numSides})
    }

    return (
        <ImageBackground style={ {flex:1} }
                source={require('../../assets/header-background-upsidedown.jpg')}>
            <View style={styles.headerContainer}>
                <View style={styles.headerBtnCol}>
                    <HeaderButton onPress={() => navigation.navigate('ConditionsModal')} title="Conditions" buttonStyle={styles.headerButton} />
                    <HeaderButton onPress={() => navigation.navigate('RestModal')} title="Rest" buttonStyle={styles.headerButton} />
                </View>
                <Image
                    source={
                        characterInfo.image != '' ? {uri: characterInfo.image}
                        : require('../../assets/defaultCharImage.png')
                    }
                    style={{ flex: 1, width: '100%', height: '100%', borderRadius: 5, borderWidth: 2, borderColor: '#4A0C05' }}
                    resizeMode={"cover"}
                />
                <View style={styles.headerBtnCol}>
                    <HeaderButton onPress={() => navigation.navigate('DefensesModal')} title="Defenses" buttonStyle={styles.headerButton} />
                    <HeaderButton onPress={toggleInspiration} title="Inspiration" buttonStyle={toggleInspirationStyle} />
                </View>
            </View>
            <View style={styles.headerStats}>
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
                    </Pressable>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>AC</Text>
                    <Text style={styles.statTextBig}>{characterEquipment.armorClass}</Text>
                </View>
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
                <Pressable style={styles.collapseButton } onPress={toggleHeader}>
                    <Text style={styles.collapseButtonText}>{characterInfo.name}</Text>
                    <Text style={styles.collapseButtonText}> | Lvl {characterInfo.level} </Text>
                    <FontAwesome5 style={ styles.icon } name='angle-up' />
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
        backgroundColor: '#4A0C05',
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
        borderBottomColor: '#4A0C05', 
        borderBottomWidth: 2
    },
    statBox: {
        alignItems: 'center'
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
        borderColor: '#4A0C05',
        borderRadius: 4,
        borderWidth: 2,
        textAlign: 'center',
        width: '90%'
    },
    collapseButton: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#4A0C05',
        flex: 1,
        alignItems: 'center'
    },
    collapseButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        //paddingHorizontal: 5
    },
    icon: {
        fontSize: 25, 
        color: 'white',
        alignSelf: 'center',
        paddingRight: 5
      },
})

export default Header

