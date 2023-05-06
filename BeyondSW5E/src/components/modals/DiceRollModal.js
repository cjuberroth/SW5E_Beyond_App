import React, { useState } from 'react'
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DiceRoll from '../../components/DiceRolls'

const DiceRollModal = ({ navigation }) => {
    const [dice, setDice] = useState([])
    
    const updateChosen = (dieType, number) => {
        setDice((prev) => {
            const updatedArray = prev.map((item) => {
                if (item['type'] === dieType) {
                    return {
                        ...item,
                        num: number + 1
                    }
                } else {
                    return item
                }
            })
            return updatedArray
        })
    }
    
    const handleClick = (dieType, number) => {
        const obj = dice.find(item => item['type'] === dieType)
        if (obj) {
            updateChosen(dieType, obj['num'])
        } else {
            setDice([...dice, {type: dieType, num: number}])
        }
    }
    
    const getNumber = (dieType) => {
        const obj = dice.find(item => item['type'] === dieType)
        if (obj) {
            return obj['num']
        } else {
            return null
        }
    }

    const handleRoll = (rolledDice) => {
        let rollResult = 0
        let interimResult = 0
        let dieResults = []
        let diceRolled = []
        rolledDice.map(item => {
            interimResult = DiceRoll(item.num, item.type.match(/\d+/))
            dieResults.push(interimResult)
            diceRolled.push(item.num.toString() + item.type)
            rollResult = rollResult + interimResult
        })
        navigation.navigate('DiceResultModal', {rollResult: rollResult, rollType: 'Custom', dieResults: dieResults, diceRolled: diceRolled, origin: 'diceRollModal'})
    }

    console.log(dice)

    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                <View style={ styles.modalInner }>
                    <View style={ styles.modalHeader }>
                        <Pressable style={ styles.modalCloseButton } onPress={() => {navigation.goBack()}} >
                            <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                        </Pressable>
                    </View>
                    <View style={ styles.diceContainer }>
                        <Pressable onPress={() => {handleClick('d20', 1)}}>
                            <FontAwesome5 style={ styles.diceIcon } name='dice-d20' />
                            {
                                getNumber('d20') ?
                                    <Text style={styles.diceText}>d20 ({getNumber('d20')})</Text>
                                :
                                    <Text style={styles.diceText}>d20</Text>
                            }
                        </Pressable>
                        <Pressable onPress={() => {handleClick('d12', 1)}}>
                            <MaterialCommunityIcons style={ styles.diceIcon } name='dice-d12' />
                            {
                                getNumber('d12') ?
                                    <Text style={styles.diceText}>d12 ({getNumber('d12')})</Text>
                                :
                                    <Text style={styles.diceText}>d12</Text>
                            }
                        </Pressable>
                        <Pressable onPress={() => {handleClick('d10', 1)}}>
                            <MaterialCommunityIcons style={ styles.diceIcon } name='dice-d10' />
                            {
                                getNumber('d10') ?
                                    <Text style={styles.diceText}>d10 ({getNumber('d10')})</Text>
                                :
                                    <Text style={styles.diceText}>d10</Text>
                            }
                        </Pressable>
                        <Pressable onPress={() => {handleClick('d8', 1)}}>
                            <MaterialCommunityIcons style={ styles.diceIcon } name='dice-d8' />
                            {
                                getNumber('d8') ?
                                    <Text style={styles.diceText}>d8 ({getNumber('d8')})</Text>
                                :
                                    <Text style={styles.diceText}>d8</Text>
                            }
                        </Pressable>
                        <Pressable onPress={() => {handleClick('d6', 1)}}>
                            <MaterialCommunityIcons style={ styles.diceIcon } name='dice-d6' />
                            {
                                getNumber('d6') ?
                                    <Text style={styles.diceText}>d6 ({getNumber('d6')})</Text>
                                :
                                    <Text style={styles.diceText}>d6</Text>
                            }
                        </Pressable>
                        <Pressable onPress={() => {handleClick('d4', 1)}}>
                            <MaterialCommunityIcons style={ styles.diceIcon } name='dice-d4' />
                            {
                                getNumber('d4') ?
                                    <Text style={styles.diceText}>d4 ({getNumber('d4')})</Text>
                                :
                                    <Text style={styles.diceText}>d4</Text>
                            }
                        </Pressable>
                        <Pressable style={styles.rollButton} onPress={() => {handleRoll(dice)}}>
                            <Text style={styles.rollButtonText}>Roll</Text>
                        </Pressable>
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius: 5
    },
    modalInner: {
        height: '75%',
        width: '30%',
        backgroundColor: 'black',
        borderRadius: 5
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15
    },
    diceContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',

        //paddingHorizontal: 50,
        //paddingBottom: 50
    },
    diceText: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white'
    },
    diceIcon: {
        fontSize: 50,
        color: '#15f2fd',
        paddingBottom: 2
    },
    rollButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#15f2fd',
        //marginHorizontal: 20,
        marginBottom: 10,
        minWidth: '80%'
    },
    rollButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        padding: 5
    },
    modalCloseButton: {
        fontSize: 15, 
        color: 'white',
        padding: 2,
        paddingLeft: 4
    },
})

export default DiceRollModal