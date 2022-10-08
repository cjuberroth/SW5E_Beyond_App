import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../context/CharacterContext'

const HPModal = ({ navigation }) => {
    const charData = useContext(CharacterContext).characterInformation
    const { hitPoints, setHitPoints } = useContext(CharacterContext)

    // const changeHP = (change) => {
    //     setHitPoints(startingHP + change)
    // }

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
                        <Text style={ styles.hpText }>{hitPoints}</Text>
                        <Text style={ styles.hpText }>/</Text>
                        <Text style={ styles.hpText }>{charData.hitPoints}</Text>
                    </View>
                    <View style={ styles.modificationContainer }>
                        <View style={ styles.healButtonContainer }>
                            <Text style={ styles.hpText }>Heal</Text>
                            <Pressable style={ styles.healButton } onPress={() => setHitPoints(hitPoints + 1)}>
                                <Text style={ styles.modalButtonText }>+1</Text>
                            </Pressable>
                            <Pressable style={ styles.healButton } onPress={() => setHitPoints(hitPoints + 5)}>
                                <Text style={ styles.modalButtonText }>+5</Text>
                            </Pressable>
                            <Pressable style={ styles.healButton } onPress={() => setHitPoints(hitPoints + 10)}>
                                <Text style={ styles.modalButtonText }>+10</Text>
                            </Pressable>
                        </View>
                        <View style={ styles.damageButtonContainer }>
                        <Text style={ styles.hpText }>Damage</Text>
                        <Pressable style={ styles.damageButton } onPress={() => setHitPoints(hitPoints - 1)}>
                                <Text style={ styles.modalButtonText }>-1</Text>
                            </Pressable>
                            <Pressable style={ styles.damageButton } onPress={() => setHitPoints(hitPoints - 5)}>
                                <Text style={ styles.modalButtonText }>-5</Text>
                            </Pressable>
                            <Pressable style={ styles.damageButton } onPress={() => setHitPoints(hitPoints - 10)}>
                                <Text style={ styles.modalButtonText }>-10</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={ styles.modalHeader }>
                        <Text>Advanced HP options coming soon</Text>
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
        alignItems: 'center'
    },
    modalInner: {
        height: '75%',
        width: '95%',
        backgroundColor: '#ECEFF1'
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 30
    },
    modalHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    hpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
})

export default HPModal