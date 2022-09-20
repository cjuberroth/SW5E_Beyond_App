import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import FeatureCardList from '../components/FeatureCardList'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import Styles from '../styles/AppStyles'

const FeaturesScreen = () => {
    const archetype = useContext(CharacterContext).characterFeats.archetype
    const feats = useContext(CharacterContext).characterFeats.feats
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    
    if (archetype != '') {
        return (
            <View style = {Styles.globalStyles.parentContainerView}>
                <View style={styles.header}>
                    {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
                </View>
                <View style={{flex: flexValue}}>
                    <Text style = { styles.headerStyle }>Archetypes:</Text>
                    {
                        archetype.length === 0 
                        ? <Text>No archetype</Text> 
                        : <FeatureCardList 
                            feats = { archetype }
                        />
                    }
                    <Text style = { styles.headerStyle }>Feats</Text>
                    <Text style = {{color: 'white'}}>Displaying {feats.length} items.</Text>
                    {
                        feats.length === 0 
                        ? <Text>No feats</Text> 
                        : <FeatureCardList 
                            feats = { feats }
                        />
                    }
                </View>
            </View>
        )
    } else {
        return (
            <View style = { styles.screenContainer }>
                <View style={styles.header}>
                    {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
                </View>
                <View style={{flex: flexValue}}>
                    <Text style = { styles.headerStyle }>Archetypes</Text>
                    <Text>None</Text>
                    <Text style = { styles.headerStyle }>Feats</Text>
                    <Text style = {{color: 'white'}}>Displaying {feats.length} items.</Text>
                    {
                        feats.length === 0 
                        ? <Text>No feats</Text> 
                        : <FeatureCardList 
                            feats = { feats }
                        />
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        alignItems: 'center',
        flex: 1
    },
    header: {
        flex: 1
    },
    headerStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white'
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