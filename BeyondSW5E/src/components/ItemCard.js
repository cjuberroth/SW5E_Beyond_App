import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton, SlideAnimation, ScaleAnimation} from 'react-native-popup-dialog'

const ItemCard = ({ name, cost, category, source, description }) => {
    const [slideAnimationDialog, setSlideAnimationDialog] = useState(false)
    return (
        <View>
            <TouchableOpacity
                style = { styles.itemCard }
                onPress = { () => setSlideAnimationDialog(true) }
            >
                <View style = {[styles.tableBorders, styles.itemCardRow, styles.itemTopRow]}>
                    <View>
                        <Text style = { styles.cardHeaders }>{ name }</Text>
                    </View>
                    <View>
                        <Text style = { styles.cardHeaders }>Cost: { cost }</Text>
                    </View>
                </View>
                <View style = {[ styles.tableBorders, styles.itemCardRow, , styles.itemBottomRow ]}>
                    <View>
                        <Text style = { styles.cardHeaders }>Type: { category }</Text>
                    </View>
                    <View>
                        <Text style = { styles.cardHeaders }>Source: { source }</Text>
                    </View>
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
              dialogTitle={
                <DialogTitle
                  title = { name }
                />
              }
              dialogAnimation={
                new SlideAnimation({slideFrom: 'right'})
              }>
              <DialogContent>
                <Text>
                  Cost: { cost } {"\n"}
                  Type: { category } {"\n"}
                  Source: { source } {"\n"}
                  Description: { description }
                </Text>
              </DialogContent>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
    cardHeaders: {
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonStyle: {
        width: 200,
        alignSelf: 'center'
    },
    tableBorders: {
        borderColor: 'black',
        borderLeftWidth: 2,
        borderRightWidth: 2
    },
    itemCard: {
        height: 100,
        width: 300,
        alignSelf: 'center',
        margin: 5
    },
    itemCardRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    itemTopRow: {
        borderTopWidth: 2,
        borderColor: 'black'
    },
    itemBottomRow: {
        borderBottomWidth: 2,
        borderColor: 'black'
    }
})

export default ItemCard
