import React, { useContext, useState } from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import AppStyles from '../../styles/AppStyles'
import CharacterContext from '../../context/CharacterContext'
import Checkbox from '../Checkbox'

const LongRestModal = () => {
    const navigation = useNavigation()
    const charData = useContext(CharacterContext).characterInformation
    const { hitPoints, setHitPoints } = useContext(CharacterContext)
    const [checkedReset, onChangeReset] = useState(true)

    const closeModal = () => {
        navigation.dispatch(StackActions.pop(2))
    }
    
    const takeLongRest = () => {
        setHitPoints(charData.hitPoints)
        //there will need to be code here later to reset max hp changes once they've been implemented
        //there will need to be code here later to regain hit dice once they've been implemented
        //navigation.dispatch(StackActions.pop(2))
        closeModal()
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
                <Text>{charData.hitPoints-hitPoints} Hit Points; up to {Math.ceil(charData.level/2)} Hit Dice</Text>
                <View style={ AppStyles.tableStyles.tableRow }>
                    <Checkbox 
                        checked={checkedReset}
                        onChange={onChangeReset}
                        buttonStyle = {styles.checkboxBase}
                        activeButtonStyle = {styles.checkboxChecked} />
                    <Text style={{flex: 9, paddingLeft: 5, fontSize: 14}}>Reset max HP changes during this rest</Text>
                </View>
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