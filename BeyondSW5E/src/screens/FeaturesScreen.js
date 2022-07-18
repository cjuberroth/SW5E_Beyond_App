import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import FeatureCardList from '../components/FeatureCardList'

const FeaturesScreen = () => {
    const archetype = useContext(CharacterContext).characterFeats.archetype
    const feats = useContext(CharacterContext).characterFeats.feats
    const apiFeats = useContext(CharacterContext).apiData.feat

    if (archetype != '') {
        return (
            <View style = { styles.screenContainer }>
                <Text style = { styles.headerStyle }>Features/Traits Screen</Text>
                <Text style = { styles.headerStyle }>Archetypes:</Text>
                <FlatList
                    data = { archetype }
                    renderItem = {({ item }) => {
                        return <Text>{ item }</Text>
                    }}
                />
                <Text style = { styles.headerStyle }>Feats</Text>
                <Text>Displaying {feats.length} items.</Text>
                <FlatList
                    data = { feats }
                    renderItem = {({ item }) => {
                        return <Text>{ item }</Text>
                    }}
                />
                {
                    feats.length === 0 
                    ? <Text>No feats</Text> 
                    : <FeatureCardList 
                        feats = { feats }
                    />
                }
            </View>
        )
    } else {
        return (
            <View style = { styles.screenContainer }>
                <Text style = { styles.headerStyle }>Features/Traits Screen</Text>
                <Text style = { styles.headerStyle }>Archetypes</Text>
                <Text>None</Text>
                <Text style = { styles.headerStyle }>Feats</Text>
                <Text>Displaying {feats.length} items.</Text>
                <FlatList
                    data = { feats }
                    renderItem = {({ item }) => {
                        return <Text>{ item }</Text>
                    }}
                />
                {
                    feats.length === 0 
                    ? <Text>No feats</Text> 
                    : <FeatureCardList 
                        feats = { feats }
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        alignItems: 'center',
        flex: 1
    },
    headerStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default FeaturesScreen
/*
<FlatList
                    data = { feats }
                    renderItem = {({ item }) => {
                        return <Text>{ item }</Text>
                    }}
                />

<Text>Feats</Text>
                <FlatList
                    data = { feats }
                    renderItem = {({ item }) => {
                        return <Text>{ item }</Text>
                    }}
                />
*/