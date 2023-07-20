import React, { useContext } from 'react'
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import CharacterContext from '../../context/CharacterContext'

const CastingPointsModal = ({ route }) => {
    const navigation = useNavigation()
    const charData = useContext(CharacterContext).characterInformation
    const { forcePointsState, setForcePointsState } = useContext(CharacterContext)
    const { techPointsState, setTechPointsState } = useContext(CharacterContext)
    const maxForcePoints = useContext(CharacterContext).characterCasting.maxForcePoints
    const maxTechPoints = useContext(CharacterContext).characterCasting.maxTechPoints
    const { tempForcePoints, setTempForcePoints } = useContext(CharacterContext)
    const { tempTechPoints, setTempTechPoints } = useContext(CharacterContext)
    const { maxForcePointsMod, setMaxForcePointsMod } = useContext(CharacterContext)
    const { maxTechPointsMod, setMaxTechPointsMod } = useContext(CharacterContext)
    const { maxForcePointsState, setMaxForcePointsState } = useContext(CharacterContext)
	const { maxTechPointsState, setMaxTechPointsState } = useContext(CharacterContext)
    const pointsType = route.params.pointsType

    const handleRemoval = (castingType, amount) => {
        switch (castingType) {
            case 'Force':
                if (tempForcePoints > 0) {
                    if (amount <= tempForcePoints) {
                        setTempForcePoints(tempForcePoints - amount)
                    } else {
                        let difference = amount - tempForcePoints
                        setForcePointsState(forcePointsState - difference)
                        setTempForcePoints(0)
                    }
                } else {
                    setForcePointsState(forcePointsState - amount)
                }
                break
            case 'Tech':
                if (tempTechPoints > 0) {
                    if (amount <= tempTechPoints) {
                        setTempTechPoints(tempTechPoints - amount)
                    } else {
                        let difference = amount - tempTechPoints
                        setTechPointsState(techPointsState - difference)
                        setTempTechPoints(0)
                    }
                } else {
                    setTechPointsState(techPointsState - amount)
                }
                break
        }
    }

    const handleGain = (castingType, amount) => {
        switch (castingType) {
            case 'Force':
                if (forcePointsState <= maxForcePointsState) {
                    if ((forcePointsState + amount) > maxForcePointsState) {
                        setForcePointsState(maxForcePointsState)
                    } else {
                        setForcePointsState(forcePointsState + amount)
                    }
                }
                break
            case 'Tech':
                if (techPointsState <= maxTechPointsState) {
                    if ((techPointsState + amount) > maxTechPointsState) {
                        setTechPointsState(maxTechPointsState)
                    } else {
                        setTechPointsState(techPointsState + amount)
                    }
                }
                break
        }
    }

    const handleTempPoints = (castingType, amount) => {
        switch (castingType) {
            case 'Force':
                if (tempForcePoints === 0 && amount === (-1)) {
                    return
                } else {
                    setTempForcePoints(tempForcePoints + amount)
                }
                break
            case 'Tech':
                if (tempTechPoints === 0 && amount === (-1)) {
                    return
                } else {
                    setTempTechPoints(tempTechPoints + amount)
                }
                break
        }
    }

    const handleMaxPoints = (castingType, amount) => {
        switch (castingType) {
            case 'Force':
                if (amount === -1) {
                    if (forcePointsState >= maxForcePointsState) {
                        setForcePointsState(forcePointsState - 1)
                        setMaxForcePointsState(maxForcePointsState - 1)
                        setMaxForcePointsMod(maxForcePointsMod - 1)
                    } else {
                        setMaxForcePointsState(maxForcePointsState - 1)
                        setMaxForcePointsMod(maxForcePointsMod - 1)
                    }
                } else {
                    setMaxForcePointsState(maxForcePointsState + 1)
                    setMaxForcePointsMod(maxForcePointsMod + 1)
                }
                break
            case 'Tech':
                if (amount === -1) {
                    if (techPointsState >= maxTechPointsState) {
                        setTechPointsState(techPointsState - 1)
                        setMaxTechPointsState(maxTechPointsState - 1)
                        setMaxTechPointsMod(maxTechPointsMod - 1)
                    } else {
                        setMaxTechPointsState(maxTechPointsState - 1)
                        setMaxTechPointsMod(maxTechPointsMod - 1)
                    }
                } else {
                    setMaxTechPointsState(maxTechPointsState + 1)
                    setMaxTechPointsMod(maxTechPointsMod + 1)
                }
                break
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
                    <Text style={ styles.modalHeaderText }>Manage {pointsType} Points</Text>
                </View>
                <View style={ styles.hpContainer }>
                    { route.params.pointsType === 'Force' ?
                        tempForcePoints > 0 && maxForcePointsMod != 0 ?
                            <>
                                <Text style={ styles.hpText }>{forcePointsState}</Text>
                                <Text style={ [styles.hpText, {color: 'teal'}] }> ({tempForcePoints}) </Text>
                                <Text style={ styles.hpText }> / </Text>
                                {
                                    maxForcePointsMod > 0 ?
                                        <Text style={ [styles.hpText, {color: 'green'}] }>{maxForcePointsState}</Text>
                                    :
                                        <Text style={ [styles.hpText, {color: 'red'}] }>{maxForcePointsState}</Text>
                                }
                                <Text style={ styles.hpText }> ({maxForcePoints})</Text>
                            </>
                        : tempForcePoints > 0 && maxForcePointsMod === 0 ?
                            <>
                                <Text style={ styles.hpText }>{forcePointsState}</Text>
                                <Text style={ [styles.hpText, {color: 'teal'}] }> ({tempForcePoints}) </Text>
                                <Text style={ styles.hpText }> / </Text>
                                <Text style={ styles.hpText }> ({maxForcePoints})</Text>
                            </>
                        : maxForcePointsMod !=0 && tempForcePoints === 0 ?
                            <>
                                <Text style={ styles.hpText }>{forcePointsState}</Text>
                                <Text style={ styles.hpText }> / </Text>
                                {
                                    maxForcePointsMod > 0 ?
                                        <Text style={ [styles.hpText, {color: 'green'}] }>{maxForcePointsState}</Text>
                                    :
                                        <Text style={ [styles.hpText, {color: 'red'}] }>{maxForcePointsState}</Text>
                                }
                                <Text style={ styles.hpText }> ({maxForcePoints})</Text>
                            </>
                        :
                            <>
                                <Text style={ styles.hpText }>{forcePointsState}</Text>
                                <Text style={ styles.hpText }>/</Text>
                                <Text style={ styles.hpText }>{maxForcePoints}</Text>
                            </>
                    :
                    tempTechPoints > 0 && maxTechPointsMod != 0 ?
                        <>
                            <Text style={ styles.hpText }>{techPointsState}</Text>
                            <Text style={ [styles.hpText, {color: 'teal'}] }> ({tempTechPoints}) </Text>
                            <Text style={ styles.hpText }> / </Text>
                            {
                                maxTechPointsMod > 0 ?
                                    <Text style={ [styles.hpText, {color: 'green'}] }>{maxTechPointsState}</Text>
                                :
                                    <Text style={ [styles.hpText, {color: 'red'}] }>{maxTechPointsState}</Text>
                            }
                            <Text style={ styles.hpText }> ({maxTechPoints})</Text>
                        </>
                    : tempTechPoints > 0 && maxTechPointsMod === 0 ?
                        <>
                            <Text style={ styles.hpText }>{techPointsState}</Text>
                            <Text style={ [styles.hpText, {color: 'teal'}] }> ({tempTechPoints}) </Text>
                            <Text style={ styles.hpText }> / </Text>
                            <Text style={ styles.hpText }> ({maxTechPoints})</Text>
                        </>
                    : maxTechPointsMod !=0 && tempTechPoints === 0 ?
                        <>
                            <Text style={ styles.hpText }>{techPointsState}</Text>
                            <Text style={ styles.hpText }> / </Text>
                            {
                                maxTechPointsMod > 0 ?
                                    <Text style={ [styles.hpText, {color: 'green'}] }>{maxTechPointsState}</Text>
                                :
                                    <Text style={ [styles.hpText, {color: 'red'}] }>{maxTechPointsState}</Text>
                            }
                            <Text style={ styles.hpText }> ({maxTechPoints})</Text>
                        </>
                    :
                        <>
                            <Text style={ styles.hpText }>{techPointsState}</Text>
                            <Text style={ styles.hpText }>/</Text>
                            <Text style={ styles.hpText }>{maxTechPoints}</Text>
                        </>
                    }
                </View>
                <View style={ styles.modificationContainer }>
                    <View style={ styles.damageButtonContainer }>
                    <Text style={ styles.hpText }>Use</Text>
                    <Pressable style={ styles.damageButton } onPress={() => handleRemoval(route.params.pointsType, 1)}>
                            <Text style={ styles.modalButtonText }>-1</Text>
                        </Pressable>
                        <Pressable style={ styles.damageButton } onPress={() => handleRemoval(route.params.pointsType, 3)}>
                            <Text style={ styles.modalButtonText }>-3</Text>
                        </Pressable>
                        <Pressable style={ styles.damageButton } onPress={() => handleRemoval(route.params.pointsType, 5)}>
                            <Text style={ styles.modalButtonText }>-5</Text>
                        </Pressable>
                    </View>
                    <View style={ styles.healButtonContainer }>
                        <Text style={ styles.hpText }>Recover</Text>
                        <Pressable style={ styles.healButton } onPress={() => handleGain(route.params.pointsType, 1)}>
                            <Text style={ styles.modalButtonText }>+1</Text>
                        </Pressable>
                        <Pressable style={ styles.healButton } onPress={() => handleGain(route.params.pointsType, 3)}>
                            <Text style={ styles.modalButtonText }>+3</Text>
                        </Pressable>
                        <Pressable style={ styles.healButton } onPress={() => handleGain(route.params.pointsType, 5)}>
                            <Text style={ styles.modalButtonText }>+5</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={ styles.modalHeader }>
                        <Text style={ styles.modalHeaderText }>Advanced</Text>
                </View>
                <View style={ styles.advancedContainer }>
                    <View style={ styles.advancedContainerLeft }>
                        <View style={ styles.advancedContainerLeftColumn}>
                            <Text style={{ fontWeight: 'bold', paddingVertical: 3 }}>Temporary {route.params.pointsType} Points</Text>
                        </View>
                        <View style={ styles.advancedContainerLeftColumn}>
                            <Text style={{ fontWeight: 'bold', paddingVertical: 3 }}>Max {route.params.pointsType} Modifier</Text>
                        </View>
                    </View>
                    <View style={ styles.advancedContainerRight }>
                        <View style={ styles.advancedContainerRightColumn}>
                            <Pressable style={ styles.tempHPButton } onPress={() => handleTempPoints(route.params.pointsType, -1)}>
                                <Text >-</Text>
                            </Pressable>
                            { route.params.pointsType === 'Force' ?
                                    <Text style={{ fontWeight: 'bold' }}>{tempForcePoints}</Text>
                                : 
                                    <Text style={{ fontWeight: 'bold' }}>{tempTechPoints}</Text>
                            }
                            <Pressable style={ styles.tempHPButton } onPress={() => handleTempPoints(route.params.pointsType, 1)}>
                                <Text >+</Text>
                            </Pressable>
                            <Pressable onPress={() => Alert.alert('Temporary ' + route.params.pointsType + ' Points', "Similar to temporary hit points, some powers, abilities, or features grant temporary force or tech points to a creature. When you would expend force or tech points-whether through a power, ability, or feature-the temporary points are spent first.\n\nYou can only have one source of temporary force or tech points. If you have temporary force or tech points and receive more of them, you decide whether to keep the ones you have or gain the new ones.\n\nUnless a feature that grants you temporary force or tech points has a duration, they last until they’re depleted or you finish a long rest.")}>
                                <Entypo style={{fontSize: 20}} name='info-with-circle' />
                            </Pressable>
                        </View>
                        <View style={ styles.advancedContainerRightColumn}>
                            {
                                route.params.pointsType === 'Force' ?
                                    <>
                                        <Pressable style={ styles.tempHPButton } onPress={() => handleMaxPoints('Force', -1)}>
                                            <Text >-</Text>
                                        </Pressable>
                                        <Text style={{ fontWeight: 'bold' }}>{maxForcePointsMod}</Text>
                                        <Pressable style={ styles.tempHPButton } onPress={() => handleMaxPoints('Force', 1)}>
                                            <Text >+</Text>
                                        </Pressable>
                                    </>
                                :
                                <>
                                    <Pressable style={ styles.tempHPButton } onPress={() => handleMaxPoints('Tech', -1)}>
                                        <Text >-</Text>
                                    </Pressable>
                                    <Text style={{ fontWeight: 'bold' }}>{maxTechPointsMod}</Text>
                                    <Pressable style={ styles.tempHPButton } onPress={() => handleMaxPoints('Tech', 1)}>
                                        <Text >+</Text>
                                    </Pressable>
                                </>
                            }
                            <Pressable onPress={() => Alert.alert('Max ' + route.params.pointsType + ' Points Modifier', 'Adjusts maximum ' + route.params.pointsType.toLowerCase() + ' points by the selected value.')}>
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
        flexBasis: '60%',
        width: '95%',
        backgroundColor: '#ECEFF1',
        borderRadius: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15,
    },
    modalHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    hpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        //paddingHorizontal: 50,
        paddingBottom: 25
    },
    hpText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    modificationContainer: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 5
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

export default CastingPointsModal