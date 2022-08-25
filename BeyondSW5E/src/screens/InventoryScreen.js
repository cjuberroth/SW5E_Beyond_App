import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import ItemCard from '../components/ItemCard'

const InventoryScreen = () => {
    const equipment = useContext(CharacterContext).characterEquipment.equipment

    return (
        <View style = { styles.screenContainer }>
            <View style = { styles.tableHeader }>
                <Text style = {[ styles.column, styles.colEquip, styles.colHeader ]}>Equip</Text>
                <Text style = {[ styles.column, styles.colItem, styles.colHeader ]}>Item</Text>
                <Text style = {[ styles.column, styles.colQty, styles.colHeader ]}>Qty</Text>
                <Text style = {[ styles.column, styles.colCost, styles.colHeader ]}>Cost</Text>
            </View>
            <View>
                <FlatList
                    data = { equipment }
                    keyExtractor = {(equip) => equip.name}
                    renderItem={({ item }) => {
                        return <ItemCard
                                    item = { item }
                                />
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: 'row',
        margin: 5
    },
    screenContainer: {
        flex: 1,
        backgroundColor: '#263238'
    },
    column: {
        fontSize: 15,
        color: 'white',
        paddingHorizontal: 10
    },
    colHeader: {
        fontWeight: 'bold',
        fontSize: 18
    },
    colEquip: {
        flex: 4
    },
    colItem: {
        flex: 12
    },
    colQty: {
        flex: 3
    },
    colCost: {
        flex: 5
    }
})

export default InventoryScreen
