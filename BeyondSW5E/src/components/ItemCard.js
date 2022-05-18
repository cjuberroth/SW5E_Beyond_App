import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ItemCard = ({ name, cost, description }) => {
    return (
        <View style = { styles.itemCard }>
            <View style = {[styles.tableBorders, styles.itemCardRow]}>
                <View>
                    <Text style = { styles.cardHeaders }>{ name }</Text>
                </View>
                <View>
                    <Text style = { styles.cardHeaders }>Cost: { cost }</Text>
                </View>
            </View>
            <View style = {[ styles.tableBorders, styles.itemCardBlock ]}>
                <View style = { styles.itemCardDescriptionHeader }>
                    <Text style = { [styles.cardHeaders, {fontSize: 16}] }>Description</Text>
                </View>
                <View style = { styles.itemCardDescriptionContent }>
                    <Text adjustsFontSizeToFit={true}>{ description }</Text>
                </View>
            </View>
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
        borderWidth: 2
    },
    itemCard: {
        height: 200,
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
    itemCardBlock: {
        flex: 5,
        padding: 5
    },
    itemCardDescriptionHeader: {
        flex: 1,
        fontWeight: 'bold'
    },
    itemCardDescriptionContent: {
        flex: 5
    }
})

export default ItemCard
