import React, { useContext, useState } from 'react'
import { View, Pressable, Text, StyleSheet, FlatList, Alert } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import AppStyles from '../../styles/AppStyles'
import { Select, SelectModalProvider, SelectProvider } from '@mobile-reality/react-native-select-pro'
import CharacterContext from '../../context/CharacterContext'
import DiceRoll from '../DiceRolls'

const recoverHitDiceModal = () => {
    const navigation = useNavigation()
    const [message, setMessage] = useState('')
    const conMod = useContext(CharacterContext).characterMods.con_mod
    const classData = useContext(CharacterContext).apiData.class
    const [totalMod, setTotalMod] = useState(conMod)
    const {shortRestHitDice, setShortRestHitDice} = useContext(CharacterContext)
    const {shortRestDice, setShortRestDice} = useContext(CharacterContext)
    const {shortRestHitDiceUsed, setShortRestHitDiceUsed} = useContext(CharacterContext)

    const closeModal = () => {
        navigation.dispatch(StackActions.pop(2))
        setMessage('')
    }

    const getHitDie = (charClass) => {
        for(i = 0; i < classData.length; i++) {
            if (classData[i].name === charClass) {
                return classData[i].hitDiceDieType
            }
        }
    }

    const getNumDice = (key) => {
        for (let z = 0; z < shortRestHitDiceUsed.length; z++) {
            if (shortRestHitDiceUsed[z].class === key) {
                return shortRestHitDiceUsed[z].numDice
            }
        }
        return null
    }

    const getDice = (charClass) => {
        if (shortRestHitDiceUsed.length == 1) { //no hit dice have been spent
            return
        } else { //there are spent hit dice
            if (!shortRestHitDiceUsed.some(obj => obj.class == charClass)) {
                var array = []
                const index = shortRestHitDiceUsed.findIndex(item => item.class === charClass)
                for (i = 1; i <= shortRestDiceUsed[index].numDice; i++) {
                    array.push({label: i, value: charClass})
                }
            } 
        }
        
        return array
    }

    const updateUsed = (key, value) => {
        const index = shortRestHitDiceUsed.findIndex(item => item.class === key)
        let usedDice = shortRestHitDiceUsed[index].numDice
        if (index !== -1) {
            const updatedUsed = [...shortRestHitDiceUsed]
            updatedUsed[index] = { ...shortRestHitDiceUsed[index], "numDice": usedDice + value }
            setShortRestHitDiceUsed(updatedUsed)
        }
    }

    const [beenSelected, setBeenSelected] = useState([])
    const handleSelect = (item) => {
        setBeenSelected([...beenSelected, item.value])
        if (beenSelected.includes(item.value)) {
            Alert.alert('Selection Changed', 'Adjusting a selection has not been implemented yet. This is coming in a future release. You will have to start your Short Rest selection over. We apologize for the inconvenience.')
            closeModal()
        }
        if (message == '') {
            setMessage('Recover: ' + item.label + 'd' + getHitDie(item.value))
            if (shortRestHitDiceUsed.some(obj => obj.class === item.value)) {
                updateUsed(item.value, item.label)
            } else {
                setShortRestHitDiceUsed((prev) => [...prev, {class: item.value, numDice: item.label}])
            }
        } else {
            setMessage(message + ' + ' + item.label + 'd' + getHitDie(item.value))
            if (shortRestHitDiceUsed.some(obj => obj.class === item.value)) {
                updateUsed(item.value, item.label)
            } else {
                setShortRestHitDiceUsed((prev) => [...prev, {class: item.value, numDice: item.label}])
            }
        }
    }

    const recoverDice = () => {
        Alert.alert('Recovered!', 'You have recovered ')
    }

    return (
        <SelectModalProvider>
            <View style={ styles.modalContainer}>
                <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={closeModal}/>
                <View style={ styles.modalInner }>
                    <View style={ styles.modalHeader }>
                        <Pressable style={ styles.modalCloseButton } onPress={closeModal} >
                            <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                        </Pressable>
                        <Text style={ styles.modalHeaderText}>Recover Hit Dice</Text>
                        <FontAwesome5 style={ styles.modalCloseButton } name="dice-d20" />
                    </View>
                    <Text style={{fontSize: 14}}>Of the spent hit dice, choose which dice to recover.</Text>
                    <View style={ styles.modalHeading }>
                        <Text style={ styles.modalHeading }>Recover</Text>
                    </View>
                    <FlatList
                        data = { shortRestHitDiceUsed }
                        keyExtractor = {(item) => item.class}
                        renderItem = {({ item }) => {
                            return (
                                <>
                                    <Text style={{paddingTop: 10, fontWeight: 'bold'}}>{item.class} (Hit Die: 1d{getHitDie(item.class)}+{conMod})</Text>
                                    <View>
                                        <Select options={getDice(item.class)}
                                            closeOptionsListOnSelect={true}
                                            onSelect={handleSelect}
                                            style={styles.select} />
                                        <Text style={{paddingBottom: 5}}>Select between 1 and {getNumDice(item.class)} dice</Text>
                                    </View>
                                </>
                            )
                        }}
                    />
                    { message == ''?
                        <Text></Text>
                        : <Text style={{textAlign: 'center', paddingTop: 15}}>{message}</Text>
                    }
                    <Pressable style={styles.modalButton} onPress={() => recoverDice()}>
                        <Text style={styles.modalButtonText}>Recover Hit Dice</Text>
                    </Pressable>
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
        //height: '75%',
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
    modalHeading: {
        alignItems: 'center',
        fontSize: 20,
        paddingTop: 10
    },
    checkboxView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    checkboxBase: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'transparent',
        height: 20,
        marginHorizontal: 1
      },
      checkboxChecked: {
        backgroundColor: 'black',
      },
      select: {
        width: '40%',
        height: 100
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
})

export default recoverHitDiceModal