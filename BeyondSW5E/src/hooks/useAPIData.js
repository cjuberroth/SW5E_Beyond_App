import { useEffect, useState } from 'react'
import axios from 'axios'

const useAPIData = () => {
    const [api_Species, set_api_Species] = useState([])
	const [api_Class, set_api_Class] = useState([])
	const [api_Feat, set_api_Feat] = useState([])
	const [api_Power, set_api_Power] = useState([])
	const [api_Archetype, set_api_Archetype] = useState([])
	const [api_ArmorProperty, set_api_ArmorProperty] = useState([])
	const [api_Background, set_api_Background] = useState([])
	const [api_Conditions, set_api_Conditions] = useState([])
	const [api_EnhancedItem, set_api_EnhancedItem] = useState([])
	const [api_Equipment, set_api_Equipment] = useState([])
	const [api_Feature, set_api_Feature] = useState([])
	const [api_FightingMastery, set_api_FightingMastery] = useState([])
	const [api_FightingStyle, set_api_FightingStyle] = useState([])
	const [api_LightsaberForm, set_api_LightsaberForm] = useState([])
	const [api_Maneuvers, set_api_Maneuvers] = useState([])
	const [api_WeaponFocus, set_api_WeaponFocus] = useState([])
	const [api_WeaponProperty, set_api_WeaponProperty] = useState([])
	const [api_WeaponSupremacy, set_api_WeaponSupremacy] = useState([])
	const [api_SkillsLU, set_api_SkillsLU] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [speciesResponse, classResponse, featResponse, powerResponse, archetypeResponse,
                armorPropertyResponse, backgroundResponse, conditionsResponse, enhancedItemResponse,
                equipmentResponse, featureResponse, fightingMasteryResponse, 
                fightingStyleResponse, lightsaberFormResponse, maneuversResponse, 
                weaponFocusResponse, weaponPropertyResponse, weaponSupremacyResponse, skillsResponse] = await axios.all([
                    axios.get('https://sw5eapi.azurewebsites.net/api/species'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/class'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/Feat'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/power'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/archetype'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/ArmorProperty'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/background'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/conditions'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/enhancedItem'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/equipment'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/Feature'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/FightingMastery'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/FightingStyle'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/LightsaberForm'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/Maneuvers'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/WeaponFocus'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/WeaponProperty'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/WeaponSupremacy'),
                    axios.get('https://sw5eapi.azurewebsites.net/api/skills')
                ])

                const { data: species_Data } = speciesResponse
                const { data: class_Data } = classResponse
                const { data: feat_Data } = featResponse
                const { data: power_Data } = powerResponse
                const { data: archetype_Data } = archetypeResponse
                const { data: armorProperty_Data } = armorPropertyResponse
                const { data: background_Data} = backgroundResponse
                const { data: conditions_Data } = conditionsResponse
                const { data: enhancedItem_Data} = enhancedItemResponse
                const { data: equipment_Data } = equipmentResponse
                const { data: feature_Data } = featureResponse
                const { data: fightingMastery_Data } = fightingMasteryResponse
                const { data: fightingStyle_Data } = fightingStyleResponse
                const { data: lightersaberForm_Data} = lightsaberFormResponse
                const { data: maneuvers_Data } = maneuversResponse
                const { data: weaponFocus_Data } = weaponFocusResponse
                const { data: weaponProperty_Data } = weaponPropertyResponse
                const { data: weaponSupremacy_Data } = weaponSupremacyResponse
                const { data: skills_Data } = skillsResponse

                set_api_Species(species_Data)
                set_api_Class(class_Data)
                set_api_Feat(feat_Data)
                set_api_Power(power_Data)
                set_api_Archetype(archetype_Data)
                set_api_ArmorProperty(armorProperty_Data)
                set_api_Background(background_Data)
                set_api_Conditions(conditions_Data)
                set_api_EnhancedItem(enhancedItem_Data)
                set_api_Equipment(equipment_Data)
                set_api_Feature(feature_Data)
                set_api_FightingMastery(fightingMastery_Data)
                set_api_FightingStyle(fightingStyle_Data)
                set_api_LightsaberForm(lightersaberForm_Data)
                set_api_Maneuvers(maneuvers_Data)
                set_api_WeaponFocus(weaponFocus_Data)
                set_api_WeaponProperty(weaponProperty_Data)
                set_api_WeaponSupremacy(weaponSupremacy_Data)
                set_api_SkillsLU(skills_Data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])
    return { api_Archetype, api_ArmorProperty, api_Background, api_Class, api_Conditions,
        api_EnhancedItem, api_Equipment, api_Feat, api_Feature, api_FightingMastery,
        api_FightingStyle, api_LightsaberForm, api_Maneuvers, api_Power, api_SkillsLU,
        api_Species, api_WeaponFocus, api_WeaponProperty, api_WeaponSupremacy }
}

export default useAPIData