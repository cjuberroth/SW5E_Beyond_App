import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

const HeaderContext = React.createContext()
    
export const HeaderProvider = ({children}) => {
    
    const [isCollapsed, setCollapsed] = useState(false)
    const [inspiration, setInspiration] = useState(false)

    const toggleHeader = () => {
        setCollapsed(!isCollapsed)
    }

    var bodyFlexValue = 2
    if(isCollapsed){
        bodyFlexValue = 8
    } else {
        bodyFlexValue = 2
    }
    
    const toggleInspiration = () => {
        setInspiration(!inspiration)
    }
    const toggleInspirationStyle = () => {
        if (inspiration) {
            return styles.inspirationButton
        } else {
            return styles.headerButton
        }
    }

    const headerUtils = {
        isCollapsed,
        setCollapsed,
        toggleHeader,
        flexValue: bodyFlexValue,
        inspiration,
        setInspiration,
        toggleInspiration,
        toggleInspirationStyle
    }

    return <HeaderContext.Provider value={{headerUtils}}>
        {children}
    </HeaderContext.Provider>

}

const styles = StyleSheet.create({
    headerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#4A0C05',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%'
      },
      inspirationButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#15f2fd',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%'
      }
})

export default HeaderContext
