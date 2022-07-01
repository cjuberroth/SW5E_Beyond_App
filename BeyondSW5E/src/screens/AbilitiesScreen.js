import React, {useContext} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CharacterContext from '../context/CharacterContext'
import AbilitiesContext from '../context/AbilitiesContext'
import SkillsContext from '../context/SkillsContext'

const AbilitiesScreen = () => {
    const characterAbilities = useContext(AbilitiesContext)
    const characterMods = useContext(SkillsContext)

    return (
        <View>    
            <Text style={styles.headerStyle}>{characterAbilities.name}</Text>
            <Text style={styles.headerStyle}>Abilities</Text>
            <View style={styles.parentStyle}>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Strength</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesStrength}</Text>
                    <Text style={styles.textStyle}>Mod</Text>
                    <Text style={styles.textStyle}>{characterMods.str_mod}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Dexterity</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesDexterity}</Text>
                    <Text style={styles.textStyle}>Mod</Text>
                    <Text style={styles.textStyle}>{characterMods.dex_mod}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Constitution</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesConstitution}</Text>
                    <Text style={styles.textStyle}>Mod</Text>
                    <Text style={styles.textStyle}>{characterMods.con_mod}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Intelligence</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesIntelligence}</Text>
                    <Text style={styles.textStyle}>Mod</Text>
                    <Text style={styles.textStyle}>{characterMods.int_mod}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Wisdom</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesWisdom}</Text>
                    <Text style={styles.textStyle}>Mod</Text>
                    <Text style={styles.textStyle}>{characterMods.wis_mod}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Charisma</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesCharisma}</Text>
                    <Text style={styles.textStyle}>Mod</Text>
                    <Text style={styles.textStyle}>{characterMods.cha_mod}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parentStyle: {
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    boxStyle: {
        height: 120,
        width: 120,
        borderWidth: 5,
        borderColor: "black",
        marginBottom: 15
    },
    textStyle: {
        flexDirection: 'column',
        fontSize: 20,
        alignItems: 'center',
        textAlign: 'center'
    },
    headerStyle: {
        fontSize: 30
    }
})

export default AbilitiesScreen