import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import swapi from '../api/swapi'
import ItemCardList from '../components/ItemCardList'

const InventoryScreen = () => {
    const [equipment, setEquipment] = useState([])

    const searchApi = async ( limit ) => {
        const response = await swapi.get('/equipment');
        const limitArray = []
        for (let i = 0; i < limit; i++) {
            limitArray[i] = response.data[i]
        }
        setEquipment(limitArray)
    }

    useEffect(() => {
        searchApi(20)},
        [])

    return (
        <View style = { styles.screenContainer }>
            <Text style = { styles.headerStyle }>Inventory Screen</Text>
            <Text>Displaying {equipment.length} items.</Text>
            {
                equipment.length === 0
                ? <Text>Equipment is Empty</Text>
                : <ItemCardList
                      equipment = { equipment }
                  />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        alignItems: 'center',
        flex: 1
    },
    headerStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default InventoryScreen
