import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import swapi from '../api/swapi'
import PowerCardList from '../components/PowerCardList'

const SpellsScreen = () => {
    const [power, setPower] = useState([])

    const searchApi = async () => {
        const response = await swapi.get('/power');
        setPower(response.data)
    }

    useEffect(() => { searchApi() }, [])

    return (
        <View style = { styles.screenContainer }>
            <Text style = { styles.headerStyle }>Powers Screen</Text>
            <Text>Displaying {power.length} powers.</Text>
            {
                power.length === 0
                ? <Text>Equipment is Empty</Text>
                : <PowerCardList
                      powers = { power }
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

export default SpellsScreen
