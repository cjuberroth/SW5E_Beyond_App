
export const speciesData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/species')
        const data = await response.json()
        const cleanedData = data.map((item) => ({
            name: item.name,
            language: item.language,
            traits: item.traits,
            abilitiesIncreased: item.abilitiesIncreased,
            size: item.size,
            features: item.features,
            rowKey: item.rowKey
        }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching Species: ', err)
        return null
    }
}

export const classData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/class')
        const data = await response.json()
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
        return cleanedData
    } catch (err) {
        console.error('Error fetching Class: ', err)
        return null
    }
}

export const featData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/Feat')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                prerequisite: item.prerequisite,
                text: item.text,
                attributesIncreased: item.attributesIncreased,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching Feat: ', err)
        return null
    }
}

export const powerData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/power')
        const data = await response.json()
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
            return cleanedData
    } catch (err) {
        console.error('Error fetching Power: ', err)
        return null
    }
}

export const archetypeData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/archetype')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                className: item.className,
                text: item.text,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching Archetype: ', err)
        return null
    }
}
	
export const armorPropertyData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/ArmorProperty')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                content: item.text,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching ArmorProperty: ', err)
        return null
    }
}

export const backgroundData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/background')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                text: item.flavorText,
                flavorName: item.flavorName,
                flavorDescription: item.flavorDescription,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching Background: ', err)
        return null
    }
}

export const conditionsData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/conditions')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                description: item.description,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching Conditions: ', err)
        return null
    }
}

export const enhancedItemData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/enhancedItem')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                adventuringGearType: item.adventuringGearType,
                consumableType: item.consumableType,
                cyberneticAugmentationType: item.cyberneticAugmentationType,
                droidCustomizationType: item.droidCustomizationType,
                enhancedArmorType: item.enhancedArmorType,
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching EnhancedItem: ', err)
        return null
    }
}

export const equipmentData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/equipment')
        const data = await response.json()
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
            return cleanedData
    } catch (err) {
        console.error('Error fetching Equipment: ', err)
        return null
    }
}

export const featureData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/Feature')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                text: item.text,
                level: item.level,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching Feature: ', err)
        return null
    }
}

export const fightingMasteryData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/FightingMastery')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                text: item.text,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching FightingMastery: ', err)
        return null
    }
}

export const fightingStyleData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/FightingStyle')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                description: item.description,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching FightingStyle: ', err)
        return null
    }
}

export const lightsaberFormData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/LightsaberForm')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                description: item.description,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching LightsaberForm: ', err)
        return null
    }
}

export const maneuversData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/Maneuvers')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                description: item.description,
                prerequisite: item.prerequisite,
                type: item.type,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching Maneuvers: ', err)
        return null
    }
}

export const skillsData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/skills')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                baseAttribute: item.baseAttribute,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching Skills: ', err)
        return null
    }
}

export const weaponFocusData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/WeaponFocus')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                description: item.description,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching WeaponFocus: ', err)
        return null
    }
}

export const weaponPropertyData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/WeaponProperty')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                content: item.content,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching WeaponProperty: ', err)
        return null
    }
}

export const weaponSupremacyData = async () => {
    try {
        const response = await fetch('https://sw5eapi.azurewebsites.net/api/WeaponSupremacy')
        const data = await response.json()
            const cleanedData = data.map((item) => ({
                name: item.name,
                description: item.description,
                rowKey: item.rowKey
            }))
            return cleanedData
    } catch (err) {
        console.error('Error fetching WeaponSupremacy: ', err)
        return null
    }
}