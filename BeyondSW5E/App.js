import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './src/navigators/MainNavigator'
import { CharacterProvider } from './src/context/CharacterContext'
import { HeaderProvider } from './src/context/HeaderContext'

function App() {
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
