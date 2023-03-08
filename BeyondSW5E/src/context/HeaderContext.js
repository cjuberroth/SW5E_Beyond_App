import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

const HeaderContext = React.createContext()
    
export const HeaderProvider = ({children}) => {
    
    const [isCollapsed, setCollapsed] = useState(false)
    const [inspiration, setInspiration] = useState(false)

    const toggleHeader = () => {
        setCollapsed(!isCollapsed)
    }

    var bodyFlexValue = 3
    if(isCollapsed){
        bodyFlexValue = 8
    } else {
        bodyFlexValue = 3
    }
    
    const toggleInspiration = () => {
        setInspiration(!inspiration)
    }
    const toggleInspirationStyle = () => {
        if (inspiration) {
            if (!isCollapsed) {
                return styles.inspirationButton
            } else {
                return styles.inspirationButtonSmall
            }
        } else {
            if (!isCollapsed) {
                return styles.headerButton
            } else {
                return styles.headerButtonSmall
            }
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
      },
      headerButtonSmall: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        paddingHorizontal: 1,
        borderRadius: 4,
        backgroundColor: '#4A0C05',
        marginHorizontal: 20,
        width: '75%'
      },
      inspirationButtonSmall: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        paddingHorizontal: 1,
        borderRadius: 4,
        backgroundColor: '#15f2fd',
        marginHorizontal: 20,
        width: '75%'
      }
})

export default HeaderContext
