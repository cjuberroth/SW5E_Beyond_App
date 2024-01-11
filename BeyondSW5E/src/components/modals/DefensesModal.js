import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import useCharDataStore from '../../stores/charDataStore'
import useAPI_DataStore from '../../stores/apiDataStore'

const DefensesModal = ({ navigation }) => {
    const charName = useCharDataStore((state) => state.characterInformation.name)
    const charConditions = useCharDataStore((state) => state.characterInformation.conditions)
    const archetype = useAPI_DataStore((state) => state.api_Archetype)
    const charClasses = useCharDataStore((state) => state.characterInformation.classes)

    console.log('Name: ', archetype[2].name)
    console.log('Class Name: ', archetype[2].className)
    console.log('rowKey: ', archetype[2].rowKey)
    console.log('classes: ', charClasses)
    
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
                <Text style = { styles.textStyle }>{charConditions}</Text>
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