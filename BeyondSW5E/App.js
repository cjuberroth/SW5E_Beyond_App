import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './src/navigators/MainNavigator'
import { CharacterProvider } from './src/context/CharacterContext'
import { HeaderProvider } from './src/context/HeaderContext'
import { SettingsProvider } from './src/context/SettingsContext'
import { SelectProvider } from '@mobile-reality/react-native-select-pro'

SplashScreen.preventAutoHideAsync()

function App() {
    const [isReady, setReady] = useState(false)

    useEffect(() => {
        async function prepare() {
            try {
                require('./assets/header-background-upsidedown.jpg')
                require('./assets/header-background.jpg')
            } catch (e) {
                console.warn(e)
            } finally {
                setReady(true)
            }
        }
        prepare()
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (isReady) {
            await SplashScreen.hideAsync()
        }
    }, [isReady])

    if (!isReady) {
        return null
    }

    return (
        <View style={{flex: 1}} onLayout={onLayoutRootView}>
            <SelectProvider>
                <CharacterProvider>
                    <HeaderProvider>
                        <SettingsProvider>
                            <NavigationContainer>
                                <MainNavigator />
                            </NavigationContainer>
                        </SettingsProvider>
                    </HeaderProvider>
                </CharacterProvider>
            </SelectProvider>
        </View>
    )
}

export default App
