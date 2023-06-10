import React, { useContext, useEffect, useRef } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import SettingsContext from '../../context/SettingsContext'

const DiceResultModal = ({ route }) => {
    const navigation = useNavigation()
    const { diceRollSound } = useContext(SettingsContext)
    const soundObjectRef = useRef(null)
    const isMountedRef = useRef(true)

    useEffect(() => {
        const playSound = async () => {
            try {
                const soundObject = new Audio.Sound()
                soundObjectRef.current = soundObject

                await soundObject.loadAsync(require('../../../assets/dice-roll-1.mp3'))
                await soundObject.playAsync()
            } catch (error) {
                console.log(error)
            }
        }

        if (diceRollSound === true) {
            playSound()
        }

        //Clean up the sound object when the component unmounts
        return () => {
            isMountedRef.current = false
            cleanupSoundObject()
        }
    }, [])

    const cleanupSoundObject = async () => {
        if (soundObjectRef.current && isMountedRef.current) {
          try {
            await soundObjectRef.current.stopAsync()
            await soundObjectRef.current.unloadAsync()
          } catch (error) {
            console.log('Error unloading sound:', error)
          }
        }
      }

    const closeModal = () => {
        switch (route.params.origin) {
            case 'shortRestModal':
                navigation.dispatch(StackActions.pop(3))
                break
            case 'diceRollModal':
                navigation.dispatch(StackActions.pop(2))
                break
            default:
                navigation.goBack()
        }
    }

    return (
        <View style={styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0)' },]} onPress={() => closeModal()}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={() => closeModal()} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText}>{route.params.rollType + ' Roll'}</Text>
                </View>
                <View style={ styles.modalResultsContainer }>
                    {
                        route.params.rollType != 'Custom' ?
                            <>
                                <View>
                                    <Text style={ styles.resultText }>{'Roll Result: ' + route.params.rollResult + ' + ' + route.params.mod + ' = ' + (route.params.rollResult+route.params.mod)}</Text>
                                    {route.params.numDice != '' ?
                                        <Text>{route.params.numDice + 'd' + route.params.numSides + ' + ' + route.params.mod}</Text>
                                    : <Text></Text>}
                                </View>
                                <Text style={{fontSize: 35, marginRight: 40, borderWidth: 1, borderRadius: 4, paddingHorizontal: 5}}>{(route.params.rollResult+route.params.mod)}</Text>
                            </>
                        : 
                            route.params.diceRolled.length > 1 ?
                                <>
                                    <View>
                                        <Text style={ styles.resultText }>{route.params.dieResults.map((item) => item.toString()).join('+') + ' = ' + route.params.rollResult}</Text>
                                        <Text style={ styles.resultText }>{route.params.diceRolled.join('+')}</Text>
                                    </View>
                                    <Text style={{fontSize: 35, marginRight: 40, borderWidth: 1, borderRadius: 4, paddingHorizontal: 5}}>{route.params.rollResult}</Text>
                                </>
                            :
                            <>
                            <View>
                                <Text style={ styles.resultText }>{route.params.dieResults.map((item) => item.toString()).join('+')}</Text>
                                <Text style={ styles.resultText }>{route.params.diceRolled.join('+')}</Text>
                            </View>
                            <Text style={{fontSize: 35, marginRight: 40, borderWidth: 1, borderRadius: 4, paddingHorizontal: 5}}>{route.params.rollResult}</Text>
                        </>
                    }
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
        marginBottom: 5,
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
    modalResultsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    resultText: {
        fontSize: 20
    }
})

export default DiceResultModal