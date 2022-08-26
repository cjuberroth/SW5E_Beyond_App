import React, { useContext, useRef } from 'react'
import { Text, View, StyleSheet, FlatList, Animated } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import ItemCard from '../components/ItemCard'
import Header from '../components/Header'
import HeaderContext from '../context/HeaderContext'

const InventoryScreen = () => {
    
    const headerHeight = useContext(HeaderContext).headerUtils.headerHeight
    const translateY = useContext(HeaderContext).headerUtils.translateY
    const headerUtils = useContext(HeaderContext).headerUtils
    // const translateYNumber = useContext(HeaderContext).headerUtils.translateYNumber
    // translateY.addListener(({value}) => {
    //     translateYNumber.current = value
    // })

    // const headerHeight = 150 * 2

    // const ref = useRef(null)
    // const scrollY = useRef(new Animated.Value(0))
    // const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerHeight)

    // const handleScroll = Animated.event(
    //     [
    //         {
    //             nativeEvent: {
    //                 contentOffset: {y: scrollY.current},
    //             },
    //         },
    //     ],
    //     {
    //         useNativeDriver: true,
    //     },
    // )

    // const translateY = scrollYClamped.interpolate({
    //     inputRange: [0, headerHeight],
    //     outputRange: [0, -(headerHeight / 2)],
    // })

    // const translateYNumber = useRef()

    // translateY.addListener(({value}) => {
    //     translateYNumber.current = value
    // })

    // const handleSnap = ({nativeEvent}) => {
    //     const offsetY = nativeEvent.contentOffset.y
    //     if (
    //         !(
    //             translateYNumber.current === 0 ||
    //             translateYNumber.current === -headerHeight / 2
    //         )
    //     ) {
    //         if (ref.current) {
    //             ref.current.scrollToOffset({
    //                 offset:
    //                     getCloser(translateYNumber.current, -headerHeight / 2, 0) === -headerHeight / 2
    //                         ? offsetY + headerHeight / 2
    //                         : offsetY - headerHeight / 2
    //             })
    //         }
    //     }
    // }

    // const getCloser = (value, checkOne, checkTwo) => {
    //     Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo
    // }

    const equipment = useContext(CharacterContext).characterEquipment.equipment

    return (
        <View style = { styles.screenContainer }>
            <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
                <Header {...{headerHeight}} />
            </Animated.View>
            <View style = { styles.tableHeader }>
                <Text style = {[ styles.column, styles.colEquip, styles.colHeader ]}>Equip</Text>
                <Text style = {[ styles.column, styles.colItem, styles.colHeader ]}>Item</Text>
                <Text style = {[ styles.column, styles.colQty, styles.colHeader ]}>Qty</Text>
                <Text style = {[ styles.column, styles.colCost, styles.colHeader ]}>Cost</Text>
            </View>
            <View>
                <Animated.FlatList
                    scrollEventThrottle={16}
                    onScroll={handleScroll}
                    ref={ref}
                    onMomentumScrollEnd={handleSnap}
                    data = { equipment }
                    keyExtractor = {(equip) => equip.name}
                    renderItem={({ item }) => {
                        return <ItemCard
                                    item = { item }
                                />
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: 'row',
        margin: 5
    },
    screenContainer: {
        flex: 1,
        backgroundColor: '#263238'
    },
    column: {
        fontSize: 15,
        color: 'white',
        paddingHorizontal: 10
    },
    colHeader: {
        fontWeight: 'bold',
        fontSize: 18
    },
    colEquip: {
        flex: 4
    },
    colItem: {
        flex: 12
    },
    colQty: {
        flex: 3
    },
    colCost: {
        flex: 5
    },
    header: {
        position: 'absolute',
        backgroundColor: '#263238',
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
    }
})

export default InventoryScreen
