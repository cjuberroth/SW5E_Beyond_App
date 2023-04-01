import React, { useContext, useState } from 'react'
import { View, Pressable, Text, StyleSheet, Alert } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import AppStyles from '../../styles/AppStyles'
import CharacterContext from '../../context/CharacterContext'
import CheckBox from '../CheckBox'

const LongRestModal = () => {
    const navigation = useNavigation()
    const charData = useContext(CharacterContext).characterInformation
    const classData = useContext(CharacterContext).apiData.class
    const { hitPoints, setHitPoints } = useContext(CharacterContext)
    const [checkedReset, onChangeReset] = useState(false)
    const [checkedApply, onChangeApply] = useState(true)
    const [checkedHitDice, onChangeHitDice] = useState(true)
    const { shortRestHitDiceUsed, setShortRestHitDiceUsed } = useContext(CharacterContext)
    let tempHitDiceArray = shortRestHitDiceUsed
    const hitDice = []
    let hitDiceRecovery = false

    tempHitDiceArray = tempHitDiceArray.slice(1)

    let numberOfDice = 0
    for (i = 0; i < tempHitDiceArray.length; i++) {
        numberOfDice = numberOfDice + tempHitDiceArray[i].numDice
    }

    if (numberOfDice != 0) {
        hitDiceRecovery =  true
    }
    
    const closeModal = () => {
        navigation.dispatch(StackActions.pop(2))
    }

    const getHitDie = (charClass) => {
        for(i = 0; i < classData.length; i++) {
            if (classData[i].name === charClass) {
                return classData[i].hitDiceDieType
            }
        }
    }

    for (let i = 0; i < tempHitDiceArray.length; i++) {
        let tempClass = tempHitDiceArray[i].class
        let tempNumDice = tempHitDiceArray[i].numDice
        let tempHitDie = getHitDie(tempClass)

        hitDice.push({class: tempClass, numDice: tempNumDice, hitDie: tempHitDie})
    }
    
    hitDice.sort((a, b) => b.hitDie - a.hitDie)

    const handleAutoHealCheckbox = () => {
        onChangeApply(!checkedApply)
    }

    const handleHitDiceCheckbox = () => {
        onChangeHitDice(!checkedHitDice)
    }

    const updateUsed = (keyToUpdate, valueToUpdate, diceToSubtract) => {
        setShortRestHitDiceUsed((prevArray) => {
            const updatedArray = prevArray.map((item) => {
                if (item[keyToUpdate] === valueToUpdate) {
                    return {
                        ...item,
                        numDice: item.numDice - diceToSubtract
                    }
                } else {
                    return item
                }
            })
            return updatedArray
        })
    }
    
    const takeLongRest = () => {
        if (checkedApply) {
            setHitPoints(charData.hitPoints)
        }
        //there will need to be code here later to reset max hp changes once they've been implemented
        
        
        if (!checkedHitDice) {
            navigation.navigate('RecoverHitDiceModal')
        } else {
            //user has elected to automatically recover hit dice
            //hit dice recovery will start with the class with the largest hit die size
            let maxRecoveryDice = Math.ceil(charData.level/2)
            console.log('maxRecoveryDice: ' + maxRecoveryDice)
            let diceRecovered = 0
            let diceDifference = maxRecoveryDice - diceRecovered
            if (diceRecovered <= maxRecoveryDice) {
                for (let i = 0; i < hitDice.length; i++) {
                    console.log('diceRecovered: ' + diceRecovered)
                    console.log('diceDifference: ' + diceDifference)
                    let temp = hitDice[i].class
                    let tempDice = hitDice[i].numDice
                    if (tempDice <= diceDifference) {
                        updateUsed("class", temp, tempDice)
                        diceRecovered = diceRecovered + tempDice
                        diceDifference = maxRecoveryDice - diceRecovered
                    } else {
                        updateUsed("class", temp, diceDifference)
                        diceRecovered = diceRecovered + diceDifference
                        diceDifference = maxRecoveryDice - diceRecovered
                    }
                }
            }
            Alert.alert('Recovered', 'Recovered ' + (charData.hitPoints - hitPoints) + ' hit points and ' + diceRecovered + ' hit dice')
            navigation.dispatch(StackActions.pop(2))
        }
        
        //closeModal()
    }
    
    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={closeModal}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={closeModal} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText}>Long Rest   </Text>
                    <FontAwesome5 style={ styles.modalCloseButton } name="bed" />
                </View>
                <Text>A long rest is a period of extended downtime, at least 8 hours long, during which a character sleeps for at least 6 hours and performs light activity, such as reading, talking, eating, or standing watch, for no more than 2 hours. {'\n'}{'\n'}If the rest is interrupted by a period of strenuous activity-fighting, casting powers, at least 1 hour of walking, or similar adventuring activity-the characters must restart the rest to benefit from it.</Text>
                <View style={ styles.modalHeading }>
                    <Text style={ styles.modalHeading }>Recover</Text>
                </View>
                { hitDiceRecovery ?
                    <Text style={{paddingVertical: 5, textAlign: 'center'}}>{charData.hitPoints-hitPoints} Hit Points; up to {Math.ceil(charData.level/2)} Hit Dice</Text>
                    : <Text style={{paddingVertical: 5, textAlign: 'center'}}>{charData.hitPoints-hitPoints} Hit Points</Text>
                }
                <View style={ AppStyles.tableStyles.tableRow }>
                    <CheckBox 
                        checked={checkedReset}
                        onChange={onChangeReset}
                        buttonStyle = {styles.checkboxBase}
                        activeButtonStyle = {styles.checkboxChecked} />
                    <Text style={{flex: 9, paddingLeft: 5, fontSize: 14}}>Reset max HP changes during this rest (coming soon)</Text>
                </View>
                { !hitDiceRecovery ?
                    <View></View> :
                    <View style={ AppStyles.tableStyles.tableRow }>
                        <CheckBox 
                            checked={checkedHitDice}
                            onChange={handleHitDiceCheckbox}
                            buttonStyle = {styles.checkboxBase}
                            activeButtonStyle = {styles.checkboxChecked} />
                        { checkedHitDice ?
                            <Text style={{flex: 9, paddingLeft: 5, fontSize: 14}}>Automatically choose which Hit Dice to recover</Text>
                            : <Text style={{flex: 9, paddingLeft: 5, fontSize: 14}}>Manually choose which Hit Dice to recover</Text>
                        }
                    </View>
                }
                <View style={ AppStyles.tableStyles.tableRow }>
                        <CheckBox 
                            checked={checkedApply}
                            onChange={handleAutoHealCheckbox}
                            buttonStyle = {styles.checkboxBase}
                            activeButtonStyle = {styles.checkboxChecked} />
                        <Text style={{flex: 9, paddingLeft: 5, fontSize: 14}}>Automatically apply healing</Text>
                    </View>
                    { checkedApply ?
                            <Text></Text>
                            : <Text style={{fontSize: 12}}>Healing will not be applied automatically</Text>
                    }
                <Pressable style={ styles.modalButton } onPress={takeLongRest} >
                    <Text style={ styles.modalButtonText }>Long Rest</Text>
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
        flexWrap: 'wrap'
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
      modalButton: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#B0BEC5',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%',
        flexDirection: 'row'
    },
    modalButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        padding: 5
    },
})

export default LongRestModal