import React, { useContext } from 'react'
import { Text, Button, Platform, StyleSheet, Pressable } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { FontAwesome5 } from '@expo/vector-icons'
import AbilitiesScreen from '../screens/AbilitiesScreen'
import ActionsScreen from '../screens/ActionsScreen'
import DescriptionScreen from '../screens/DescriptionScreen'
import FeaturesScreen from '../screens/FeaturesScreen'
import InventoryScreen from '../screens/InventoryScreen'
import ManageSpellsScreen from '../screens/ManageSpellsScreen'
import NotesScreen from '../screens/NotesScreen'
import ProficienciesScreen from '../screens/ProficienciesScreen'
import SkillsScreen from '../screens/SkillsScreen'
import SpellsScreen from '../screens/SpellsScreen'
import CharacterSelectorScreen from '../screens/CharacterSelectorScreen'
import HPModal from '../components/modals/HPModal'
import SettingsModal from '../components/modals/SettingsModal'
import RestModal from '../components/modals/RestModal'
import ConditionsModal from '../components/modals/ConditionsModal'
import DefensesModal from '../components/modals/DefensesModal'
import ShortRestModal from '../components/modals/ShortRestModal'
import LongRestModal from '../components/modals/LongRestModal'
import DiceResultModal from '../components/modals/DiceResultModal'
import EquipmentDetailsModal from '../components/modals/EquipmentDetailsModal'
import ActionDetailsModal from '../components/modals/ActionDetailsModal'
import CastingPointsModal from '../components/modals/CastingPointsModal'
import PowerDetailModal from '../components/modals/PowerDetailModal'
import RecoverHitDiceModal from '../components/modals/RecoverHitDiceModal'
import CreditsModal from '../components/modals/CreditsModal'
import DiceRollModal from '../components/modals/DiceRollModal'
import SkillDetailsModal from '../components/modals/SkillDetailsModal'
import ManageInventoryModal from '../components/modals/ManageInventoryModal'
import CarryModal from '../components/modals/CarryModal'
import CharacterContext from '../context/CharacterContext'
import { useSettingsContext } from '../context/SettingsContext'

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Abilities'

    switch (routeName) {
        case 'Abilities':
            return 'Abilities'
        case 'Skills':
            return 'Skills'
        case 'Actions':
            return 'Actions'
        case 'Inventory':
            return 'Inventory'
        case 'Casting':
            return 'Casting'
        case 'Features':
            return 'Feats'
        case 'Description':
            return 'Description'
        case 'Notes':
            return 'Notes'
    }
}

const Tab = createMaterialTopTabNavigator()

function MyTabs() {
    const charCasting = useContext(CharacterContext).characterCasting
    const isCaster = charCasting.maxForcePoints > 0 || charCasting.maxTechPoints > 0
    const { alignmentSettings } = useSettingsContext()
    return (
        <Tab.Navigator 
            tabBarPosition="bottom"
            screenOptions={{
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#455a64',
                tabBarLabelStyle: { fontSize: 11 },
                tabBarScrollEnabled: true,
                tabBarBounces: true,
                tabBarStyle: {
                    backgroundColor: 'black'
                 },
                tabBarItemStyle: {
                    width: 110
                },
                tabBarIndicatorStyle: {
                    backgroundColor: alignmentSettings.tabIndicatorColor,
                    //maybe use this with light side/dark side choice
                }
                //lazy: true
            }}
        >
            <Tab.Screen name="Abilities" component={ AbilitiesScreen } options={{ tabBarLabel: 'Abilities' }} />
            <Tab.Screen name="Skills" component={ SkillsScreen } />
            <Tab.Screen name="Actions" component={ ActionsScreen } />
            <Tab.Screen name="Inventory" component={ InventoryScreen } />
            { isCaster ? <Tab.Screen name="Casting" component={ SpellsScreen } /> : null }
            <Tab.Screen name="Features" component={ FeaturesScreen } />
            <Tab.Screen name="Description" component={ DescriptionScreen } />
            <Tab.Screen name="Notes" component={ NotesScreen } />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator()

const MainNavigator = ({ navigation }) => {
    const charData = useContext(CharacterContext).characterInformation
    const { hitPoints } = useContext(CharacterContext)
    
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Character" 
                component={CharacterSelectorScreen}
                options={({navigation}) => ({ 
                    title: 'Choose Character',
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: '#ffffff',
                    headerRight: () => (
                        <Pressable style={{fontSize: 25, color: 'white'}} onPress={() => navigation.navigate('SettingsModal')} >
                            <FontAwesome5 style={{fontSize: 25, color: 'white'}} name="cog" />
                        </Pressable>
                    ),
                })} 
            />
            <Stack.Screen 
                name="Tabs" 
                component={MyTabs}
                options={({ route, navigation }) => ({
                    headerTitle: getHeaderTitle(route),
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: '#ffffff',
                    headerBackTitleVisible: false,
                    headerRight: () => (
                        <Button style={styles.headerButton}
                            onPress={() => navigation.navigate('HPModal')}
                            title={hitPoints + "/" + charData.hitPoints}
                            color={Platform.OS === 'ios' ? '#ffffff' : 'black'}>
                        </Button>
                    ),
                })}
            />
            <Stack.Screen
                name="HPModal"
                component={HPModal}
                options={{ 
                    presentation: 'transparentModal',
                    title: 'HP Management',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="RestModal"
                component={RestModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ConditionsModal"
                component={ConditionsModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="DefensesModal"
                component={DefensesModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ShortRestModal"
                component={ShortRestModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="LongRestModal"
                component={LongRestModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="DiceResultModal"
                component={DiceResultModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="EquipmentDetailsModal"
                component={EquipmentDetailsModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="CastingPointsModal"
                component={CastingPointsModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="PowerDetailModal"
                component={PowerDetailModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="SettingsModal"
                component={SettingsModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ActionDetailsModal"
                component={ActionDetailsModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="RecoverHitDiceModal"
                component={RecoverHitDiceModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="CreditsModal"
                component={CreditsModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="DiceRollModal"
                component={DiceRollModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="SkillDetailsModal"
                component={SkillDetailsModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ManageInventoryModal"
                component={ManageInventoryModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="CarryModal"
                component={CarryModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})

export default MainNavigator