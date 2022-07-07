import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import ItemCard from '../components/ItemCard'

/*  This component assumes that the data being loaded into the flatlist has
    the rowKey parameter in the object coming from the inventory of the character
    JSON data. This could create an issue. 2022_07_06
*/

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
