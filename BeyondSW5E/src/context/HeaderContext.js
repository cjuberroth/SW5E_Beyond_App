import React, { useState } from 'react'
import { Animated, useWindowDimensions } from 'react-native'

const HeaderContext = React.createContext()
    
export const HeaderProvider = ({children}) => {
    
    const [isCollapsed, setCollapsed] = useState(false)

    const toggleHeader = () => {
        setCollapsed(!isCollapsed)
    }

    var bodyFlexValue = 2
    if(isCollapsed){
        bodyFlexValue = 8
    } else {
        bodyFlexValue = 2
    }
    
    const headerUtils = {
        isCollapsed: isCollapsed,
        toggleHeader: toggleHeader,
        flexValue: bodyFlexValue
    }

    return <HeaderContext.Provider value={{headerUtils}}>
        {children}
    </HeaderContext.Provider>

}

export default HeaderContext
