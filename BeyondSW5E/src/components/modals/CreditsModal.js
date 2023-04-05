import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../../context/CharacterContext'

const CreditsModal = ({ navigation }) => {
    const { credits, setCredits } = useContext(CharacterContext)
    const [creditChange, setCreditChange] = useState()

    const changeCredits = (number) => {
        let temp = parseInt(number)
        setCredits(credits + temp)
    }

    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={() => {navigation.goBack()}} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText }>Manage Credits</Text>
                </View>
                <View style={ styles.creditsContainer }>
                    <Text style={ styles.creditsText }>Credits: {credits}</Text>
                </View>
                    <TextInput style={styles.textInput}
                                placeholder={'Enter Value'}
                                value={creditChange}
                                keyboardType='numeric'
                                onChangeText={number => setCreditChange(number)}
                    />
                    <Pressable style={ styles.addButton } onPress={() => changeCredits(creditChange)}>
                        <Text style={ styles.modalButtonText }>Add</Text>
                    </Pressable>
                    <Pressable style={ styles.subtractButton } onPress={() => changeCredits(-creditChange)}>
                        <Text style={ styles.modalButtonText }>Subtract</Text>
                    </Pressable>
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
        paddingVertical: 5,
        width: '95%',
        backgroundColor: '#ECEFF1',
        borderRadius: 5
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 30
    },
    modalHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    creditsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 50,
        paddingBottom: 50
    },
    creditsText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    addButtonContainer: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 10,
    },
    subtractButtonContainer: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 10,
    },
    modalCloseButton: {
        fontSize: 25, 
        color: 'black',
        padding: 2,
        paddingLeft: 4
    },
    addButton: {
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
    subtractButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#EB212E',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%'
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        padding: 5
    },
    textInput: {
        minWidth: '80%', 
        marginBottom: 12,
        marginHorizontal: 12, 
        borderWidth: 1, 
        borderRadius: 5,
        padding: 10
    }
})

export default CreditsModal