import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './src/navigators/MainNavigator'
import { CharacterProvider } from './src/context/CharacterContext'
import { HeaderProvider } from './src/context/HeaderContext'
import { SettingsProvider } from './src/context/SettingsContext'
import { SelectProvider } from '@mobile-reality/react-native-select-pro'
import FontLoader from './src/components/FontLoader'
import useAPIData_New from './src/hooks/useAPIData_New'

function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false)
    const api = useAPIData_New()

    const handleFontsLoaded = () => {
        setFontsLoaded(true)
    }

    if (!fontsLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <FontLoader
                    fonts={{
                        'star-font': require('./assets/starFont.ttf')
                    }}
                    onFinish={handleFontsLoaded}
                />
            </View>
        )
    }

    return (
        <View style={{flex: 1}} >
            <SelectProvider>
                <CharacterProvider>
                    <SettingsProvider>
                        <HeaderProvider>
                            <NavigationContainer>
                                <MainNavigator />
                            </NavigationContainer>
                        </HeaderProvider>
                    </SettingsProvider>
                </CharacterProvider>
            </SelectProvider>
        </View>
    )
}

export default App
