import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet, ImageBackground, ScrollView, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CharacterContext from '../context/CharacterContext'
import EquipmentBlock from '../components/EquipmentBlock'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles'

const InventoryScreen = () => {
    const navigation = useNavigation()
    const equipment = useContext(CharacterContext).characterEquipment.equipment
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const {equippable, setEquippable} = useContext(CharacterContext)
    const {credits, setCredits} = useContext(CharacterContext)
    const lockout = 0
    useEffect(() => {
        setEquippable(equipment)
    }, [lockout])

    let carriedWeight = 0
    for (let i = 0; i < equipment.length; i++) {
        let temp = parseInt(equipment[i].weight)
        if (!isNaN(temp)) {
            carriedWeight = carriedWeight + temp
        }
    }

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
                        <Pressable style = {[ styles.column, styles.colHeader ]} onPress={() => navigation.navigate('CreditsModal')}>
                            <Text style = {[ styles.column, styles.colHeader, styles.credits ]}>Credits: {credits}</Text>
                        </Pressable>
                        {/* <Text style = {[ styles.column, styles.colQty, styles.colHeader ]}>Cost</Text> */}
                        <Text style = {[ styles.column, styles.colCost, styles.colHeader, {textAlign: 'right'} ]}>Carried Weight: {carriedWeight}</Text>
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
        marginVertical: 5
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
        flex: 1
    },
    colQty: {
        flex: 3
    },
    colCost: {
        flex: 5
    },
    credits: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#4A0C05',
        alignItems: 'center',
        backgroundColor: '#4A0C05'
    }
    
})

export default InventoryScreen
