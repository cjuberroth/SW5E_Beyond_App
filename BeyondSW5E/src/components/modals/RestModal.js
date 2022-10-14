import React, { useState } from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import Modal from 'react-native-modal'

const RestModal = ({ navigation }) => {
    const [isShortRestVisible, setShortRestVisible] = useState(false)
    const [isLongRestVisible, setLongRestVisible] = useState(false)

    const toggleShortRest = () => {
        setShortRestVisible(!isShortRestVisible)
    }
    const toggleLongRest = () => {
        setLongRestVisible(!isLongRestVisible)
    }

    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText}>Rest</Text>
                </View>
                <Pressable style={ styles.modalButton } onPress={toggleShortRest} >
                    <FontAwesome5 style={ styles.modalCloseButton } name="book-reader" />
                    <Text style={ styles.modalButtonText }>Short Rest</Text>
                </Pressable> 
                
                {/* Short Rest Modal */}
                <Modal
                    isVisible={isShortRestVisible}
                    onBackdropPress={toggleShortRest}>
                    <View style={ styles.secondaryModalContainer}>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={toggleShortRest} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Short Rest   </Text>
                            <FontAwesome5 style={ styles.modalCloseButton } name="book-reader" />
                        </View>
                        <Text>A short rest is a period of downtime, at least 1 hour long, during which a character does nothing more strenuous than eating, drinking, reading, and tending to wounds.</Text>
                        <View style={ styles.modalHeading }>
                            
                        </View>
                    </View>
                </Modal>

                <Pressable style={ styles.modalButton } onPress={toggleLongRest} >
                    <FontAwesome5 style={ styles.modalCloseButton } name="bed" />
                    <Text style={ styles.modalButtonText }>Long Rest</Text>
                </Pressable>

                {/* Long Rest Modal */}
                <Modal
                    isVisible={isLongRestVisible}
                    onBackdropPress={toggleLongRest}>
                    <View style={ styles.secondaryModalContainer}>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={toggleLongRest} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Long Rest   </Text>
                            <FontAwesome5 style={ styles.modalCloseButton } name="bed" />
                        </View>
                        <Text>A long rest is a period of extended downtime, at least 8 hours long, during which a character sleeps for at least 6 hours and performs light activity, such as reading, talking, eating, or standing watch, for no more than 2 hours. If the rest is interrupted by a period of strenuous activity-fighting, casting powers, at least 1 hour of walking, or similar adventuring activity-the characters must restart the rest to benefit from it.\n\nAt the end of a long rest, a character regains all lost hit points. The character also regains spent Hit Dice, up to a number of dice equal to half of the character’s total number of them (minimum of one).</Text>
                        <View style={ styles.modalHeading }>
                            
                        </View>
                    </View>
                </Modal>
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
    modalListHeadView: {
        flexDirection: 'row'
    },
    secondaryModalContainer: {
        backgroundColor: '#ECEFF1',
        padding: 5,
        borderRadius: 5
    }
})

export default RestModal