import React, { useContext, useRef } from 'react'
import { Text, View, StyleSheet, Animated, ScrollView, Image } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import ItemCardList from '../components/ItemCardList'

//set up constants for collapsible header
const H_MAX_HEIGHT = 150
const H_MIN_HEIGHT = 52
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT

const InventoryScreen = () => {
    //for collapsible header
    const scrollOffsetY = useRef(new Animated.Value(0)).current
    const headerScrollHeight = scrollOffsetY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
        extrapolate: "clamp"
    })

    //import character data from context
    const characterInfo = useContext(CharacterContext).characterInformation
    const equipment = useContext(CharacterContext).characterEquipment.equipment

    return (
        <View style={{ flex: 1 }}>
            <ScrollView 
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollOffsetY } } }
                ], {useNativeDriver: false})}
                scrollEventThrottle={16}
            >
                <View style={{ paddingTop: H_MAX_HEIGHT }}>
                    <View style = { styles.screenContainer }>
                        <Text style = { styles.headerStyle }>Inventory</Text>
                        <Text style= {{ color: 'white' }}>Displaying {equipment.length} items.</Text>
                        {
                            equipment.length === 0
                            ? <Text style= {{ color: 'white' }}>Equipment is Empty</Text>
                            : <ItemCardList
                                equipment = { equipment }
                            />
                        }
                    </View>
                </View>
            </ScrollView>
            <Animated.View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: headerScrollHeight,
                    width: "100%",
                    overflow: "hidden",
                    zIndex: 999,
                    // STYLE
                    //borderBottomColor: "#EFEFF4",
                    //borderBottomWidth: 2,
                    padding: 10,
                    backgroundColor: '#263238'
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerStyle}>{characterInfo.name}</Text>
                    <Image
                        source={{uri: characterInfo.image}}
                        style={{ flex: 1, width: '100%', height: '100%' }}
                        resizeMode={"contain"}
                    />
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#263238'
    },
    headerStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        flex: 2
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row-reverse'
    }
})

export default InventoryScreen
