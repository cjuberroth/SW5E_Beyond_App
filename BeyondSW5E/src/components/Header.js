import React, { useContext, useRef } from 'react'
import { Text, View, StyleSheet, Image, Animated } from 'react-native'
import HeaderContext from '../context/HeaderContext'
import CharacterContext from '../context/CharacterContext'

const Header = (props) => {
    const headerHeight = useContext(HeaderContext).headerUtils.headerHeight
    // const headerHeight = props
    const characterInfo = useContext(CharacterContext).characterInformation

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

    return (
        <>
            <View style={[styles.headerContainer,
                {
                    height: headerHeight / 2,
                },
            ]}>
                <Text style={styles.headingStyle}>{characterInfo.name}</Text>
                <Image
                    source={{uri: characterInfo.image}}
                    style={{ flex: 1, width: '100%', height: '100%' }}
                    resizeMode={"contain"}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    headingStyle: {
        fontSize: 30,
        backgroundColor: '#263238',
        color: 'white',
        textAlign: 'center',
        marginBottom: 15
    },
})

export default Header

