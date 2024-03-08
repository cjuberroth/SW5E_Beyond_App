import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import useStore from '../../stores/store'
import calculateAbilityScores from '../logic/calculateAbilityScores'

const DefensesModal = ({ navigation }) => {
    const characterJSON = useStore((state) => state.characterJSON)
    const speciesData = useStore((state) => state.speciesData)
    const charName = useStore((state) => state.characterInformation.name)
    const charConditions = useStore((state) => state.characterInformation.conditions)
    const { apiData, characterAbilities, characterInformation } = useStore()
    const charClasses = useStore((state) => state.characterInformation.classes)
    const charSpecies = useStore((state) => state.characterInformation.species)
    //const abilities = calculateAbilityScores(characterJSON, speciesData)
    const abilities = useStore((state) => state.characterAbilities)
    const charArchetype = useStore((state) => state.characterInformation.archetype)

    //console.log(apiData.skillsData)
    
    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText}>Defenses, Immunities, and Vulnerabilities</Text>
                </View>
                <Text style = { styles.heading }>Defenses</Text>
                <Text style = { styles.textStyle }>Coming Soon!</Text>
                <Text style = { styles.heading }>Immunities</Text>
                <Text style = { styles.textStyle }>Coming Soon!</Text>
                <Text style = { styles.heading }>Vulnerabilities</Text>
                <Text style = { styles.textStyle }>Coming Soon!</Text>
                <Text style = { styles.heading }>Name</Text>
                <Text style = { styles.textStyle }>{charName}</Text>
                <Text style = { styles.heading }>Conditions</Text>
                <Text style = { styles.textStyle }>{characterInformation.conditions}</Text>
                <Text style = { styles.heading }>Species</Text>
                <Text style = { styles.textStyle }>{characterInformation.species}</Text>
                <Text style = { styles.heading }>Strength</Text>
                <Text style = { styles.textStyle }>{abilities.abilitiesStrength}</Text>
                <Text style = { styles.heading }>Dexterity</Text>
                <Text style = { styles.textStyle }>{abilities.abilitiesDexterity}</Text>
                <Text style = { styles.heading }>Constitution</Text>
                <Text style = { styles.textStyle }>{abilities.abilitiesConstitution}</Text>
                <Text style = { styles.heading }>Intelligence</Text>
                <Text style = { styles.textStyle }>{abilities.abilitiesIntelligence}</Text>
                <Text style = { styles.heading }>Wisdom</Text>
                <Text style = { styles.textStyle }>{abilities.abilitiesWisdom}</Text>
                <Text style = { styles.heading }>Charisma</Text>
                <Text style = { styles.textStyle }>{abilities.abilitiesCharisma}</Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    modalInner: {
        //height: '85%',
        width: '95%',
        backgroundColor: '#ECEFF1',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    modalHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    modalCloseButton: {
        fontSize: 25, 
        color: 'black',
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    textStyle: {
        fontSize: 12,
        color: 'black',
        marginLeft: 10
    }
})

export default DefensesModal