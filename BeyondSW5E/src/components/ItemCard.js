import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton, SlideAnimation, ScaleAnimation} from 'react-native-popup-dialog'
import CharacterContext from '../context/CharacterContext'

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
                        <Text style = { styles.cardText }>Type: { category }</Text>
                    </View>
                    <View>
                        <Text style = { styles.cardText }>Source: { source }</Text>
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
              width={.85}
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
        fontSize: 18,
        color: 'white'
    },
    cardText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'white'
    },
    buttonStyle: {
        width: 200,
        alignSelf: 'center'
    },
    tableBorders: {
        borderColor: 'white',
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
        borderColor: 'white'
    },
    itemBottomRow: {
        borderBottomWidth: 2,
        borderColor: 'white'
    }
})

export default ItemCard
