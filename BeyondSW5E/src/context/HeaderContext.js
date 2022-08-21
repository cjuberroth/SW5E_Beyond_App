import React, { useState, useRef } from 'react'
import { Animated } from 'react-native'

const HeaderContext = React.createContext()
    
export const HeaderProvider = ({children}) => {
    const headerHeight = 150 * 2

    const ref = useRef(null)
    const scrollY = useRef(new Animated.Value(0))
    const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerHeight)

    const handleScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: {y: scrollY.current},
                },
            },
        ],
        {
            useNativeDriver: true,
        },
    )

    const translateY = scrollYClamped.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -(headerHeight / 2)],
    })

    const translateYNumber = useRef()

    translateY.addListener(({value}) => {
        translateYNumber.current = value
    })

    const handleSnap = ({nativeEvent}) => {
        const offsetY = nativeEvent.contentOffset.y
        if (
            !(
                translateYNumber.current === 0 ||
                translateYNumber.current === -headerHeight / 2
            )
        ) {
            if (ref.current) {
                ref.current.scrollToOffset({
                    offset:
                        getCloser(translateYNumber.current, -headerHeight / 2, 0) === -headerHeight / 2
                            ? offsetY + headerHeight / 2
                            : offsetY - headerHeight / 2
                })
            }
        }
    }

    const getCloser = (value, checkOne, checkTwo) => {
        Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo
    }

    const headerUtils = {
        headerHeight: headerHeight,
        translateY: translateY
    }

    return <HeaderContext.Provider value={{headerUtils}}>
        {children}
    </HeaderContext.Provider>

}

export default HeaderContext
