import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'

const DiceResultModal = ({ route }) => {
    const navigation = useNavigation()
    //const rollResult = route.params.rollResult

    return (
        <View style={styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText}>{route.params.rollType + ' Roll'}</Text>
                </View>
                <View style={ styles.modalResultsContainer }>
                    <View>
                        <Text style={ styles.resultText }>{'Roll Result: ' + route.params.rollResult + ' + ' + route.params.mod + ' = ' + (route.params.rollResult+route.params.mod)}</Text>
                        {route.params.numDice != '' ?
                            <Text>{route.params.numDice + 'd' + route.params.numSides + ' + ' + route.params.mod}</Text>
                        : <Text></Text>}
                    </View>
                    <Text style={{fontSize: 35, marginRight: 40, borderWidth: 1, borderRadius: 4, paddingHorizontal: 5}}>{(route.params.rollResult+route.params.mod)}</Text>
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