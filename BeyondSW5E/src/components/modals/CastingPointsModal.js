import React, { useContext } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../../context/CharacterContext'

const CastingPointsModal = ({ route }) => {
    const navigation = useNavigation()
    const charData = useContext(CharacterContext).characterInformation
    const { forcePointsState, setForcePointsState } = useContext(CharacterContext)
    const { techPointsState, setTechPointsState } = useContext(CharacterContext)
    const maxForcePoints = useContext(CharacterContext).characterCasting.maxForcePoints
    const maxTechPoints = useContext(CharacterContext).characterCasting.maxTechPoints

    const modifyPoints = (castingType, amount) => {
        switch (castingType) {
            case 'Force':
                setForcePointsState(forcePointsState + amount)
                break
            case 'Tech':
                setTechPointsState(techPointsState + amount)
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
                    <Text style={ styles.modalHeaderText }>Manage {route.params.pointsType} Points</Text>
                </View>
                <View style={ styles.hpContainer }>
                    { route.params.pointsType === 'Force' ?
                        <>
                            <Text style={ styles.hpText }>{forcePointsState}</Text>
                            <Text style={ styles.hpText }>/</Text>
                            <Text style={ styles.hpText }>{maxForcePoints}</Text>
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
                    <View style={ styles.healButtonContainer }>
                        <Text style={ styles.hpText }>Recover</Text>
                        <Pressable style={ styles.healButton } onPress={() => modifyPoints(route.params.pointsType, 1)}>
                            <Text style={ styles.modalButtonText }>+1</Text>
                        </Pressable>
                        <Pressable style={ styles.healButton } onPress={() => modifyPoints(route.params.pointsType, 3)}>
                            <Text style={ styles.modalButtonText }>+3</Text>
                        </Pressable>
                        <Pressable style={ styles.healButton } onPress={() => modifyPoints(route.params.pointsType, 5)}>
                            <Text style={ styles.modalButtonText }>+5</Text>
                        </Pressable>
                    </View>
                    <View style={ styles.damageButtonContainer }>
                    <Text style={ styles.hpText }>Use</Text>
                    <Pressable style={ styles.damageButton } onPress={() => modifyPoints(route.params.pointsType, -1)}>
                            <Text style={ styles.modalButtonText }>-1</Text>
                        </Pressable>
                        <Pressable style={ styles.damageButton } onPress={() => modifyPoints(route.params.pointsType, -3)}>
                            <Text style={ styles.modalButtonText }>-3</Text>
                        </Pressable>
                        <Pressable style={ styles.damageButton } onPress={() => modifyPoints(route.params.pointsType, -5)}>
                            <Text style={ styles.modalButtonText }>-5</Text>
                        </Pressable>
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
        width: '95%',
        backgroundColor: '#ECEFF1',
        borderRadius: 5,
        flexBasis: '50%'
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
        justifyContent: 'center',
        //paddingHorizontal: 50,
        paddingBottom: 25
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

export default CastingPointsModal