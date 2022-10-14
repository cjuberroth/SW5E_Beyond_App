import React, { useContext } from 'react'
import { View, Pressable, Text, StyleSheet, FlatList } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../../context/CharacterContext'
import ConditionCard from '../ConditionCard'

const ConditionsModal = ({ navigation }) => {
    const apiData = useContext(CharacterContext).apiData

    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText}>Conditions</Text>
                </View>
                <View style={ styles.tableHeader }>
                    <Text style = {[ styles.column, styles.colEquip, styles.colHeader ]}> </Text>
                    <Text style = {[ styles.column, styles.colCondition, styles.colHeader ]}>Condition</Text>
                    <Text style = {[ styles.column, styles.colDescription, styles.colHeader ]}>Description</Text>
                </View>
                <FlatList
                    data = {apiData.conditions}
                    keyExtractor = {(condition) => condition.rowKey}
                    renderItem = { ({ item }) => {return <ConditionCard item = { item } />}}
                />
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
        height: '85%',
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
    tableHeader: {
        flexDirection: 'row',
        margin: 5,
    },
    column: {
        fontSize: 15,
        color: 'black',
        //paddingHorizontal: 10
    },
    colEquip: {
        flex: 1
    },
    colCondition: {
        flex: 3
    },
    colDescription: {
        flex: 7
    },
})

export default ConditionsModal