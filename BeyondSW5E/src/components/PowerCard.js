import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton, SlideAnimation, ScaleAnimation} from 'react-native-popup-dialog'

const PowerCard = ({ name, type, level, period, periodText, description, source }) => {
    const [slideAnimationDialog, setSlideAnimationDialog] = useState(false)
    return (
        <View>
            <TouchableOpacity
                style = { styles.powerCard }
                onPress = { () => setSlideAnimationDialog(true) }
            >
                <View style = {[styles.tableBorders, styles.powerCardRow, styles.powerTopRow]}>
                    <View>
                        <Text style = { styles.cardHeaders }>{ name }</Text>
                    </View>
                    <View>
                        <Text style = { styles.cardHeaders }>Level: { level }</Text>
                    </View>
                </View>
                <View style = {[ styles.tableBorders, styles.powerCardRow, , styles.powerBottomRow ]}>
                    <View>
                        <Text style = { styles.cardHeaders }>{ type }</Text>
                    </View>
                    <View>
                        <Text style = { styles.cardHeaders }>{ period }</Text>
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
                  Type: { type } {"\n"}
                  Level: { level } {"\n"}
                  Source: { source } {"\n"}
                  Period: { period } {"\n"}
                  Period Text: { periodText } {"\n"}
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
    powerCard: {
        height: 100,
        width: 300,
        alignSelf: 'center',
        margin: 5
    },
    powerCardRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    powerTopRow: {
        borderTopWidth: 2,
        borderColor: 'black'
    },
    powerBottomRow: {
        borderBottomWidth: 2,
        borderColor: 'black'
    }
})

export default PowerCard
