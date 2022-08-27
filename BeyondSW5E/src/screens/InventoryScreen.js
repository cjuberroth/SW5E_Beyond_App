import React, { useContext, useRef } from 'react'
import { Text, View, StyleSheet, FlatList, Animated, SafeAreaView, StatusBar } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import ItemCard from '../components/ItemCard'
import Header from '../components/Header'
import HeaderContext from '../context/HeaderContext'

const InventoryScreen = () => {
    
    const headerHeight = useContext(HeaderContext).headerUtils.headerHeight
    const translateY = useContext(HeaderContext).headerUtils.translateY
    const headerUtils = useContext(HeaderContext).headerUtils

    const equipment = useContext(CharacterContext).characterEquipment.equipment

    return (
        <SafeAreaView style={ styles.container }>
            <StatusBar backgroundColor='#1c1c1c' style='light' />
            <View style = { styles.screenContainer }>
                <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
                    <Header {...{headerHeight}} />
                </Animated.View>
                <Animated.View style={[{paddingTop: headerHeight/2}, {transform: [{translateY}]}]}>
                    <View style={styles.tableHeader}>
                        <Text style = {[ styles.column, styles.colEquip, styles.colHeader ]}>Equip</Text>
                        <Text style = {[ styles.column, styles.colItem, styles.colHeader ]}>Item</Text>
                        <Text style = {[ styles.column, styles.colQty, styles.colHeader ]}>Qty</Text>
                        <Text style = {[ styles.column, styles.colCost, styles.colHeader ]}>Cost</Text>
                    </View>
                    <Animated.FlatList
                        scrollEventThrottle={16}
                        //contentContainerStyle={{paddingTop: 75}}
                        bounces = {false}
                        onScroll={headerUtils.handleScroll}
                        ref={headerUtils.ref}
                        onMomentumScrollEnd={headerUtils.handleSnap}
                        data = { equipment }
                        keyExtractor = {(equip) => equip.name}
                        renderItem={({ item }) => {
                            return <ItemCard
                                        item = { item }
                                    />
                        }}
                    />
                </Animated.View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: 'row',
        margin: 5,
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
    },
    header: {
        position: 'absolute',
        backgroundColor: '#263238',
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    }
})

export default InventoryScreen
