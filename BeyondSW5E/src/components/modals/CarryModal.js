import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import CharacterContext from '../../context/CharacterContext'

const CarryModal = ({ route }) => {
    const navigation = useNavigation()
    const { carriedWeight, setCarriedWeight } = useContext(CharacterContext)
    const { equippable, setEquippable } = useContext(CharacterContext)
    const getCharacterAC = useContext(CharacterContext).characterEquipment.getCharacterAC
    const [counter, setCounter] = useState(0)
    const [quantityCarried, setQuantityCarried] = useState(0)
    const maxCarryCapacity = useContext(CharacterContext).characterInformation.maxCarryCapacity
    let tempCarried = 0
    let difference = 0

    useEffect(() => {
        setQuantityCarried(route.params.carriedQuantity)
    }, [route.params.carriedQuantity])

    console.log(counter)
        
    const handleCount = (amount) => {
        if (counter + amount > route.params.quantity) {
            setCounter(route.params.quantity)
        } else {
            setCounter(counter + amount)
        }
    }

    const handleCarry = (action) => {
        let toggle = equippable.map(el => {
            if (action === 'drop') {
                if (quantityCarried <= 1) {
                    return el.name === route.params.name ? {...el, carried: false, carriedQuantity: tempCarried, equipped: false} : el
                } else {
                    return el.name === route.params.name ? {...el, carriedQuantity: tempCarried} : el
                }
            } else {
                return el.name === route.params.name ? {...el, carried: true, carriedQuantity: tempCarried} : el
            }
        })

        let tempWeight = 0
        equippable.map(el => {
            if (el.name === route.params.name) {
                if (el.weight !== undefined) {
                    if (action === 'drop') {
                        if (difference > 0) {
                            tempWeight = -(parseFloat(el.weight)) * difference
                        } else {
                        tempWeight = -(parseFloat(el.weight)) * counter
                        }
                    } else {
                        if (difference > 0) {
                            tempWeight = parseFloat(el.weight) * difference
                        } else {
                        tempWeight = parseFloat(el.weight) * counter
                        }
                    }
                }
            }
        })
        setCarriedWeight(carriedWeight + tempWeight)
        tempWeight = 0
        getCharacterAC(toggle)
        setEquippable(toggle)
        tempCarried = 0
    }
    
    const handleTake = () => {
        if (quantityCarried === route.params.quantity) {
            Alert.alert('You Want More?', 'You are already carrying all the ' + route.params.name + 's you own.')
            return
        }
        if ((quantityCarried + counter) >= route.params.quantity) {
            difference = route.params.quantity - quantityCarried
            setQuantityCarried(route.params.quantity)
            tempCarried = route.params.quantity
        } else {
            setQuantityCarried(quantityCarried + counter)
            tempCarried = quantityCarried + counter
        }

        handleCarry('take')
    }

    const handleDrop = () => {
        if (quantityCarried === 0) {
            Alert.alert('None Left', 'You have already dropped all the ' + route.params.name + 's you own.')
            return
        }
        if (counter >= quantityCarried) {
            difference = quantityCarried
            setQuantityCarried(0)
            tempCarried = 0
        } else {
            setQuantityCarried(quantityCarried - counter)
            tempCarried = quantityCarried - counter
        }

        handleCarry('drop')
    }

    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                <View style={ styles.modalInner }>
                    <View style={ styles.modalHeader }>
                        <Pressable style={ styles.modalCloseButton } onPress={() => {navigation.goBack()}} >
                            <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                        </Pressable>
                        <Text style={ styles.modalHeaderText }>Manage Carry</Text>
                    </View>
                    <View style={ styles.hpContainer }>
                        <Text style={ styles.hpText }>{carriedWeight}</Text>
                        <Text style={ styles.hpText }> / </Text>
                        <Text style={ styles.hpText }>{maxCarryCapacity}</Text>
                    </View>
                    <Text style={ [styles.modalHeadingText, {marginBottom: 20, fontSize: 25}] }>{route.params.name} | {route.params.weight}lb</Text>
                    <Text style={ styles.modalHeadingText }>Quantity Owned: {route.params.quantity}</Text>
                    <Text style={ styles.modalHeadingText }>Quantity Carried: {quantityCarried}</Text>
                    <View style={ styles.advancedContainer }>
                        <View style={ styles.advancedContainerLeft }>
                            <View style={ styles.advancedContainerLeftColumn }>
                                <Text style={{ fontWeight: 'bold', paddingVertical: 3 }}>Quantity to Take/Drop</Text>
                            </View>
                        </View>
                        <View style={ styles.advancedContainerRight }>
                            <View style={ styles.advancedContainerRightColumn }>
                                <Pressable style={ styles.tempHPButton } onPress={() => handleCount(-1)}>
                                    <Text >-</Text>
                                </Pressable>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{counter}</Text>
                                <Pressable style={ styles.tempHPButton } onPress={() => handleCount(1)}>
                                    <Text >+</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <Pressable style={ styles.modalButton } onPress={() => handleTake()} >
                            <Text>Take</Text>
                        </Pressable>
                        <Pressable style={ styles.modalButton } onPress={() => handleDrop()} >
                            <Text>Drop</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    modalInner: {
        //height: '75%',
        width: '90%',
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
        paddingBottom: 20
    },
    hpText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    modalCloseButton: {
        fontSize: 25, 
        color: 'black',
        padding: 2,
        paddingLeft: 4
    },
    modalHeadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    advancedContainer: {
        flexDirection: 'row'
    },
    advancedContainerLeft: {
        flex: 1,
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    advancedContainerLeftColumn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    advancedContainerRight: {
        flex:1,
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 10
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
        backgroundColor: '#B0BEC5',
        borderRadius: 4
    },
    modalButton: {
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: '#B0BEC5',
        marginHorizontal: 20,
        marginVertical: 5,
        //minWidth: '80%',
        flexDirection: 'row',
        flex: 1
    }
})

export default CarryModal