import { create } from 'zustand'

const useAPI_DataStore = create((set) => ({
    //this is where the API data is stored
    setAPIData: (data) => {
        set((state) => ({ 
            apiData: {...state.apiData,
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
            }
        }))
    },
}))

export default useAPI_DataStore