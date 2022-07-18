import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import ItemCard from '../components/ItemCard'
import CharacterContext from '../context/CharacterContext'

/*  This component assumes that the data being loaded into the flatlist has
    the rowKey parameter in the object coming from the inventory of the character
    JSON data. This could create an issue. 2022_07_06
    Bo-rifle and Saberstaff are the only 2 equipment with the same name in the api
    The only difference is the weaponClassification for both
*/

const ItemCardList = ({ equipment }) => {
    return (
        <View style = {{flex:1}}>
            <FlatList
                data = { equipment }
                keyExtractor = {(equip) => equip.name}
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
