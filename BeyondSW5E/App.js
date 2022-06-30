import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons"
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
import {CharacterProvider} from './src/context/CharacterContext'
import {AbilitiesProvider} from './src/context/AbilitiesContext'
import {SkillsProvider} from './src/context/SkillsContext'

const Tab = createMaterialTopTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator 
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 12 }
      }}
    >
      <Tab.Screen name="Abilities" component={ AbilitiesScreen } />
      <Tab.Screen name="Skills" component={ SkillsScreen } />
      <Tab.Screen name="Manage Inventory" component={ ManageInventoryScreen } />
    </Tab.Navigator>
    )
}

const SwitchNavigator = createSwitchNavigator({
    startupFlow: createStackNavigator({
      CharacterSelection: CharacterSelectorScreen
    },{
      defaultNavigationOptions:{
        title: 'SW5E Beyond'
      }
    }),
    mainFlow: MyTabs
})

const App = createAppContainer(SwitchNavigator)

export default () => {
  return (
    <CharacterProvider>
      <AbilitiesProvider>
        <SkillsProvider>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </SkillsProvider>
      </AbilitiesProvider>
    </CharacterProvider>
  )
}
