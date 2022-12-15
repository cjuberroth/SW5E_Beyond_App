import React from 'react'
import swapi from './swapi'

export const SpeciesCall = async () => {
    var response = await swapi.get('/species')
    return response.data
}
export const ClassCall = async () => {
    response = await swapi.get('/class')
    return response.data
}
export const FeatCall = async () => {
    response = await swapi.get('/Feat')
    return response.data
}
export const PowerCall = async () => {
    response = await swapi.get('/power')
    return response.data
}
export const ArchetypeCall = async () => {
    response = await swapi.get('/archetype')
    return response.data
}	
export const ArmorPropertyCall = async () => {
    response = await swapi.get('/ArmorProperty')
    return response.data
}
export const BackgroundCall = async () => {
    response = await swapi.get('/background')
    return response.data
}
export const ConditionsCall = async () => {
    response = await swapi.get('/conditions')
    return response.data
}
export const EnhancedItemCall = async () => {
    response = await swapi.get('/enhancedItem')
    return response.data
}
export const EquipmentCall = async () => {
    response = await swapi.get('/equipment')
    return response.data
}
export const FeatureCall = async () => {
    response = await swapi.get('/Feature')
    return response.data
}
export const FightingMasteryCall = async () => {
    response = await swapi.get('/FightingMastery')
    return response.data
}
export const FightingStyleCall = async () => {
    response = await swapi.get('/FightingStyle')
    return response.data
}
export const LightsaberFormCall = async () => {
    response = await swapi.get('/LightsaberForm')
    return response.data
}
export const ManeuversCall = async () => {
    response = await swapi.get('/Maneuvers')
    return response.data
}
export const WeaponFocusCall = async () => {
    response = await swapi.get('/WeaponFocus')
    return response.data
}
export const WeaponPropertyCall = async () => {
    response = await swapi.get('/WeaponProperty')
    return response.data
}
export const WeaponSupremacyCall = async () => {
    response = await swapi.get('/WeaponSupremacy')
    return response.data
}
export const SkillsCall = async () => {
    response = await swapi.get('/skills')
    return response.data
}