import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import PowerCard from '../components/PowerCard'

const PowerCardList = ({ powers }) => {
    //console.log(powers.name)
    return (
        <View style = {{flex:1}}>
            <FlatList
                data = { powers }
                keyExtractor = {(power) => power.rowKey}
                renderItem={({ item }) => {
                    return <PowerCard
                                name = { item.name }
                                type = { item.powerType }
                                level = { item.level }
                                period = { item.castingPeriod }
                                periodText = { item.castingPeriodText }
                                description = { item.description }
                                source = { item.contentSource }
                            />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default PowerCardList
