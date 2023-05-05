import React, { useContext, useState } from 'react'
import { View, Pressable, Text, StyleSheet, FlatList, Alert } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import AppStyles from '../../styles/AppStyles'
import CheckBox from '../CheckBox'
import { Select, SelectModalProvider } from '@mobile-reality/react-native-select-pro'
import CharacterContext from '../../context/CharacterContext'
import DiceRoll from '../DiceRolls'

const ShortRestModal = () => {
    const navigation = useNavigation()
    const [checkedReset, onChangeReset] = useState(false)
    const [checkedApply, onChangeApply] = useState(true)
    const [message, setMessage] = useState('')
    const charClasses = useContext(CharacterContext).characterInformation.classes
    const conMod = useContext(CharacterContext).characterMods.con_mod
    const classData = useContext(CharacterContext).apiData.class
    const maximumHP = useContext(CharacterContext).characterInformation.hitPoints
    const { maxHP, setMaxHP } = useContext(CharacterContext)
    const { tempHitPoints, setTempHitPoints } = useContext(CharacterContext)
    const [totalMod, setTotalMod] = useState(conMod)
    const {shortRestHitDice, setShortRestHitDice} = useContext(CharacterContext)
    const {shortRestDice, setShortRestDice} = useContext(CharacterContext)
    const {shortRestHitDiceUsed, setShortRestHitDiceUsed} = useContext(CharacterContext)
    const [hitDiceUsed, setHitDiceUsed] = useState([])
    const {hitPoints, setHitPoints} = useContext(CharacterContext)

    const closeModal = () => {
        setMessage('')
        navigation.dispatch(StackActions.pop(2))
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

    let numLevels = 0
    const getLevels = (charClass) => {
        if (shortRestHitDiceUsed.length == 1) { //this is the first load or none completed
            for(i = 0; i < charClasses.length; i++) {
                if (charClasses[i].class === charClass) {
                    numLevels = charClasses[i].level
                    var array = []
                    for (j = 1; j <= numLevels; j++) {
                        array.push({label: j, value: charClass})
                    }
                }
            }
        } else { //a short rest has been completed
            if (!shortRestHitDiceUsed.some(obj => obj.class == charClass)) {
                for(i = 0; i < charClasses.length; i++) {
                    if (charClasses[i].class === charClass) {
                        numLevels = charClasses[i].level
                        var array = []
                        for (j = 1; j <= numLevels; j++) {
                            array.push({label: j, value: charClass})
                        }
                    }
                }
            } else {
                for(i = 0; i < charClasses.length; i++) {
                    if (charClasses[i].class === charClass) {
                        numLevels = charClasses[i].level - getNumDice(charClass)
                        var array = []
                        for (j = 1; j <= numLevels; j++) {
                            array.push({label: j, value: charClass})
                        }
                    }
                }
            }
        }
        
        return array
    }

    const updateUsed = (keyToUpdate, valueToUpdate, diceToAdd) => {
        setShortRestHitDiceUsed((prevArray) => {
            const updatedArray = prevArray.map((item) => {
                if (item[keyToUpdate] === valueToUpdate) {
                    return {
                        ...item,
                        numDice: item.numDice + diceToAdd
                    }
                } else {
                    return item
                }
            })
            return updatedArray
        })
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
        } else {
            setMessage(message + ' + ' + item.label + 'd' + getHitDie(item.value))
        }
        setTotalMod(conMod * item.label)
        setShortRestDice([...shortRestDice, item.label])
        setShortRestHitDice([...shortRestHitDice, getHitDie(item.value)])
        setHitDiceUsed((prev) => [...prev, {class: item.value, numDice: item.label}])
    }

    const handleAutoHealCheckbox = () => {
        onChangeApply(!checkedApply)
    }

    const handleResetHPCheckbox = () => {
        onChangeReset(!checkedReset)
    }
    
    let healResult = 0
    const completeShortRest = () => {
        for (i = 0; i < hitDiceUsed.length; i++) {
            let temp = hitDiceUsed[i].class
            let tempDice = hitDiceUsed[i].numDice
            if (shortRestHitDiceUsed.some(obj => obj.class === temp)) {
                updateUsed("class", temp, tempDice)
            } else {
                setShortRestHitDiceUsed((prev) => [...prev, {class: temp, numDice: tempDice}])
            }
        }
        
        for (i = 0; i < shortRestDice.length; i++) {
            healResult = healResult + DiceRoll(shortRestDice[i], shortRestHitDice[i])
        }
        setMessage('')
        setShortRestDice([])
        setShortRestHitDice([])
        
        if (checkedApply) {
            if ((healResult + hitPoints) > maximumHP) {
                setHitPoints(maximumHP)
            } else {
                setHitPoints(healResult + totalMod + hitPoints)
            }
        }

        if (checkedReset) {
            setMaxHP(0)
            setTempHitPoints(0)
        }

        navigation.navigate('DiceResultModal', {rollResult: healResult, mod: totalMod, rollType: 'Short Rest', numDice: '', numSides: '', origin: 'shortRestModal'})
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
                        <Text style={ styles.modalHeaderText}>Short Rest   </Text>
                        <FontAwesome5 style={ styles.modalCloseButton } name="book-reader" />
                    </View>
                    <Text style={{fontSize: 14}}>A short rest is a period of downtime, at least 1 hour long, during which a character does nothing more strenuous than eating, drinking, reading, and tending to wounds.</Text>
                    <View style={ styles.modalHeading }>
                        <Text style={ styles.modalHeading }>Recover</Text>
                    </View>
                    <View style={ AppStyles.tableStyles.tableRow }>
                        <CheckBox 
                            checked={checkedReset}
                            onChange={handleResetHPCheckbox}
                            buttonStyle = {styles.checkboxBase}
                            activeButtonStyle = {styles.checkboxChecked} />
                        <Text style={{flex: 9, paddingLeft: 5, fontSize: 14}}>Reset max HP changes and clear temporary hit points during this rest</Text>
                    </View>
                    <View style={ AppStyles.tableStyles.tableRow }>
                        <CheckBox 
                            checked={checkedApply}
                            onChange={handleAutoHealCheckbox}
                            buttonStyle = {styles.checkboxBase}
                            activeButtonStyle = {styles.checkboxChecked} />
                        <Text style={{flex: 9, paddingLeft: 5, fontSize: 14}}>Automatically apply healing with roll result</Text>
                    </View>
                    { checkedApply ?
                            <Text></Text>
                            : <Text style={{fontSize: 12}}>Healing will not be applied automatically, but used dice will be tracked</Text>
                    }
                    <FlatList
                        data = { charClasses }
                        keyExtractor = {(item) => item.class}
                        renderItem = {({ item }) => {
                            return (
                                <>
                                    <Text style={{paddingTop: 10, fontWeight: 'bold'}}>{item.class} (Hit Die: 1d{getHitDie(item.class)}+{conMod})</Text>
                                    <View>
                                        <Select options={getLevels(item.class)}
                                            closeOptionsListOnSelect={true}
                                            onSelect={handleSelect}
                                            style={styles.select} />
                                        <Text style={{paddingBottom: 5}}>Select between 1 and {item.level-getNumDice(item.class)} dice</Text>
                                    </View>
                                </>
                            )
                        }}
                    />
                    { message == ''?
                        <Text style={{marginTop: 30}}></Text>
                        : <Text style={{textAlign: 'center', marginTop: 30, paddingTop: 15}}>{message} + {totalMod}</Text>
                    }
                    <Pressable style={styles.modalButton} onPress={() => completeShortRest()}>
                        <Text style={styles.modalButtonText}>Complete Short Rest</Text>
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

export default ShortRestModal