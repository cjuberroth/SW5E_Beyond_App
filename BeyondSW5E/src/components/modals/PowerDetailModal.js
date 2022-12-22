import React, { useContext } from 'react'
import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../../context/CharacterContext'
import CastingClassMaxLevels from '../../components/CastingClassMaxLevels'

const PowerDetailModal = ({ route }) => {
    const navigation = useNavigation()
    const {forcePointsState, setForcePointsState} = useContext(CharacterContext)
    const {techPointsState, setTechPointsState} = useContext(CharacterContext)
    const charClasses = useContext(CharacterContext).characterInformation.classes
    const powerDescription = route.params.description

    let canOverPower = false
    if (powerDescription.includes('***Overcharge Tech') || powerDescription.includes('***Force Potency')) {
        canOverPower = true
    }

    let castingClassName = ''
    let castingClassLevel = 0
    for (i = 0; i < charClasses.length; i++) {
        if (charClasses[i].class === 'Consular' 
            || charClasses[i].class === 'Guardian' 
            || charClasses[i].class === 'Sentinel' 
            || charClasses[i].class === 'Engineer' 
            || charClasses[i].class === 'Scout') {
            if (charClasses[i].level > castingClassLevel) {
                castingClassName = charClasses[i].class
                castingClassLevel = charClasses[i].level
            }
        }
    }

    let castingArray = []
    if (CastingClassMaxLevels(castingClassName, castingClassLevel) >= route.params.level) {
        for (i = route.params.level; i <= CastingClassMaxLevels(castingClassName, castingClassLevel); i++) {
            castingArray.push(i)
        }
    }
    console.log(castingArray)
    const castPower = (level) => {
        if (!canOverPower) {
            if (level === 0) { //this is an at-will power
                navigation.goBack()
                return
            }
            if (route.params.powerType === 'Force') {
                setForcePointsState(forcePointsState - (level + 1))
            } else {
                setTechPointsState(techPointsState - (level + 1))
            }
            navigation.goBack()
        } else if (level >= CastingClassMaxLevels(castingClassName, castingClassLevel)) {
            if (level === 0) { //this is an at-will power
                navigation.goBack()
                return
            }
            if (route.params.powerType === 'Force') {
                setForcePointsState(forcePointsState - (level + 1))
            } else {
                setTechPointsState(techPointsState - (level + 1))
            }
            navigation.goBack()
        } else {

        }
    }
    
    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText}>Power Details</Text>
                </View>
                <View style={ styles.modalHeading }>
                    { route.params.level === 0 ?
                        <Text style={ styles.modalHeading }>{route.params.name} - At-will</Text>
                        : <Text style={ styles.modalHeading }>{route.params.name} - Level {route.params.level}</Text>
                    }
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                {
                    castingArray.map(el => {
                        console.log(el)
                        if (el === route.params.level) {
                            {console.log('Should render a Cast button')}
                             return <Pressable style={ styles.modalButton } onPress={() => castPower(route.params.level)} >
                                <Text style={ styles.modalButtonText }>Cast</Text>
                            </Pressable>
                        } else if (canOverPower) {
                            {console.log('Should render multiple Cast buttons')}
                            return <Pressable style={ styles.modalCastingButton } onPress={() => castPower(el)} >
                                <Text style={ styles.modalButtonText }>Cast Level {el}</Text>
                            </Pressable>
                        }
                    })
                }
                </View>
                <View style={{marginTop: 7}}>
                    <View style={styles.modalStats}>
                        { route.params.powerType === "Force" ?
                            <>
                                <Text style={styles.modalStatCol}>Force Alignment:</Text>
                                <Text style={styles.modalStatValueCol}>{route.params.forceAlignment}</Text>
                            </>
                            : <></>
                        }
                    </View>
                    <View style={styles.modalStats}>
                        <Text style={styles.modalStatCol}>Casting Period:</Text>
                        <Text style={styles.modalStatValueCol}>{route.params.castingPeriod}</Text>
                    </View>
                    <View style={styles.modalStats}>
                        <Text style={styles.modalStatCol}>Range:</Text>
                        <Text style={styles.modalStatValueCol}>{route.params.range}</Text>
                    </View>
                    <View style={styles.modalStats}>
                        <Text style={styles.modalStatCol}>Duration:</Text>
                        <Text style={styles.modalStatValueCol}>{route.params.duration}</Text>
                    </View>
                    <View style={styles.modalStats}>
                        <Text style={styles.modalStatCol}>Concentration:</Text>
                        { route.params.concentration ? <Text style={styles.modalStatValueCol}>Yes</Text>
                        : <Text style={styles.modalStatValueCol}>No</Text>}
                    </View>
                    <View style={styles.modalStats}>
                        { route.params.powerType === 'Force' ?
                            <>
                                <Text style={styles.modalStatCol}>Prerequisite:</Text>
                                { route.params.hasPrereq ? <Text style={styles.modalStatValueCol}>{route.params.hasPrereq}</Text>
                                : <Text style={styles.modalStatValueCol}>None</Text>}
                            </>
                            : <></>
                        }
                    </View>
                </View>
                <ScrollView>
                { route.params.description ? <Text style={styles.modalDescriptionText}>{route.params.description}</Text>
                    : <Text style={styles.modalDescriptionText}>Description: None</Text>}
                </ScrollView>
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
        height: '80%',
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
    modalDescriptionText: {
        marginTop: 10
    },
    modalCloseButton: {
        fontSize: 25, 
        color: 'black',
    },
    modalHeading: {
        alignItems: 'center',
        fontSize: 25,
        paddingVertical: 5
    },
    modalStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 1
    },
    modalStatCol: {
        flex: 2
    },
    modalStatValueCol: {
        flex: 2
    },
    modalButton: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#4A0C05',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%',
        flexDirection: 'row',
        marginBottom: 5
    },
    modalButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        padding: 5
    },
    modalCastingButton: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#4A0C05',
        marginHorizontal: 5,
        marginVertical: 2,
        minWidth: '33%'
    }
})

export default PowerDetailModal