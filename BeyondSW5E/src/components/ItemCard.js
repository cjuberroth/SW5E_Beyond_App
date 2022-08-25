import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Dialog, { DialogTitle, DialogContent, SlideAnimation } from 'react-native-popup-dialog'
import AppStyles from '../styles/AppStyles'

const ItemCard = ({ item }) => {
    const [slideAnimationDialog, setSlideAnimationDialog] = useState(false)
    return (
        <View>
            <TouchableOpacity
                onPress = { () => setSlideAnimationDialog(true) }
            >
                <View style = { AppStyles.tableStyles.tableRow }>
                    <Text style = {[ AppStyles.tableStyles.column, styles.colEquip ]}>{ item.equipmentCategory }</Text>
                    <Text style = {[ AppStyles.tableStyles.column, styles.colItem ]}>{ item.name }</Text>
                    <Text style = {[ AppStyles.tableStyles.column, styles.colCost ]}>{ item.cost }</Text>
                    <Text style = {[ AppStyles.tableStyles.column, styles.colQty ]}>{ item.weight }</Text>
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
                  Description: { item.description }
                </Text>
              </DialogContent>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
    colEquip: { flex: 4 },
    colItem: { flex: 12 },
    colQty: { flex: 3 },
    colCost: { flex: 5 }
})

export default ItemCard
