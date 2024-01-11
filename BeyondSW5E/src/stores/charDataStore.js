import { create } from 'zustand'
import { getClassesLevelProf } from '../components/characterLogic'

const useCharDataStore = create((set) => {
    return {
        getCharacterData: (data) =>
            set((state) => ({
                characterInformation: {...state.characterInformation, 
                    name: data.name,
                    image: data.image,
                    background: data.background,
                    characteristics: data.characteristics,
                    classes: getClassesLevelProf(data).classes,
                    level: getClassesLevelProf(data).level,
                    proficiency: getClassesLevelProf(data).prof,
                    conditions: data.currentStats.conditions,
                    credits: data.credits,
                    hitPointsLost: data.currentStats.hitPointsLost
                }
            })),
        characterAbilities: {
            abilitiesStrength: 0,
            abilitiesDexterity: 0,
            abilitiesConstitution: 0,
            abilitiesIntelligence: 0,
            abilitiesWisdom: 0,
            abilitiesCharisma: 0
        }
    }
})

export default useCharDataStore