import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import ItemCard from '../components/ItemCard'

const ItemCardList = ({ equipment }) => {
    return (
        <View style = {{flex:1}}>
            <FlatList
                data = { equipment }
                keyExtractor = {(equip) => equip.rowKey}
                renderItem={({ item }) => {
                    return <ItemCard
                                name = { item.name }
                                cost = { item.cost }
                                category = { item.equipmentCategory }
                                source = { item.contentSource }
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
