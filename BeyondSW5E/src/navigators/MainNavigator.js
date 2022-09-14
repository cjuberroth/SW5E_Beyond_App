import React, { useContext } from 'react'
import { Text, Button, Platform, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import AbilitiesScreen from '../screens/AbilitiesScreen'
import ActionsScreen from '../screens/ActionsScreen'
import DescriptionScreen from '../screens/DescriptionScreen'
import FeaturesScreen from '../screens/FeaturesScreen'
import InventoryScreen from '../screens/InventoryScreen'
import ManageInventoryScreen from '../screens/ManageInventoryScreen'
import ManageSpellsScreen from '../screens/ManageSpellsScreen'
import NotesScreen from '../screens/NotesScreen'
import ProficienciesScreen from '../screens/ProficienciesScreen'
import SkillsScreen from '../screens/SkillsScreen'
import SpellsScreen from '../screens/SpellsScreen'
import CharacterSelectorScreen from '../screens/CharacterSelectorScreen'
import CharacterContext from '../context/CharacterContext'

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Abilities'

    switch (routeName) {
        case 'Abilities':
            return 'Abilities'
        case 'Skills':
            return 'Skills'
        case 'Inventory':
            return 'Inventory'
        case 'Force':
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
            <Tab.Screen name="Force" component={ SpellsScreen } />
            <Tab.Screen name="Features" component={ FeaturesScreen } />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator()

const MainNavigator = props => {
    const charData = useContext(CharacterContext).characterInformation
    const maxHP = useContext(CharacterContext).characterInformation.hitPoints
    const lostHP = useContext(CharacterContext).characterInformation.hitPointsLost
    
    return (
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
                                headerBackTitle: charData.name,
                                headerRight: () => (
                                    <Button style={styles.headerButton}
                                        onPress={() => alert('Maybe a modal to manage HP')}
                                        title={(charData.hitPoints-charData.hitPointsLost) + "/" + charData.hitPoints}
                                        color={Platform.OS === 'ios' ? '#ffffff' : '#263238'}>
                                    </Button>
                                ),
                            })}
                        />
                    </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})

export default MainNavigator