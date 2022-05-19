import React, {useContext} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import AbilitiesContext from '../context/AbilitiesContext'

const AbilitiesScreen = () => {
    const characterAbilities = useContext(AbilitiesContext)
    //need to add ability score improvements somehow

    return (
        <View>    
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
                    <Text style={styles.textStyle}>{characterAbilities.Constitution}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Intelligence</Text>
                    <Text style={styles.textStyle}>{characterAbilities.Intelligence}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Wisdom</Text>
                    <Text style={styles.textStyle}>{characterAbilities.Wisdom}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Charisma</Text>
                    <Text style={styles.textStyle}>{characterAbilities.Charisma}</Text>
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
    }
})

export default AbilitiesScreen