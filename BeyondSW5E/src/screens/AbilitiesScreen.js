import React, { useContext } from 'react'
import { Text, View, StyleSheet, ImageBackground, Animated, ScrollView, Image } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles';

const AbilitiesScreen = () => {
    
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    
    //import character data from context
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterAbilities = useContext(CharacterContext).characterAbilities
    const characterMods = useContext(CharacterContext).characterMods
    const characterSaves = useContext(CharacterContext).characterSaves
    const numberPresent = useContext(CharacterContext).functions.numberPresent

    return (
        // This style import is a POC for the ability to extract common styles into a separate file
        <View style={AppStyles.globalStyles.parentContainerView}>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            
            <View style={{ flex: flexValue }}>
            <ImageBackground style={{height: '100%', resizeMode: 'contain'}}
                    source={require('../../assets/header-background.jpg')}>
                <ScrollView>
                    <ImageBackground style={styles.imgBackground} source={require('../../assets/rebel-alliance.png')}>
                        <View style={styles.parentStyle}>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Strength</Text>
                                <Text style={styles.modStyle}>{numberPresent(characterMods.str_mod)}{characterMods.str_mod}</Text>
                                <Text style={styles.textStyle}>{characterAbilities.abilitiesStrength}</Text>
                            </View>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Dexterity</Text>
                                <Text style={styles.modStyle}>{numberPresent(characterMods.dex_mod)}{characterMods.dex_mod}</Text>
                                <Text style={styles.textStyle}>{characterAbilities.abilitiesDexterity}</Text>
                            </View>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Constitution</Text>
                                <Text style={styles.modStyle}>{numberPresent(characterMods.con_mod)}{characterMods.con_mod}</Text>
                                <Text style={styles.textStyle}>{characterAbilities.abilitiesConstitution}</Text>
                            </View>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Intelligence</Text>
                                <Text style={styles.modStyle}>{numberPresent(characterMods.int_mod)}{characterMods.int_mod}</Text>
                                <Text style={styles.textStyle}>{characterAbilities.abilitiesIntelligence}</Text>
                            </View>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Wisdom</Text>
                                <Text style={styles.modStyle}>{numberPresent(characterMods.wis_mod)}{characterMods.wis_mod}</Text>
                                <Text style={styles.textStyle}>{characterAbilities.abilitiesWisdom}</Text>
                            </View>
                            <View style={styles.boxStyle}>
                                <Text style={styles.textStyle}>Charisma</Text>
                                <Text style={styles.modStyle}>{numberPresent(characterMods.cha_mod)}{characterMods.cha_mod}</Text>
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
                            <Text style={styles.modStyle}>{numberPresent(characterSaves.str_save)}{characterSaves.str_save}</Text>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Dexterity</Text>
                            <Text style={styles.modStyle}>{numberPresent(characterSaves.dex_save)}{characterSaves.dex_save}</Text>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Constitution</Text>
                            <Text style={styles.modStyle}>{numberPresent(characterSaves.con_save)}{characterSaves.con_save}</Text>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Intelligence</Text>
                            <Text style={styles.modStyle}>{numberPresent(characterSaves.int_save)}{characterSaves.int_save}</Text>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Wisdom</Text>
                            <Text style={styles.modStyle}>{numberPresent(characterSaves.wis_save)}{characterSaves.wis_save}</Text>
                        </View>
                        <View style={styles.boxStyle}>
                            <Text style={styles.textStyle}>Charisma</Text>
                            <Text style={styles.modStyle}>{numberPresent(characterSaves.cha_save)}{characterSaves.cha_save}</Text>
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
        borderColor: 'white',
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
        marginTop: 2
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