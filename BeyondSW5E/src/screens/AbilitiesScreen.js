import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import charAbilities from '../../data/jalenOrso'

const AbilitiesScreen = () => {
    return (
        <View>    
            <View style={styles.parentStyle}>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Strength</Text>
                    <Text style={styles.textStyle}>{charAbilities.baseAbilityScores.Strength}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Dexterity</Text>
                    <Text style={styles.textStyle}>{charAbilities.baseAbilityScores.Dexterity}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Constitution</Text>
                    <Text style={styles.textStyle}>{charAbilities.baseAbilityScores.Constitution}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Intelligence</Text>
                    <Text style={styles.textStyle}>{charAbilities.baseAbilityScores.Intelligence}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Wisdom</Text>
                    <Text style={styles.textStyle}>{charAbilities.baseAbilityScores.Wisdom}</Text>
                </View>
                <View style={styles.boxStyle}>
                    <Text style={styles.textStyle}>Charisma</Text>
                    <Text style={styles.textStyle}>{charAbilities.baseAbilityScores.Charisma}</Text>
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