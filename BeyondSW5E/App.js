import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './src/navigators/MainNavigator'
import { Asset } from 'expo-asset'
import { AppLoading } from 'expo'
import { CharacterProvider } from './src/context/CharacterContext'
import { HeaderProvider } from './src/context/HeaderContext'

function App() {
    const [isReady, setReady] = useState(false)

    const _cacheResourcesAsync = async () => {
        const images = [require('./assets/header-background.jpg'), require('./assets/header-background-upsidedown.jpg')]

        const cacheImages = images.map(image => {
            return Asset.fromModule(image).downloadAsync()
        })
        return Promise.all(cacheImages)
    }
    
    return (
        <CharacterProvider>
            <HeaderProvider>
                <NavigationContainer>
                    <MainNavigator />
                </NavigationContainer>
            </HeaderProvider>
        </CharacterProvider>
    )
}

export default App
