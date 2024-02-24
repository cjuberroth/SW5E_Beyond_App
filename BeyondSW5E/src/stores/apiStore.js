import { create } from 'zustand'

const useStore = create((set) => ({
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
}))

export default useStore