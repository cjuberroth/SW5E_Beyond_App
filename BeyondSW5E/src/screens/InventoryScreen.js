import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet, ImageBackground, ScrollView, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CharacterContext from '../context/CharacterContext'
import { useSettingsContext } from '../context/SettingsContext'
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
    const { setEquippable } = useContext(CharacterContext)
    const { credits } = useContext(CharacterContext)
    const { carriedWeight } = useContext(CharacterContext)
    const { emblem, alignmentSettings } = useSettingsContext()

    const lockout = 0
    useEffect(() => {
        setEquippable(equipment)
    }, [lockout])

    // This block loads the equipment categories within the loaded equipment block
    var itemCategories = []
    equipment.forEach(element => {
        if(!itemCategories.includes(element.equipmentCategory)){
            itemCategories.push(element.equipmentCategory)
        }
    })
    
    itemCategories.sort()

    const showManageInventory = () => {
        navigation.navigate('ManageInventoryModal', {
            categories: itemCategories
        })
    }

    return (
        <View style={ styles.container }>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                    source={ require('../../assets/starBackgroundVert.jpg') }>
                    <ImageBackground imageStyle={styles.imgBackground} 
                    source={emblem && {uri: emblem}}
                    >
                        <View style={styles.tableHeader}>
                            <View style={{flexDirection: 'column'}}>
                            <Pressable style = {styles.column} onPress={() => navigation.navigate('CreditsModal')}>
                                <Text style = {[ styles.column, styles.colHeader, styles.credits, {borderColor: alignmentSettings.creditsButtonColor, backgroundColor: alignmentSettings.creditsButtonColor} ]}>Credits: {credits}</Text>
                            </Pressable>
                            </View>
                            <Text style = {[ styles.column, styles.colCost, styles.colHeader, {textAlign: 'right'} ]}>Carried Weight: {carriedWeight}lb</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Pressable style= {{padding: 5}} onPress={() => showManageInventory()} >
                                <Text style={[ styles.column, styles.colHeader, styles.credits, {borderColor: alignmentSettings.creditsButtonColor, backgroundColor: alignmentSettings.creditsButtonColor}]}>Manage Inventory</Text>
                            </Pressable>
                        </View>
                        <ScrollView style={{height: '85%'}} bounces={false}>
                            {
                                itemCategories.map((category, index) => {
                                    let filteredEquipment = equipment.filter((item) => {
                                        if(item.equipmentCategory === category) {
                                            return item
                                        }
                                    })
                                    return (
                                        <EquipmentBlock
                                            key={index} 
                                            category={category} 
                                            equipment={filteredEquipment}
                                        />
                                    )
                                })
                            }
                        </ScrollView>
                    </ImageBackground>
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
        marginVertical: 5,
        justifyContent: 'space-between'
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
        borderColor: 'rgba(21, 242, 253, 0.1)',
        alignItems: 'center',
        backgroundColor: 'rgba(21, 242, 253, 0.1)',
        overflow: 'hidden'
    },
    imgBackground: {
        width: '100%',
        resizeMode: 'contain'
    },
    
})

export default InventoryScreen
