import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import ItemCard from '../components/ItemCard'

const ItemCardList = ({ equipment }) => {
    return (
        <View>
            <FlatList
                data = { equipment }
                keyExtractor = {(equip) => equip.name}
                renderItem={({ item }) => {
                    return <ItemCard
                                name = { item.name }
                                cost = { item.cost }
                                description = { item.description }
                            />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ItemCardList
