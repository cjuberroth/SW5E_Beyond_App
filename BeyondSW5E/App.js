import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
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
import {CharacterProvider} from './src/context/CharacterContext'
import {AbilitiesProvider} from './src/context/AbilitiesContext'
import {SkillsProvider} from './src/context/SkillsContext'

const navigator = createStackNavigator({
  Home: HomeScreen,
  Abilities: AbilitiesScreen,
  Actions: ActionsScreen,
  Description: DescriptionScreen,
  Features: FeaturesScreen,
  Inventory: InventoryScreen,
  ManageInventory: ManageInventoryScreen,
  ManageSpells: ManageSpellsScreen,
  Notes: NotesScreen,
  Proficiencies: ProficienciesScreen,
  Skills: SkillsScreen,
  Spells: SpellsScreen
  }, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Project Unknown'
    }
  })

const App =  createAppContainer(navigator)

export default () => {
  return <CharacterProvider>
    <AbilitiesProvider>
      <SkillsProvider>
        <App />
      </SkillsProvider>
    </AbilitiesProvider>
  </CharacterProvider>
}
