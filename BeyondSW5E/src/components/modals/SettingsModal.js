import React, { useContext, useEffect, useState } from 'react'
import { View, Pressable, Text, StyleSheet, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome5 } from '@expo/vector-icons'
import { Select, SelectModalProvider } from '@mobile-reality/react-native-select-pro'
import { useSettingsContext } from '../../context/SettingsContext'
import factions from '../../../data/factions.json'

const SettingsModal = () => {
    const navigation = useNavigation()
    const { emblemText } = useSettingsContext()
    const { updateEmblem, updateEmblemText } = useSettingsContext()
    const { alignment, setAlignment } = useSettingsContext()
    const { diceRollSound, setDiceRollSound } = useSettingsContext()

    const handleSelect = async (item) => {
        try {
            await AsyncStorage.setItem('emblem', item.value).then(updateEmblem(item.value))
            await AsyncStorage.setItem('emblemText', item.value).then(updateEmblemText(item.value))
            //await AsyncStorage.setItem('alignment', localAlignment).then(setAlignment(localAlignment))
        } catch (error) {
            console.log('Error saving value: ', error)
        }
    }

    const handleRemoveFaction = async () => {
        try {
            await AsyncStorage.removeItem('emblem').then(updateEmblem(''))
            await AsyncStorage.removeItem('emblemText').then(updateEmblemText(''))
        } catch (error) {
            console.log('Error removing data: ', error)
        }
    }

    const handleAlignment = async (value) => {
        try {
            await AsyncStorage.setItem('alignment', value).then(setAlignment(value))
        } catch (error) {
            console.log('Error saving value: ', error)
        }
    }

    const toggleSwitch = async (newValue) => {
        try {
            await AsyncStorage.setItem('diceRollSound', JSON.stringify(newValue))
            setDiceRollSound(newValue)
        } catch (error) {
            console.log('Error saving value: ', error)
        }
    }

    useEffect(() => {
        const getDiceSoundValue = async () => {
            try {
                const value = await AsyncStorage.getItem('diceRollSound')
                if (value !== null) {
                    setDiceRollSound(JSON.parse(value))
                } 
            } catch (error) {
                    console.log('Error getting dice roll sound value: ', error)
            }
        }
        getDiceSoundValue()
    }, [])

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
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.modalSubheadText}>Dice Roll Sound:   </Text>
                            <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor='#f4f3f4'
                                ios_backgroundColor='#3e3e3e'
                                onValueChange={toggleSwitch}
                                value={diceRollSound}
                            />
                        </View>
                        <Text style={styles.modalSubheadText}>Choose Alignment</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Pressable onPress={() => handleAlignment('Light')}
                                style={alignment === 'Light' ? [styles.modalButtons, styles.alignmentSelected] : styles.modalButtons}>
                                <Text style={{fontSize: 18}}>Light Side</Text>
                            </Pressable>
                            <Pressable onPress={() => handleAlignment('Neutral')}
                                style={alignment === 'Neutral' ? [styles.modalButtons, styles.alignmentSelected] : styles.modalButtons}>
                                <Text style={{fontSize: 18}}>Neutral</Text>
                            </Pressable>
                            <Pressable onPress={() => handleAlignment('Dark')}
                                style={alignment === 'Dark' ? [styles.modalButtons, styles.alignmentSelected] : styles.modalButtons}>
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
        paddingVertical: 5
    },
    modalButtons: {
        padding: 5
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
    },
    alignmentSelected: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'black'
    }
})

export default SettingsModal