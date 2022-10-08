import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList, Animated } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import ItemCard from '../components/ItemCard'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'

const InventoryScreen = () => {

    const equipment = useContext(CharacterContext).characterEquipment.equipment
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed

    return (
        <View style={ styles.container }>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <View style={styles.tableHeader}>
                    <Text style = {[ styles.column, styles.colEquip, styles.colHeader ]}>Equip</Text>
                    <Text style = {[ styles.column, styles.colItem, styles.colHeader ]}>Item</Text>
                    <Text style = {[ styles.column, styles.colQty, styles.colHeader ]}>Cost</Text>
                    <Text style = {[ styles.column, styles.colCost, styles.colHeader ]}>Qty</Text>
                </View>
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
    container: {
        flex: 1,
        backgroundColor: '#263238',
    },
    header: {
        flex: 1
    },
    tableHeader: {
        flexDirection: 'row',
        margin: 5,
    },
    column: {
        fontSize: 15,
        color: 'white',
        paddingHorizontal: 10
    },
    colHeader: {
        fontWeight: 'bold',
        fontSize: 12
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
    },
    
    
})

export default InventoryScreen
