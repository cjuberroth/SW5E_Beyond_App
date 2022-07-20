import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import ItemCardList from '../components/ItemCardList'

const InventoryScreen = () => {
    const charData = useContext(CharacterContext).character
    //const equipment = charData.equipment.concat(charData.customEquipment)
    const equipment = useContext(CharacterContext).characterEquipment.equipment

    return (
        <View style = { styles.screenContainer }>
            <Text style = { styles.headerStyle }>Inventory</Text>
            <Text>Displaying {equipment.length} items.</Text>
            {
                equipment.length === 0
                ? <Text>Equipment is Empty</Text>
                : <ItemCardList
                      equipment = { equipment }
                  />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        alignItems: 'center',
        flex: 1
    },
    headerStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default InventoryScreen
