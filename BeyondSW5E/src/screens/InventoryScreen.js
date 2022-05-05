import React, { useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import swapi from '../api/swapi'

// This is a very rough methodology but it gets us started.
// Will advance the function moving forward but wanted to get the tough stuff out of the way.

const InventoryScreen = () => {
    const [equipment, setEquipment] = useState([])

    const searchApi = async () => {
        const response = await swapi.get('/equipment');
        setEquipment(response.data[0].name)
    }

    return (
        <View>
            <Text>Inventory Screen</Text>
            <Button
                title = "Request Equipment"
                onPress = {searchApi}
            />
            <Text>First result found: {equipment}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default InventoryScreen
