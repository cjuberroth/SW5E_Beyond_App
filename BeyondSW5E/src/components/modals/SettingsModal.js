import React, { useContext, useEffect, useState } from 'react'
import { View, Pressable, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome5 } from '@expo/vector-icons'
import { Select, SelectModalProvider } from '@mobile-reality/react-native-select-pro'
import SettingsContext from '../../context/SettingsContext'
import factions from '../../../data/factions.json'

const SettingsModal = () => {
    const navigation = useNavigation()
    let localEmblem = ''
    const { emblemText } = useContext(SettingsContext)
    const { updateEmblem, updateEmblemText } = useContext(SettingsContext)

    const handleSetValue = async () => {
        try {
            await AsyncStorage.setItem('emblem', localEmblem).then(updateEmblem(localEmblem))
            await AsyncStorage.setItem('emblemText', localEmblem).then(updateEmblemText(localEmblem))
        } catch (error) {
            console.log('Error saving value: ', error)
        }
    }

    const handleSelect = (item) => {
        localEmblem = item.value
    }

    const handleRemoveFaction = async () => {
        try {
            await AsyncStorage.removeItem('emblem').then(updateEmblem(''))
            await AsyncStorage.removeItem('emblemText').then(updateEmblemText(''))
        } catch (error) {
            console.log('Error removing data: ', error)
        }
    }

    return (
        <SelectModalProvider>
            <View style={styles.modalContainer}>
                <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                <View style={ styles.modalInner }>
                    <View style={ styles.modalHeader }>
                        <Pressable style={ styles.modalCloseButton } onPress={() => {navigation.goBack()}} >
                            <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                        </Pressable>
                        <Text style={ styles.modalHeaderText }>Settings</Text>
                    </View>
                    <View>
                        <Text style={styles.modalSubheadText}>Choose Alignment</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Pressable onPress={() => console.log('Light Side')}
                                style={styles.modalButtons}>
                                <Text style={{fontSize: 18}}>Light Side</Text>
                            </Pressable>
                            <Pressable onPress={() => console.log('Dark Side')}
                                style={styles.modalButtons}>
                                <Text style={{fontSize: 18}}>Dark Side</Text>
                            </Pressable>
                        </View>
                        <Text style={styles.modalSubheadText}>Choose Faction: ({emblemText})</Text>
                        <View >
                            <Select options={factions}
                                closeOptionsListOnSelect={true}
                                scrollToSelectedOption={true}
                                //searchable={true}
                                onSelect={handleSelect} />
                        </View>
                        <Pressable onPress={() => handleRemoveFaction()}>
                            <Text style={styles.modalRemoveButton}>Remove Faction</Text>
                        </Pressable>
                        <Pressable style={styles.modalButton} onPress={() => handleSetValue()}>
                            <Text style={styles.modalButtonText}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SelectModalProvider>
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
        //height: '80%',
        width: '95%',
        backgroundColor: '#ECEFF1',
        //justifyContent: 'center',
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
    modalSubheadText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        paddingBottom: 5
    },
    modalButtons: {
        paddingBottom: 5
    },
    modalButton: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#4A0C05',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%',
        flexDirection: 'row',
        marginBottom: 5
    },
    modalButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        padding: 5
    },
    modalRemoveButton: {
        fontSize: 14,
        color: 'red',
        alignSelf: 'center',
        paddingVertical: 7
    }
})

export default SettingsModal