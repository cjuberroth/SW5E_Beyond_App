
const calculateAbilityScores = (data, speciesData) => {

    const isEmpty = (obj) => {
		return Object.keys(obj).length === 0
	}

    // Calculate ability scores
    let species = data.species.name
    let speciesIncrease = []

    //set the base ability scores from the JSON
    let strength = data.baseAbilityScores.Strength
    let dexterity = data.baseAbilityScores.Dexterity
    let constitution = data.baseAbilityScores.Constitution
    let intelligence = data.baseAbilityScores.Intelligence
    let wisdom = data.baseAbilityScores.Wisdom
    let charisma = data.baseAbilityScores.Charisma

    if (isEmpty(data.species.abilityScoreImprovement)) {
        //several species present a choice of ability score improvements
        //if there is data here, it means at least 1 increase is a choice
        //if no data is here, ability score increases are static for the species and we get it from the api
        //this loop creates an array of objects that give the stat and increase from the api
        for (let i = 0; i < speciesData.length; i++) {
            if (speciesData[i].name === species) {
                for (let j = 0; j < speciesData[i].abilitiesIncreased.length; j++) {
                    for (let k = 0; k < speciesData[i].abilitiesIncreased[j].length; k++) {
                        for (let l = 0; l < speciesData[i].abilitiesIncreased[j][k].abilities.length; l++) {
                            speciesIncrease.push({ stat: speciesData[i].abilitiesIncreased[j][k].abilities[l], up: speciesData[i].abilitiesIncreased[j][k].amount })
                        }
                    }
                }
            }
        }

        //add the increases to the base ability scores
        for (let i = 0; i < speciesIncrease.length; i++) {
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
        for (let i = 0; i < speciesData.length; i++) {
            if (speciesData[i].name === species) {
                for (let j = 0; j < speciesData[i].abilitiesIncreased.length; j++) {
                    for (let k = 0; k < speciesData[i].abilitiesIncreased[j].length; k++) {
                        for (let l = 0; l < speciesData[i].abilitiesIncreased[j][k].abilities.length; l++) {
                            if (speciesData[i].abilitiesIncreased[j][k].abilities.length === 1 &&
                                speciesData[i].abilitiesIncreased[j][k].abilities[l].includes('Any') != true) {
                                speciesIncrease.push({ stat: speciesData[i].abilitiesIncreased[j][k].abilities[l], up: speciesData[i].abilitiesIncreased[j][k].amount })
                            }
                        }
                    }
                }
            }
        }

        //add the increases to the base ability scores
        for (let i = 0; i < speciesIncrease.length; i++) {
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
        strength = strength + (data.species.abilityScoreImprovement.Strength ?? 0)
        dexterity = dexterity + (data.species.abilityScoreImprovement.Dexterity ?? 0)
        constitution = constitution + (data.species.abilityScoreImprovement.Constitution ?? 0)
        intelligence = intelligence + (data.species.abilityScoreImprovement.Intelligence ?? 0)
        wisdom = wisdom + (data.species.abilityScoreImprovement.Wisdom ?? 0)
        charisma = charisma + (data.species.abilityScoreImprovement.Charisma ?? 0)
    }

    //variables to capture ability score increases from leveling
    let strengthIncrease = 0
    let dexterityIncrease = 0
    let constitutionIncrease = 0
    let intelligenceIncrease = 0
    let wisdomIncrease = 0
    let charismaIncrease = 0

    //this loop captures all ability score increases resulting from leveling
    for (let i = 0; i < data.classes.length; i++) {
        for (let y = 0; y < data.classes[i].abilityScoreImprovements.length; y++) {
            if (data.classes[i].abilityScoreImprovements[y].type === "Ability Score Improvement") {
                for (let j = 0; j < data.classes[i].abilityScoreImprovements[y].abilitiesIncreased.length; j++) {
                    switch (data.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].name) {
                        case 'Strength':
                            strengthIncrease = strengthIncrease + data.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
                            break
                        case 'Dexterity':
                            dexterityIncrease = dexterityIncrease + data.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
                            break
                        case 'Constitution':
                            constitutionIncrease = constitutionIncrease + data.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
                            break
                        case 'Intelligence':
                            intelligenceIncrease = intelligenceIncrease + data.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
                            break
                        case 'Wisdom':
                            wisdomIncrease = wisdomIncrease + data.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
                            break
                        case 'Charisma':
                            charismaIncrease = charismaIncrease + data.classes[i].abilityScoreImprovements[y].abilitiesIncreased[j].value
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
    if (data.tweaks?.abilityScores?.Strength?.score?.override) { strength = data.tweaks?.abilityScores?.Strength?.score?.override} 
    if (data.tweaks?.abilityScores?.Dexterity?.score?.override) { dexterity = data.tweaks?.abilityScores?.Dexterity?.score?.override} 
    if (data.tweaks?.abilityScores?.Constitution?.score?.override) { constitution = data.tweaks?.abilityScores?.Constitution?.score?.override} 
    if (data.tweaks?.abilityScores?.Intelligence?.score?.override) { intelligence = data.tweaks?.abilityScores?.Intelligence?.score?.override} 
    if (data.tweaks?.abilityScores?.Wisdom?.score?.override) { wisdom = data.tweaks?.abilityScores?.Wisdom?.score?.override} 
    if (data.tweaks?.abilityScores?.Charisma?.score?.override) { charisma = data.tweaks?.abilityScores?.Charisma?.score?.override} 
    
    return {
        abilitiesStrength: strength,
        abilitiesDexterity: dexterity,
        abilitiesConstitution: constitution,
        abilitiesIntelligence: intelligence,
        abilitiesWisdom: wisdom,
        abilitiesCharisma: charisma
    }
}

export default calculateAbilityScores