import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import CharacterContext from '../../context/CharacterContext'
import useAsyncStorage from '../../hooks/useAsyncStorage'

const WeaponProficiencyModal = ({ route }) => {
    const navigation = useNavigation()
    const characterName = useContext(CharacterContext).characterInformation.name
    const { weaponsState, setWeaponsState } = useContext(CharacterContext)
    const { data, storeData, initializeData } = useAsyncStorage(characterName)
    const [loading, setLoading] = useState(true)

    /* useEffect(() => {
        if (data === null) {
            initializeData({ name: characterName, weapon: route.params.name, proficiency: 'Not Proficient' })
                .then(() => setLoading(false))
                .catch((error) => console.log('Error initializing data: ', error))
        } else {
            setLoading(false)
        }
      }, [data, initializeData, route.params.name]) */
    
    /* const getWeaponProficiency = (name, item) => {
        if (data.name === characterName && data.weapon === route.params.name) {
            return data.proficiency
        }
    } */

    const getWeaponProficiency = () => {
        const weapon = weaponsState.find(el => el.weapon === route.params.name)
        if (weapon.proficiency != '') {
            return weapon.proficiency
        } else {
            //Need to set the proficiency to Not Proficient here in weaponsState
            const updatedData = weaponsState.map(el => {
                if (el.weapon === route.params.name) {
                    return {...el,
                    proficiency: 'Not Proficient'}
                } else {
                    return el
                }
            })
            //setWeaponsState(updatedData)
            return 'Not Proficient'
        }
    }
    
    /* const handleChangeProficiency = async () => {
        // If data exists, update proficiency and save the updated data
        if (data) {
            const updatedData = {
            ...data,
            proficiency: data.proficiency === 'Not Proficient' ? 'Proficient' : 'Not Proficient',
            }
    
            await storeData(updatedData)
        }
    }    */
    
    const handleChangeProficiency = async () => {
        // If data exists, update proficiency and save the updated data
        const updatedData = weaponsState.map(el => {
            if (el.weapon === route.params.name) {
                return {...el,
                proficiency: el.proficiency === 'Not Proficient' ? 'Proficient' : 'Not Proficient'}
            } else {
                return el
            }
        })

        setWeaponsState(updatedData)
        await storeData(updatedData)
        
    }   

    /* if (loading) {
        // Show a loading indicator while data is being fetched or stored
        return (
            <View style={styles.modalContainer}>
                <Text>Loading...</Text>
            </View>
        )
    } */

    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={() => {navigation.goBack()}} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText }>Weapon Proficiency</Text>
                </View>
                <View style={ styles.creditsContainer }>
                    <Text style={ styles.creditsText }>{route.params.name}</Text>
                </View>
                {data && (
                    <View style={ styles.creditsContainer }>
                        <Text style={ styles.creditsText }>{getWeaponProficiency()}</Text>
                    </View>
                )}
                
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Pressable style={ styles.addButton } onPress={() => handleChangeProficiency()}>
                        <Text style={ styles.modalButtonText }>Change Proficiency</Text>
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
        paddingVertical: 5,
        width: '95%',
        backgroundColor: '#ECEFF1',
        borderRadius: 5
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
    creditsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 50,
        paddingBottom: 50
    },
    creditsText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    addButtonContainer: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 10,
    },
    subtractButtonContainer: {
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
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#444',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '40%'
    },
    subtractButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#444',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '40%'
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        padding: 5
    },
    textInput: {
        minWidth: '80%', 
        marginBottom: 12,
        marginHorizontal: 12, 
        borderWidth: 1, 
        borderRadius: 5,
        padding: 10
    }
})

export default WeaponProficiencyModal