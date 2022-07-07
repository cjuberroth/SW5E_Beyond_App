import React, {useContext} from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CharacterContext from '../context/CharacterContext'
import AbilitiesContext from '../context/AbilitiesContext'
import SkillsContext from '../context/SkillsContext'

const AbilitiesScreen = () => {
    const characterAbilities = useContext(AbilitiesContext)
    const characterMods = useContext(SkillsContext)

    const numberPresent = function(score) {
        if(score >= 0) {
            return "+"
        } else {
            return
        }
    }

/*    return (
        <View style={styles.containerStyle}>    
            <Text style={styles.headerStyle}>{characterAbilities.name}</Text>
            
            <View style={styles.parentStyle}>
                <View style={styles.boxStyle}>
                    <ImageBackground style={styles.imgBackground} source={require('../../assets/rebel-alliance2.png')}>
                        <Text style={styles.textStyle}>Strength</Text>
                        <Text style={styles.modStyle}>{numberPresent(characterMods.str_mod)}{characterMods.str_mod}</Text>
                        <Text style={styles.textStyle}>{characterAbilities.abilitiesStrength}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.boxStyle}>
                    <ImageBackground style={styles.imgBackground} source={require('../../assets/rebel-alliance2.png')}>
                        <Text style={styles.textStyle}>Dexterity</Text>
                        <Text style={styles.modStyle}>{numberPresent(characterMods.dex_mod)}{characterMods.dex_mod}</Text>
                        <Text style={styles.textStyle}>{characterAbilities.abilitiesDexterity}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.boxStyle}>
                    <ImageBackground style={styles.imgBackground} source={require('../../assets/rebel-alliance2.png')}>
                        <Text style={styles.textStyle}>Constitution</Text>
                        <Text style={styles.modStyle}>{numberPresent(characterMods.con_mod)}{characterMods.con_mod}</Text>
                        <Text style={styles.textStyle}>{characterAbilities.abilitiesConstitution}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.boxStyle}>
                    <ImageBackground style={styles.imgBackground} source={require('../../assets/rebel-alliance2.png')}>
                        <Text style={styles.textStyle}>Intelligence</Text>
                        <Text style={styles.modStyle}>{numberPresent(characterMods.int_mod)}{characterMods.int_mod}</Text>
                        <Text style={styles.textStyle}>{characterAbilities.abilitiesIntelligence}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.boxStyle}>
                    <ImageBackground style={styles.imgBackground} source={require('../../assets/rebel-alliance2.png')}>
                        <Text style={styles.textStyle}>Wisdom</Text>
                        <Text style={styles.modStyle}>{numberPresent(characterMods.wis_mod)}{characterMods.wis_mod}</Text>
                        <Text style={styles.textStyle}>{characterAbilities.abilitiesWisdom}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.boxStyle}>
                    <ImageBackground style={styles.imgBackground} source={require('../../assets/rebel-alliance2.png')}>
                        <Text style={styles.textStyle}>Charisma</Text>
                        <Text style={styles.modStyle}>{numberPresent(characterMods.cha_mod)}{characterMods.cha_mod}</Text>
                        <Text style={styles.textStyle}>{characterAbilities.abilitiesCharisma}</Text>
                    </ImageBackground>
                </View>
            </View>
        </View>
    )
}
*/

return (
    
        <View style={styles.containerStyle}>    
            
            <Text style={styles.headerStyle}>{characterAbilities.name}</Text>
            <ImageBackground style={styles.imgBackground} source={require('../../assets/rebel-alliance2.png')}>
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
        </View>
    
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'gray'
    },
    parentStyle: {
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    boxStyle: {
        height: 120,
        width: 120,
        marginBottom: 15,
        marginTop: 20 //this would need to be removed if going back to the individual symbols
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
    headerStyle: {
        fontSize: 30,
        backgroundColor: 'gray',
        color: 'white',
        textAlign: 'center',
        marginBottom: 15
    },
    imgBackground: {
        width: '100%',
        //height: '100%' //this would need to be added back if going back to the individual symbols
    }
})

export default AbilitiesScreen