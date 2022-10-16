import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Dialog, { DialogTitle, DialogContent, SlideAnimation } from 'react-native-popup-dialog'
import AppStyles from '../styles/AppStyles'
import Checkbox from './Checkbox'

const ItemCard = ({ item }) => {
    const [slideAnimationDialog, setSlideAnimationDialog] = useState(false)
    const [checked, onChange] = useState(item.equipped)
    
    return (
        <View>
            <TouchableOpacity
                onPress = { () => setSlideAnimationDialog(true) }
            >
                <View style = { AppStyles.tableStyles.tableRow }>
                    {/* <Text style = {[ AppStyles.tableStyles.column, styles.colEquip ]}>{ item.equipmentCategory }</Text> */}
                    <Checkbox
                      checked={checked}
                      onChange={onChange}
                      buttonStyle={styles.checkboxBase}
                      activeButtonStyle={styles.checkboxChecked} />
                    <Text style = {[ AppStyles.tableStyles.column, styles.colItem ]}>{ item.name }</Text>
                    <Text style = {[ AppStyles.tableStyles.column, styles.colCost ]}>{ item.cost }</Text>
                    <Text style = {[ AppStyles.tableStyles.column, styles.colQty ]}>{ item.quantity }</Text>
                </View>
            </TouchableOpacity>
            <Dialog
              onDismiss={() => {
                setSlideAnimationDialog(false);
              }}
              onTouchOutside={() => {
                setSlideAnimationDialog(false);
              }}
              visible={slideAnimationDialog}
              width={.85}
              dialogTitle={
                <DialogTitle
                  title = { item.name }
                />
              }
              dialogAnimation={
                new SlideAnimation({slideFrom: 'right'})
              }>
              <DialogContent>
                <Text>
                  Cost: { item.cost } {"\n"}
                  Type: { item.equipmentCategory } {"\n"}
                  Source: { item.contentSource } {"\n"}
                  Description: { item.description } {"\n"}
                  Equipped: { item.equipped ? 'true' : 'false' }
                </Text>
              </DialogContent>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
    colEquip: { flex: 4, fontSize: 12 },
    colItem: { flex: 12, fontSize: 12 },
    colQty: { flex: 3, fontSize: 12 },
    colCost: { flex: 5, fontSize: 12 },
    checkboxBase: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      borderColor: 'white',
      backgroundColor: 'transparent',
    },
  
    checkboxChecked: {
      backgroundColor: 'white',
    }
})

export default ItemCard
