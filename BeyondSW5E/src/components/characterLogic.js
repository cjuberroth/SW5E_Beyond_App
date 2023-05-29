import useAPIData from '../hooks/useAPIData'

const characterLogic = () => {

const { api_Archetype, api_ArmorProperty, api_Background, api_Class, api_Conditions,
    api_EnhancedItem, api_Equipment, api_Feat, api_Feature, api_FightingMastery,
    api_FightingStyle, api_LightsaberForm, api_Maneuvers, api_Power, api_SkillsLU,
    api_Species, api_WeaponFocus, api_WeaponProperty, api_WeaponSupremacy } = useAPIData()

    const calculateAbilityScores = () => {
        // Calculate ability scores
        var species = character.species.name
        var speciesIncrease = []

        //set the base ability scores from the JSON
        var strength = charData.baseAbilityScores.Strength
        var dexterity = charData.baseAbilityScores.Dexterity
        var constitution = charData.baseAbilityScores.Constitution
        var intelligence = charData.baseAbilityScores.Intelligence
        var wisdom = charData.baseAbilityScores.Wisdom
        var charisma = charData.baseAbilityScores.Charisma

        if(isEmpty(charData.species.abilityScoreImprovement)) {
            //several species present a choice of ability score improvements
            //if there is data here, it means at least 1 increase is a choice
            //if no data is here, ability score increases are static for the species and we get it from the api

            //this loop creates an array of objects that give the stat and increase from the api
            for(let i = 0; i < api_Species.length; i++) {
                if (api_Species[i].name === species) {
                    for(let j = 0; j < api_Species[i].abilitiesIncreased.length; j++) {
                        for(let k = 0; k < api_Species[i].abilitiesIncreased[j].length; k++) {
                            for(let l = 0; l < api_Species[i].abilitiesIncreased[j][k].abilities.length; l++) {
                                speciesIncrease.push({stat: api_Species[i].abilitiesIncreased[j][k].abilities[l], up: api_Species[i].abilitiesIncreased[j][k].amount})
                            }
                        }
                    }
                }
            }

            //add the increases to the base ability scores
            for(let i = 0; i < speciesIncrease.length; i++) {
                switch (speciesIncrease[i].stat) {
                    case 'Strength':
                        strength = strength + speciesIncrease[i].up
                        break
                    case 'Dexterity':
                        dexterity = dexterity + speciesIncrease[i].up
                        break
                    case 'Constitution':
                        constitution = constitution + speciesIncrease[i].up
                        break
                    case 'Intelligence':
                        intelligence = intelligence + speciesIncrease[i].up
                        break
                    case 'Wisdom':
                        wisdom = wisdom + speciesIncrease[i].up
                        break
                    case 'Charisma':
                        charisma = charisma + speciesIncrease[i].up
                        break
                }
            }
        } else {
            //there is data in the species abilityScoreImprovement, so we need to determine which scores are static
            //and which scores are a choice
            for(let i = 0; i < api_Species.length; i++) {
                if (api_Species[i].name === species) {
                    for(let j = 0; j < api_Species[i].abilitiesIncreased.length; j++) {
                        for(let k = 0; k < api_Species[i].abilitiesIncreased[j].length; k++) {
                            for(let l = 0; l < api_Species[i].abilitiesIncreased[j][k].abilities.length; l++) {
                                if (api_Species[i].abilitiesIncreased[j][k].abilities.length === 1 && 
                                    api_Species[i].abilitiesIncreased[j][k].abilities[l].includes('Any') != true) {
                                        speciesIncrease.push({stat: api_Species[i].abilitiesIncreased[j][k].abilities[l], up: api_Species[i].abilitiesIncreased[j][k].amount})
                                }
                            }
                        }
                    }
                }
            }

            //add the increases to the base ability scores
            for(let i = 0; i < speciesIncrease.length; i++) {
                switch (speciesIncrease[i].stat) {
                    case 'Strength':
                        strength = strength + speciesIncrease[i].up
                        break
                    case 'Dexterity':
                        dexterity = dexterity + speciesIncrease[i].up
                        break
                    case 'Constitution':
                        constitution = constitution + speciesIncrease[i].up
                        break
                    case 'Intelligence':
                        intelligence = intelligence + speciesIncrease[i].up
                        break
                    case 'Wisdom':
                        wisdom = wisdom + speciesIncrease[i].up
                        break
                    case 'Charisma':
                        charisma = charisma + speciesIncrease[i].up
                        break
                }
            }

            //add the choices to the base ability score and/or the species increase ability score
            strength = strength + (charData.species.abilityScoreImprovement.Strength ?? 0)
            dexterity = dexterity + (charData.species.abilityScoreImprovement.Dexterity ?? 0)
            constitution = constitution + (charData.species.abilityScoreImprovement.Constitution ?? 0)
            intelligence = intelligence + (charData.species.abilityScoreImprovement.Intelligence ?? 0)
            wisdom = wisdom + (charData.species.abilityScoreImprovement.Wisdom ?? 0)
            charisma = charisma + (charData.species.abilityScoreImprovement.Charisma ?? 0)
        }

        //variables to capture ability score increases from leveling
        var strengthIncrease = 0
        var dexterityIncrease = 0
        var constitutionIncrease = 0
        var intelligenceIncrease = 0
        var wisdomIncrease = 0
        var charismaIncrease = 0

        //this loop captures all ability score increases resulting from leveling
        for(let i = 0; i < charData.classes.length; i++) {
            for (let y = 0; y < charData.classes[i].abilityScoreImprovements.length; y++) {
                if(charData.classes[i].abilityScoreImprovements[y].type === "Ability Score Improvement") {
                    for (let j = 0; j < charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased.length; j++) {
                        switch (charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].name) {
                            case 'Strength':
                                strengthIncrease = strengthIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
                                break
                            case 'Dexterity':
                                dexterityIncrease = dexterityIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
                                break
                            case 'Constitution':
                                constitutionIncrease = constitutionIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
                                break
                            case 'Intelligence':
                                intelligenceIncrease = intelligenceIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
                                break
                            case 'Wisdom':
                                wisdomIncrease = wisdomIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
                                break
                            case 'Charisma':
                                charismaIncrease = charismaIncrease + charData.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
                                break
                        }
                    }
                }
            }
        }

        //calculate and set the ability scores
        strength = strength + (strengthIncrease ?? 0)
        dexterity = dexterity + (dexterityIncrease ?? 0)
        constitution = constitution + (constitutionIncrease ?? 0)
        intelligence = intelligence + (intelligenceIncrease ?? 0)
        wisdom = wisdom + (wisdomIncrease ?? 0)
        charisma = charisma + (charismaIncrease ?? 0)
        
        //check for overrides from website character creator
        if (charData.tweaks?.abilityScores?.Strength?.score?.override) {strength = charData.tweaks?.abilityScores?.Strength?.score?.override}
        if (charData.tweaks?.abilityScores?.Dexterity?.score?.override) {dexterity = charData.tweaks?.abilityScores?.Dexterity?.score?.override}
        if (charData.tweaks?.abilityScores?.Constitution?.score?.override) {constitution = charData.tweaks?.abilityScores?.Constitution?.score?.override}
        if (charData.tweaks?.abilityScores?.Intelligence?.score?.override) {intelligence = charData.tweaks?.abilityScores?.Intelligence?.score?.override}
        if (charData.tweaks?.abilityScores?.Wisdom?.score?.override) {wisdom = charData.tweaks?.abilityScores?.Wisdom?.score?.override}
        if (charData.tweaks?.abilityScores?.Charisma?.score?.override) {charisma = charData.tweaks?.abilityScores?.Charisma?.score?.override}
    }
}

export default characterLogic