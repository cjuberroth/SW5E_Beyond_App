import React from 'react'
import { Text, Button } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen'
import AbilitiesScreen from './src/screens/AbilitiesScreen'
import ActionsScreen from './src/screens/ActionsScreen'
import DescriptionScreen from './src/screens/DescriptionScreen'
import FeaturesScreen from './src/screens/FeaturesScreen'
import InventoryScreen from './src/screens/InventoryScreen'
import ManageInventoryScreen from './src/screens/ManageInventoryScreen'
import ManageSpellsScreen from './src/screens/ManageSpellsScreen'
import NotesScreen from './src/screens/NotesScreen'
import ProficienciesScreen from './src/screens/ProficienciesScreen'
import SkillsScreen from './src/screens/SkillsScreen'
import SpellsScreen from './src/screens/SpellsScreen'
import CharacterSelectorScreen from './src/screens/CharacterSelectorScreen'
import { CharacterProvider } from './src/context/CharacterContext'
//import { Button } from 'react-native-paper'

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Abilities'

    switch (routeName) {
        case 'Abilities':
            return 'Abilities'
        case 'Skills':
            return 'Skills'
        case 'Inventory':
            return 'Inventory'
        case 'Casting':
            return 'Powers'
        case 'Features':
            return 'Feats'
    }
}

const Tab = createMaterialTopTabNavigator()

function MyTabs() {
    return (
        <Tab.Navigator 
            tabBarPosition="bottom"
            screenOptions={{
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#455a64',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarScrollEnabled: true,
                tabBarBounces: true,
                tabBarStyle: {
                    backgroundColor: '#263238'
                 },
                tabBarItemStyle: {
                    width: 100
                },
                //lazy: true
            }}
        >
            <Tab.Screen name="Abilities" component={ AbilitiesScreen } options={{ tabBarLabel: 'Abilities' }} />
            <Tab.Screen name="Skills" component={ SkillsScreen } />
            <Tab.Screen name="Inventory" component={ InventoryScreen } />
            <Tab.Screen name="Casting" component={ SpellsScreen } />
            <Tab.Screen name="Features" component={ FeaturesScreen } />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator()

function App() {
    return (
        <CharacterProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Character" 
                        component={CharacterSelectorScreen}
                        options={{ title: 'Choose Character',
                                    headerStyle: {
                                        backgroundColor: '#263238',
                                    },
                                    headerTintColor: '#ffffff'
                        }} 
                    />
                    <Stack.Screen 
                        name="Tabs" 
                        component={MyTabs}
                        options={({ route }) => ({
                            headerTitle: getHeaderTitle(route),
                            headerStyle: {
                                backgroundColor: '#263238',
                            },
                            headerTintColor: '#ffffff',
                            headerRight: () => (
                                <Button 
                                    onPress={() => alert('Maybe a modal to manage HP')}
                                    title="HP"
                                    color="#ffffff">
                                </Button>
                            ),
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </CharacterProvider>
    )
}

export default App