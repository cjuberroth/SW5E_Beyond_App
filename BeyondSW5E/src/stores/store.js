import { create } from 'zustand'
import getClassesLevelProf from '../components/logic/getClassesLevelProf'

const useStore = create((set) => {
    return {
        //set up state for the entire character JSON
        characterJSON: {},
        //get character information from the JSON for use later
        getCharacterData: (data) =>
            set((state) => ({
                characterInformation: {...state.characterInformation, 
                    name: data.name,
                    image: data.image,
                    species: data.species.name,
                    background: data.background,
                    characteristics: data.characteristics,
                    classes: getClassesLevelProf(data).classes,
                    level: getClassesLevelProf(data).level,
                    proficiency: getClassesLevelProf(data).prof,
                    conditions: data.currentStats.conditions,
                    credits: data.credits,
                    hitPointsLost: data.currentStats.hitPointsLost
                },
                characterJSON: data
            })
        ),
        //this is where the API data is stored
        speciesData: [],
        classData: [],
        featData: [],
        powerData: [],
        archetypeData: [],
        armorPropertyData: [],
        backgroundData: [],
        conditionsData: [],
        enhancedItemData: [],
        equipmentData: [],
        featureData: [],
        fightingMasteryData: [],
        fightingStyleData: [],
        lightsaberFormData: [],
        maneuversData: [],
        skillsData: [],
        weaponFocusData: [],
        weaponPropertyData: [],
        weaponSupremacyData: [],
        setCombinedData: (data) => {
            set({ 
                speciesData: data.speciesData,
                classData: data.classData,
                featData: data.featData,
                powerData: data.powerData,
                archetypeData: data.archetypeData,
                armorPropertyData: data.armorPropertyData,
                backgroundData: data.backgroundData,
                conditionsData: data.conditionsData,
                enhancedItemData: data.enhancedItemData,
                equipmentData: data.equipmentData,
                featureData: data.featureData,
                fightingMasteryData: data.fightingMasteryData,
                fightingStyleData: data.fightingStyleData,
                lightsaberFormData: data.lightsaberFormData,
                maneuversData: data.maneuversData,
                skillsData: data.skillsData,
                weaponFocusData: data.weaponFocusData,
                weaponPropertyData: data.weaponPropertyData,
                weaponSupremacyData: data.weaponSupremacyData
            })
        }
    }
})

export default useStore