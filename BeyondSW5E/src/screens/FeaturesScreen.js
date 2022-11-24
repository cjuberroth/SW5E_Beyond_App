import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, Pressable } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import * as Animatable from 'react-native-animatable'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import Styles from '../styles/AppStyles'
import AppStyles from '../styles/AppStyles'
import Collapsible from 'react-native-collapsible'

const FeaturesScreen = () => {
    const apiArchetypes = useContext(CharacterContext).characterFeats.archetype
    const feats = useContext(CharacterContext).characterFeats.feats
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    
    for(let i = 0; i < apiArchetypes.length; i++){
        apiArchetypes[i]["collapsed"] = true
    }

    const [archetypes, setArchetypes] = useState(apiArchetypes)

    const toggleArchetypesExpanded = (selectedItemIndex) => {
        let toggle = archetypes.map(el => (
            el.rowKey === selectedItemIndex ? {...el, collapsed: !el.collapsed} : el
        ))
        setArchetypes(toggle)
    }

    return (
        <View style = {Styles.globalStyles.parentContainerView}>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                   source={ require('../../assets/header-background.jpg')}>
                    {
                        apiArchetypes
                        ?   <View>
                                <Text>Archetypes</Text>
                                {
                                    archetypes.map(arch => {
                                        return (
                                            <View>
                                                <Pressable onPress={() => toggleArchetypesExpanded(arch.rowKey)}>
                                                    <Text>{arch.name}</Text>
                                                </Pressable>
                                                <Collapsible collapsed={arch.collapsed}>
                                                    <View style={styles.content}>
                                                        <Animatable.Text
                                                            animation={archetypes ? undefined : 'zoomIn'}
                                                            duration={300}
                                                            useNativeDriver>{arch.text}</Animatable.Text>
                                                    </View>
                                                </Collapsible>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        :   null
                    }
                    <View>
                        <Text>Feats</Text>
                        {
                            feats.map(feat => {
                                return (
                                    <Text>{feat.name}</Text>
                                )
                            })
                        }
                    </View>
                </ImageBackground>
            </View>
            {
                // there is probably a better way to implement the conditional inclusion of the archetype so 
                // that there is no need to duplicate the entire block of code
                // archetype
                // ?   <View style={{flex: flexValue}}>
                //         <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                //             source={ require('../../assets/header-background.jpg')}>
                //             <Text style = { styles.headerStyle }>Archetypes:</Text>
                //             {
                //                 archetype.length === 0 
                //                 ? <Text>No archetype</Text> 
                //                 : <FeatureCardList 
                //                     feats = { archetype }
                //                 />
                //             }
                //             <Text style = { styles.headerStyle }>Feats</Text>
                //             <Text style = {{color: 'white'}}>Displaying {feats.length} items.</Text>
                //             {
                //                 feats.length === 0 
                //                 ? <Text>No feats</Text> 
                //                 : <FeatureCardList 
                //                     feats = { feats }
                //                 />
                //             }
                //         </ImageBackground>
                //     </View>
                // :   <View style={{flex: flexValue}}>
                //         <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                //             source={ require('../../assets/header-background.jpg')}>
                //             <Text style = { styles.headerStyle }>Archetypes</Text>
                //             <Text>None</Text>
                //             <Text style = { styles.headerStyle }>Feats</Text>
                //             <Text style = {{color: 'white'}}>Displaying {feats.length} items.</Text>
                //             {
                //                 feats.length === 0 
                //                 ? <Text>No feats</Text> 
                //                 : <FeatureCardList 
                //                     feats = { feats }
                //                 />
                //             }
                //         </ImageBackground>
                //     </View>
            }
        </View>
    )
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