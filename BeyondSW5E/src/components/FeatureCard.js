import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton, SlideAnimation, ScaleAnimation} from 'react-native-popup-dialog'

const FeatureCard = ({ name, description, source }) => {
    const [slideAnimationDialog, setSlideAnimationDialog] = useState(false)
    return (
        <View>
            <TouchableOpacity
                style = { styles.featureCard }
                onPress = { () => setSlideAnimationDialog(true) }
            >
                <View style = {[styles.tableBorders, styles.featureCardRow, styles.featureTopRow]}>
                    <View>
                        <Text style = { styles.cardHeaders }>{ name }</Text>
                    </View>
                </View>
                <View style = {[ styles.tableBorders, styles.featureCardRow, , styles.featureBottomRow ]}>
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
                  Name: { name } {"\n"}
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
    featureCard: {
        height: 100,
        width: 300,
        alignSelf: 'center',
        margin: 5
    },
    featureCardRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    featureTopRow: {
        borderTopWidth: 2,
        borderColor: 'black'
    },
    featureBottomRow: {
        borderBottomWidth: 2,
        borderColor: 'black'
    }
})

export default FeatureCard
