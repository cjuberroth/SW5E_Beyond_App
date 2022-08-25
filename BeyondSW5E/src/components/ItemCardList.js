import React, { useContext } from 'react'
import { View, FlatList, StyleSheet, Animated } from 'react-native'
import ItemCard from '../components/ItemCard'
import CharacterContext from '../context/CharacterContext'
import HeaderContext from '../context/HeaderContext'

/*  This component assumes that the data being loaded into the flatlist has
    the rowKey parameter in the object coming from the inventory of the character
    JSON data. This could create an issue. 2022_07_06
    Bo-rifle and Saberstaff are the only 2 equipment with the same name in the api
    The only difference is the weaponClassification for both
*/

const headerUtils = useContext(HeaderContext).headerUtils

const ItemCardList = ({ equipment }) => {
    return (
        <View style = {{flex:1}}>
            <Animated.FlatList
                scrollEventThrottle={16}
                onScroll={headerUtils.handleScroll}
                ref={headerUtils.ref}
                onMomentumScrollEnd={headerUtils.handleSnap}
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
