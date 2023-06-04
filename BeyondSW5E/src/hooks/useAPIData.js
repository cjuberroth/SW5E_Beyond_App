import { useEffect, useState } from 'react';
import axios from 'axios';

const useAPIData = () => {
  const [apiData, setApiData] = useState({
    api_Species: [], api_Class: [], api_Feat: [], api_Power: [], api_Archetype: [],
    api_ArmorProperty: [], api_Background: [], api_Conditions: [], api_EnhancedItem: [],
    api_Equipment: [], api_Feature: [], api_FightingMastery: [], api_FightingStyle: [],
    api_LightsaberForm: [], api_Maneuvers: [], api_WeaponFocus: [], api_WeaponProperty: [],
    api_WeaponSupremacy: [], api_SkillsLU: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          speciesResponse, classResponse, featResponse, powerResponse, archetypeResponse,
          armorPropertyResponse, backgroundResponse, conditionsResponse,
          enhancedItemResponse, equipmentResponse, featureResponse,
          fightingMasteryResponse, fightingStyleResponse,
          lightsaberFormResponse, maneuversResponse, weaponFocusResponse,
          weaponPropertyResponse, weaponSupremacyResponse, skillsResponse,
        ] = await axios.all([
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
          axios.get('https://sw5eapi.azurewebsites.net/api/skills'),
        ]);

        const apiData = {
          api_Species: speciesResponse.data,
          api_Class: classResponse.data,
          api_Feat: featResponse.data,
          api_Power: powerResponse.data,
          api_Archetype: archetypeResponse.data,
          api_ArmorProperty: armorPropertyResponse.data,
          api_Background: backgroundResponse.data,
          api_Conditions: conditionsResponse.data,
          api_EnhancedItem: enhancedItemResponse.data,
          api_Equipment: equipmentResponse.data,
          api_Feature: featureResponse.data,
          api_FightingMastery: fightingMasteryResponse.data,
          api_FightingStyle: fightingStyleResponse.data,
          api_LightsaberForm: lightsaberFormResponse.data,
          api_Maneuvers: maneuversResponse.data,
          api_WeaponFocus: weaponFocusResponse.data,
          api_WeaponProperty: weaponPropertyResponse.data,
          api_WeaponSupremacy: weaponSupremacyResponse.data,
          api_SkillsLU: skillsResponse.data,
        };

        setApiData(apiData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return apiData;
};

export default useAPIData;