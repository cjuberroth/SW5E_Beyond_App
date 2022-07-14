import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import CharacterContext from '../context/CharacterContext'

const FeaturesScreen = () => {
    const charData = useContext(CharacterContext).character

    // This block of code needs to be modified to tolerate multi classed characters
    var featsFromClass = []
    const classASI = charData.classes[0].abilityScoreImprovements
    for(let i = 0; i < classASI.length; i++){
        if(classASI[i].type == "Feat"){
            featsFromClass.push(classASI[i].name)
        }
    }
    const classArchetype = charData.classes[0].archetype?.name

    // Need to run some tests to identify the options that exist to take the background feat
    // out of allowed formatting with this line of code
    const backgroundFeat = [charData.background.feat.name]

    // Additionally, this is not the cleanest way of writing the code that we could use.
    const feats = featsFromClass.concat(backgroundFeat)

    return (
        <View>
            <Text>Features/Traits Screen</Text>
            <Text>Archetype: { classArchetype }</Text>
            <Text>Feats</Text>
            <FlatList
                data = { feats }
                renderItem = {({ item }) => {
                    return <Text>{ item }</Text>
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

export default FeaturesScreen
