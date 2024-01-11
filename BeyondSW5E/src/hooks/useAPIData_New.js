import { useEffect } from 'react'
import useAPI_DataStore from '../stores/apiDataStore'

const useAPIData_New = () => {

    const { api_Archetype, set_api_Archetype } = useAPI_DataStore()
    const { api_ArmorProperty, set_api_ArmorProperty } = useAPI_DataStore()
    const { api_Background, set_api_Background } = useAPI_DataStore()
    const { api_Class, set_api_Class } = useAPI_DataStore()
    const { api_Conditions, set_api_Conditions } = useAPI_DataStore()
    const { api_EnhancedItem, set_api_EnhancedItem } = useAPI_DataStore()
    const { api_Equipment, set_api_Equipment } = useAPI_DataStore()
    const { api_Feat, set_api_Feat } = useAPI_DataStore()
    const { api_Feature, set_api_Feature } = useAPI_DataStore()
    const { api_FightingMastery, set_api_FightingMastery } = useAPI_DataStore()
    const { api_FightingStyle, set_api_FightingStyle } = useAPI_DataStore()
    const { api_LightsaberForm, set_api_LightsaberForm } = useAPI_DataStore()
    const { api_Maneuvers, set_api_Maneuvers } = useAPI_DataStore()
    const { api_Power, set_api_Power } = useAPI_DataStore()
    const { api_SkillsLU, set_api_SkillsLU } = useAPI_DataStore()
    const { api_Species, set_api_Species } = useAPI_DataStore()
    const { api_WeaponFocus, set_api_WeaponFocus } = useAPI_DataStore()
    const { api_WeaponProperty, set_api_WeaponProperty } = useAPI_DataStore()
    const { api_WeaponSupremacy, set_api_WeaponSupremacy } = useAPI_DataStore()

    useEffect(() => {
        fetch('https://sw5eapi.azurewebsites.net/api/archetype')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    className: item.className,
                    text: item.text,
                    rowKey: item.rowKey
                }))
                set_api_Archetype(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching Archetype: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/ArmorProperty')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    content: item.text,
                    rowKey: item.rowKey
                }))
                set_api_ArmorProperty(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching ArmorProperty: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/background')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    text: item.flavorText,
                    flavorName: item.flavorName,
                    flavorDescription: item.flavorDescription,
                    rowKey: item.rowKey
                }))
                set_api_Background(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching Background: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/class')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    primaryAbility: item.primaryAbility,
                    levelChanges: item.levelChanges,
                    hitDiceDieType: item.hitDiceDieType,
                    armorProficiencies: item.armorProficiencies,
                    weaponProficiencies: item.weaponProficiencies,
                    toolProficiencies: item.toolProficiencies,
                    savingThrows: item.savingThrows,
                    rowKey: item.rowKey
                }))
                set_api_Class(cleanedData)
        })
            .catch((err) => {
                console.error('Error fetching Class: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/conditions')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    description: item.description,
                    rowKey: item.rowKey
                }))
                set_api_Conditions(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching Conditions: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/enhancedItem')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    adventuringGearType: item.adventuringGearType,
                    consumableType: item.consumableType,
                    cyberneticAugmentationType: item.cyberneticAugmentationType,
                    droidCustomizationType: item.droidCustomizationType,
                    enhancedArmorType: item.enhancedArmorType,
                }))
                set_api_EnhancedItem(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching EnhancedItem: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/equipment')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    description: item.description,
                    cost: item.cost,
                    weight: item.weight,
                    equipmentCategory: item.equipmentCategory,
                    damageNumberOfDice: item.damageNumberOfDice,
                    damageType: item.damageType,
                    weaponClassification: item.weaponClassification,
                    armorClassification: item.armorClassification,
                    damageDieType: item.damageDieType,
                    properties: item.properties,
                    modes: item.modes,
                    ac: item.ac,
                    strengthRequirement: item.strengthRequirement,
                    stealthDisadvantage: item.stealthDisadvantage,
                    rowKey: item.rowKey
                }))
                set_api_Equipment(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching Equipment: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/Feat')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    prerequisite: item.prerequisite,
                    text: item.text,
                    attributesIncreased: item.attributesIncreased,
                    rowKey: item.rowKey
                }))
                set_api_Feat(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching Feat: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/Feature')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    text: item.text,
                    level: item.level,
                    rowKey: item.rowKey
                }))
                set_api_Feature(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching Feature: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/FightingMastery')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    text: item.text,
                    rowKey: item.rowKey
                }))
                set_api_FightingMastery(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching FightingMastery: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/FightingStyle')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    description: item.description,
                    rowKey: item.rowKey
                }))
                set_api_FightingStyle(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching FightingStyle: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/LightsaberForm')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    description: item.description,
                    rowKey: item.rowKey
                }))
                set_api_LightsaberForm(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching LightsaberForm: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/Maneuvers')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    description: item.description,
                    prerequisite: item.prerequisite,
                    type: item.type,
                    rowKey: item.rowKey
                }))
                set_api_Maneuvers(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching Maneuvers: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/power')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    powerType: item.powerType,
                    prerequisite: item.prerequisite,
                    level: item.level,
                    castingPeriod: item.castingPeriod,
                    castingPeriodText: item.castingPeriodText,
                    range: item.range,
                    duration: item.duration,
                    concentration: item.concentration,
                    forceAlignment: item.forceAlignment,
                    description: item.description,
                    higherLevelDescription: item.higherLevelDescription,
                    rowKey: item.rowKey
                }))
                set_api_Power(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching Power: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/skills')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    baseAttribute: item.baseAttribute,
                    rowKey: item.rowKey
                }))
                set_api_SkillsLU(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching Skills: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/species')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    language: item.language,
                    traits: item.traits,
                    abilitiesIncreased: item.abilitiesIncreased,
                    size: item.size,
                    features: item.features,
                    rowKey: item.rowKey
                }))
                set_api_Species(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching Species: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/WeaponFocus')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    description: item.description,
                    rowKey: item.rowKey
                }))
                set_api_WeaponFocus(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching WeaponFocus: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/WeaponProperty')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    content: item.content,
                    rowKey: item.rowKey
                }))
                set_api_WeaponProperty(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching WeaponProperty: ', err)
            })

        fetch('https://sw5eapi.azurewebsites.net/api/WeaponSupremacy')
            .then((response) => response.json())
            .then((data) => {
                const cleanedData = data.map((item) => ({
                    name: item.name,
                    description: item.description,
                    rowKey: item.rowKey
                }))
                set_api_WeaponSupremacy(cleanedData)
            })
            .catch((err) => {
                console.error('Error fetching WeaponSupremacy: ', err)
            })
    }, [])

    return {
        api_Archetype,
        api_ArmorProperty,
        api_Background,
        api_Class,
        api_Conditions,
        api_EnhancedItem,
        api_Equipment,
        api_Feat,
        api_Feature,
        api_FightingMastery,
        api_FightingStyle,
        api_LightsaberForm,
        api_Maneuvers,
        api_Power,
        api_SkillsLU,
        api_Species,
        api_WeaponFocus,
        api_WeaponProperty,
        api_WeaponSupremacy
    }
}



export default useAPIData_New