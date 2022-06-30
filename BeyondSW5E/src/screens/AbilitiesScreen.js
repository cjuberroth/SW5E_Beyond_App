import React, {useContext} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CharacterContext from '../context/CharacterContext'
import AbilitiesContext from '../context/AbilitiesContext'

const AbilitiesScreen = () => {
    const characterAbilities = useContext(AbilitiesContext)

    return (
        <SafeAreaView>    
            <Text style={styles.headerStyle}>{characterAbilities.name}</Text>
            <Text style={styles.headerStyle}>Abilities</Text>
            <View style={styles.parentStyle}>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Strength</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesStrength}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Dexterity</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesDexterity}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Constitution</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesConstitution}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Intelligence</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesIntelligence}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Wisdom</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesWisdom}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Charisma</Text>
                    <Text style={styles.textStyle}>{characterAbilities.abilitiesCharisma}</Text>
                </View>
            </View>
        </SafeAreaView>
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