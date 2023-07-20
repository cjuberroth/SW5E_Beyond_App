import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import CharacterContext from '../../context/CharacterContext'

const HPModal = ({ navigation }) => {
    const charData = useContext(CharacterContext).characterInformation
    const { maxHitPointsState, setMaxHitPointsState } = useContext(CharacterContext)
    const { hitPoints, setHitPoints } = useContext(CharacterContext)
    const { tempHitPoints, setTempHitPoints } = useContext(CharacterContext)
    const { maxHP, setMaxHP } = useContext(CharacterContext)

    const handleDamage = (amount) => {
        if (tempHitPoints > 0) {
            if (amount <= tempHitPoints) {
                setTempHitPoints(tempHitPoints - amount)
            } else {
                let difference = amount - tempHitPoints
                setHitPoints(hitPoints - difference)
                setTempHitPoints(0)
            }
        } else {
            setHitPoints(hitPoints - amount)
        }
    }

    const handleHeal = (amount) => {
        if (hitPoints <= maxHitPointsState) {
            if ((hitPoints + amount) > maxHitPointsState) {
                setHitPoints(maxHitPointsState)
            } else {
                setHitPoints(hitPoints + amount)
            }
        }
    }

    const handleTempHP = (amount) => {
        if (tempHitPoints === 0 && amount === (-1)) {
            return
        } else {
            setTempHitPoints(tempHitPoints + amount)
        }
    }

    const handleMaxHP = (amount) => {
        if (amount === -1) {
            if (hitPoints >= maxHitPointsState) {
                setHitPoints(hitPoints - 1)
                setMaxHitPointsState(maxHitPointsState - 1)
                setMaxHP(maxHP - 1)
            } else {
                setMaxHitPointsState(maxHitPointsState - 1)
                setMaxHP(maxHP - 1)
            }
        } else {
            setMaxHitPointsState(maxHitPointsState + 1)
            setMaxHP(maxHP + 1)
        }
    }

    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                <View style={ styles.modalInner }>
                    <View style={ styles.modalHeader }>
                        <Pressable style={ styles.modalCloseButton } onPress={() => {navigation.goBack()}} >
                            <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                        </Pressable>
                        <Text style={ styles.modalHeaderText }>Manage HP</Text>
                    </View>
                    <View style={ styles.hpContainer }>
                        {
                            tempHitPoints > 0 && maxHP != 0 ?
                                <>
                                    <Text style={ styles.hpText }>{hitPoints}</Text>
                                    <Text style={ [styles.hpText, {color: 'teal'}] }> ({tempHitPoints}) </Text>
                                    <Text style={ styles.hpText }> / </Text>
                                    {
                                        maxHP > 0 ?
                                            <Text style={ [styles.hpText, {color: 'green'}] }>{maxHitPointsState}</Text>
                                        :
                                            <Text style={ [styles.hpText, {color: 'red'}] }>{maxHitPointsState}</Text>
                                    }
                                    <Text style={ styles.hpText }> ({charData.hitPoints})</Text>
                                </>
                            : tempHitPoints > 0 && maxHP === 0 ?
                                <>
                                    <Text style={ styles.hpText }>{hitPoints}</Text>
                                    <Text style={ [styles.hpText, {color: 'teal'}] }> ({tempHitPoints}) </Text>
                                    <Text style={ styles.hpText }> / </Text>
                                    <Text style={ styles.hpText }> ({charData.hitPoints})</Text>
                                </>
                            : maxHP != 0 && tempHitPoints === 0 ?
                                <>
                                    <Text style={ styles.hpText }>{hitPoints}</Text>
                                    <Text style={ styles.hpText }> / </Text>
                                    {
                                        maxHP > 0 ?
                                            <Text style={ [styles.hpText, {color: 'green'}] }>{maxHitPointsState}</Text>
                                        :
                                            <Text style={ [styles.hpText, {color: 'red'}] }>{maxHitPointsState}</Text>
                                    }
                                    <Text style={ styles.hpText }> ({charData.hitPoints})</Text>
                                </>
                            :
                                <>
                                    <Text style={ styles.hpText }>{hitPoints}</Text>
                                    <Text style={ styles.hpText }> / </Text>
                                    <Text style={ styles.hpText }>{charData.hitPoints}</Text>
                                </>
                        }
                        
                    </View>
                    <View style={ styles.modificationContainer }>
                        <View style={ styles.damageButtonContainer }>
                        <Text style={ styles.hpText }>Damage</Text>
                        <Pressable style={ styles.damageButton } onPress={() => handleDamage(1)}>
                                <Text style={ styles.modalButtonText }>-1</Text>
                            </Pressable>
                            <Pressable style={ styles.damageButton } onPress={() => handleDamage(5)}>
                                <Text style={ styles.modalButtonText }>-5</Text>
                            </Pressable>
                            <Pressable style={ styles.damageButton } onPress={() => handleDamage(10)}>
                                <Text style={ styles.modalButtonText }>-10</Text>
                            </Pressable>
                            <Pressable style={ styles.damageButton } onPress={() => handleDamage(20)}>
                                <Text style={ styles.modalButtonText }>-20</Text>
                            </Pressable>
                            <Pressable style={ styles.damageButton } onPress={() => handleDamage(50)}>
                                <Text style={ styles.modalButtonText }>-50</Text>
                            </Pressable>
                        </View>
                        <View style={ styles.healButtonContainer }>
                            <Text style={ styles.hpText }>Heal</Text>
                            <Pressable style={ styles.healButton } onPress={() => handleHeal(1)}>
                                <Text style={ styles.modalButtonText }>+1</Text>
                            </Pressable>
                            <Pressable style={ styles.healButton } onPress={() => handleHeal(5)}>
                                <Text style={ styles.modalButtonText }>+5</Text>
                            </Pressable>
                            <Pressable style={ styles.healButton } onPress={() => handleHeal(10)}>
                                <Text style={ styles.modalButtonText }>+10</Text>
                            </Pressable>
                            <Pressable style={ styles.healButton } onPress={() => handleHeal(20)}>
                                <Text style={ styles.modalButtonText }>+20</Text>
                            </Pressable>
                            <Pressable style={ styles.healButton } onPress={() => handleHeal(50)}>
                                <Text style={ styles.modalButtonText }>+50</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={ styles.modalHeader }>
                        <Text style={ styles.modalHeaderText }>Advanced</Text>
                    </View>
                    <View style={ styles.advancedContainer }>
                        <View style={ styles.advancedContainerLeft }>
                            <View style={ styles.advancedContainerLeftColumn}>
                                <Text style={{ fontWeight: 'bold', paddingVertical: 3 }}>Temporary HP</Text>
                            </View>
                            <View style={ styles.advancedContainerLeftColumn}>
                                <Text style={{ fontWeight: 'bold', paddingVertical: 3 }}>Max HP Modifier</Text>
                            </View>
                        </View>
                        <View style={ styles.advancedContainerRight }>
                            <View style={ styles.advancedContainerRightColumn}>
                                <Pressable style={ styles.tempHPButton } onPress={() => handleTempHP(-1)}>
                                    <Text >-</Text>
                                </Pressable>
                                <Text style={{ fontWeight: 'bold' }}>{tempHitPoints}</Text>
                                <Pressable style={ styles.tempHPButton } onPress={() => handleTempHP(1)}>
                                    <Text >+</Text>
                                </Pressable>
                                <Pressable onPress={() => Alert.alert('Temporary HP', "Healing can’t restore temporary hit points, and they can’t be added together. If you have temporary hit points and receive more of them, you decide whether to keep the ones you have or to gain the new ones. For example, if a power grants you 12 temporary hit points when you already have 10, you can have 12 or 10, not 22.\n\nIf you have 0 hit points, receiving temporary hit points doesn’t restore you to consciousness or stabilize you. They can still absorb damage directed at you while you’re in that state, but only true healing can save you.\n\nUnless a feature that grants you temporary hit points has a duration, they last until they’re depleted or you finish a long rest.")}>
                                    <Entypo style={{fontSize: 20}} name='info-with-circle' />
                                </Pressable>
                            </View>
                            <View style={ styles.advancedContainerRightColumn}>
                                <Pressable style={ styles.tempHPButton } onPress={() => handleMaxHP(-1)}>
                                    <Text >-</Text>
                                </Pressable>
                                <Text style={{ fontWeight: 'bold' }}>{maxHP}</Text>
                                <Pressable style={ styles.tempHPButton } onPress={() => handleMaxHP(1)}>
                                    <Text >+</Text>
                                </Pressable>
                                <Pressable onPress={() => Alert.alert('Max HP Modifier', 'Adjusts maximum hit points by the selected value.')}>
                                    <Entypo style={{fontSize: 20}} name='info-with-circle' />
                                </Pressable>
                            </View>
                        </View>
                    </View>
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
        height: '75%',
        width: '95%',
        backgroundColor: '#ECEFF1',
        borderRadius: 5
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15
    },
    modalHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    hpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 50,
        paddingBottom: 50
    },
    hpText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    modificationContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    healButtonContainer: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 10,
    },
    damageButtonContainer: {
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
    healButton: {
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
    damageButton: {
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
    advancedContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    advancedContainerLeft: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    advancedContainerLeftColumn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    advancedContainerRight: {
        flex:1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    advancedContainerRightColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 10,
    },
    tempHPButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: 'gray',
        borderRadius: 4
    }
})

export default HPModal