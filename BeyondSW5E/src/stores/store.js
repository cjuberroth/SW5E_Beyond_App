import { create } from 'zustand'
import getClassesLevelProf from '../components/logic/getClassesLevelProf'
import getArchetype from '../components/logic/getArchetype'
import calculateSaves from '../components/logic/calculateSaves'
import { modifier } from '../components/logic/functions'

const useStore = create((set, get) => {
    return {
        //get character information from the JSON for use
        setCharacterData: (data) =>
            set((state) => ({
                characterInformation: {...state.characterInformation, 
                    name: data.name,
                    id: data.id,
                    userId: data.userId,
                    image: data.image,
                    experiencePoints: data.experiencePoints,
                    species: data.species.name,
                    background: data.background,
                    characteristics: data.characteristics,
                    classes: getClassesLevelProf(data).classes,
                    archetype: getArchetype(data),
                    level: getClassesLevelProf(data).level,
                    proficiency: getClassesLevelProf(data).prof,
                    conditions: data.currentStats.conditions,
                    credits: data.credits,
                    hitPointsLost: data.currentStats.hitPointsLost
                },
                //store entire character JSON in state
                characterJSON: data
            })
        ),
        setAbilitiesAndMods: (abilities) => {
            set((state) => ({
                characterAbilities: {...state.characterAbilities,
                    abilitiesStrength: abilities.abilitiesStrength,
                    abilitiesDexterity: abilities.abilitiesDexterity,
                    abilitiesConstitution: abilities.abilitiesConstitution,
                    abilitiesIntelligence: abilities.abilitiesIntelligence,
                    abilitiesWisdom: abilities.abilitiesWisdom,
                    abilitiesCharisma: abilities.abilitiesCharisma
                },
                characterMods: {...state.characterMods,
                    str_mod: modifier(abilities.abilitiesStrength),
                    dex_mod: modifier(abilities.abilitiesDexterity),
                    con_mod: modifier(abilities.abilitiesConstitution),
                    int_mod: modifier(abilities.abilitiesIntelligence),
                    wis_mod: modifier(abilities.abilitiesWisdom),
                    cha_mod: modifier(abilities.abilitiesCharisma)
                }
            }))
        },
        setSaves: (data, classData) => {
            const characterMods = get().characterMods;
            const charProf = get().characterInformation.proficiency
            set((state) => ({
                characterSaves: {
                    ...state.characterSaves,
                    strSave: calculateSaves(data, classData, characterMods, charProf).strSave,
                    dexSave: calculateSaves(data, classData, characterMods, charProf).dexSave,
                    conSave: calculateSaves(data, classData, characterMods, charProf).conSave,
                    intSave: calculateSaves(data, classData, characterMods, charProf).intSave,
                    wisSave: calculateSaves(data, classData, characterMods, charProf).wisSave,
                    chaSave: calculateSaves(data, classData, characterMods, charProf).chaSave,
                    charSave: calculateSaves(data, classData, characterMods, charProf).charSave
                }
            }))
        }
        
    }
})

export default useStore