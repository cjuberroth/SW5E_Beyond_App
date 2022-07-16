import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import FeatureCard from '../components/FeatureCard'

const FeatureCardList = ({ feats }) => {
    return (
        <View style = {{flex:1}}>
            <FlatList
                data = { feats }
                keyExtractor = {(feat) => feat.name}
                renderItem={({ item }) => {
                    return <FeatureCard
                                name = { item.name }
                                description = { item.description }
                                source = { item.contentSource }
                            />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default FeatureCardList
