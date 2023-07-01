import React, { useContext } from 'react'
import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../../context/CharacterContext'
import InventoryBlock from '../InventoryBlock'

const ManageInventoryModal = ({ route }) => {
    const navigation = useNavigation()
    const equipment = useContext(CharacterContext).equippable
    const { equippable } = useContext(CharacterContext)

    // This block loads the equipment categories within the loaded equipment block
    var itemCategories = []
    equipment.forEach(element => {
        if(!itemCategories.includes(element.equipmentCategory)){
            itemCategories.push(element.equipmentCategory)
        }
    })
    
    itemCategories.sort()

    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText}>Manage Inventory</Text>
                </View>
                <ScrollView style={{height: '94.2%'}} bounces={false}>
                    {
                        route.params.categories.map((category, index) => {
                            let filteredEquipment = equippable.filter((item) => {
                                if(item.equipmentCategory === category) {
                                    return item
                                }
                            })
                            return (
                                <InventoryBlock
                                    key={index} 
                                    category={category} 
                                    equipment={filteredEquipment}
                                />
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    modalInner: {
        height: '80%',
        width: '95%',
        backgroundColor: '#ECEFF1',
        //justifyContent: 'center',
        padding: 5,
        borderRadius: 5
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    modalHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    modalDescriptionText: {
        marginTop: 10
    },
    modalCloseButton: {
        fontSize: 25, 
        color: 'black',
    },
    modalHeading: {
        alignItems: 'center',
        fontSize: 25,
        paddingVertical: 5
    },
    modalStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 1
    },
    modalStatCol: {
        flex: 2
    },
    modalStatValueCol: {
        flex: 2
    },
})

export default ManageInventoryModal