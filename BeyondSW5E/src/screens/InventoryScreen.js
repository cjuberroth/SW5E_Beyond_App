import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import EquipmentBlock from '../components/EquipmentBlock'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles'

const InventoryScreen = () => {
    const equipment = useContext(CharacterContext).characterEquipment.equipment
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const {equippable, setEquippable} = useContext(CharacterContext)
    const lockout = 0
    useEffect(() => {
        setEquippable(equipment)
    }, [lockout])

    // This block loads the equipment categories within the loaded equipment block
    var itemCategories = []
    equipment.forEach(element => {
    //equipment.forEach(element => {
        //console.log(element.name + ' ' + element.equipped)
        if(!itemCategories.includes(element.equipmentCategory)){
            itemCategories.push(element.equipmentCategory)
        }
    })
    itemCategories.sort()

    return (
        <View style={ styles.container }>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                    source={ require('../../assets/header-background.jpg') }>
                    <View style={styles.tableHeader}>
                        {/* <Text style = {[ styles.column, styles.colEquip, styles.colHeader ]}>Equipped</Text> */}
                        <Text style = {[ styles.column, styles.colItem, styles.colHeader ]}>Credits:</Text>
                        {/* <Text style = {[ styles.column, styles.colQty, styles.colHeader ]}>Cost</Text> */}
                        <Text style = {[ styles.column, styles.colCost, styles.colHeader ]}>Carried Weight:</Text>
                    </View>
                    <ScrollView bounces={false}>
                        {
                            itemCategories.map(category => {
                                let filteredEquipment = equipment.filter((item) => {
                                    if(item.equipmentCategory === category) {
                                        return item
                                    }
                                })
                                return (
                                    <EquipmentBlock 
                                        category={category} 
                                        equipment={filteredEquipment}
                                    />
                                )
                            })
                        }
                    </ScrollView>
                </ImageBackground>
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
        fontSize: 14
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
