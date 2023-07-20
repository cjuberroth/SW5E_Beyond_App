import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, Pressable, ScrollView } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../context/CharacterContext'
//import SettingsContext from '../context/SettingsContext'
import { useSettingsContext } from '../context/SettingsContext'
import * as Animatable from 'react-native-animatable'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import Styles from '../styles/AppStyles'
import AppStyles from '../styles/AppStyles'
import Collapsible from 'react-native-collapsible'

const FeaturesScreen = () => {
    const apiArchetypes = useContext(CharacterContext).characterFeats.archetype
    const apiFeats = useContext(CharacterContext).characterFeats.feats
    const charClasses = useContext(CharacterContext).characterInformation.classes
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const {emblem} = useSettingsContext()

    for(let i = 0; i < apiArchetypes.length; i++){
        apiArchetypes[i]["collapsed"] = true
    }

    for(let i = 0; i < apiFeats.length; i++){
        apiFeats[i]["collapsed"] = true
    }

    const [archetypes, setArchetypes] = useState(apiArchetypes)
    const [feats, setFeats] = useState(apiFeats)

    const toggleArchetypesExpanded = (selectedItemIndex) => {
        let toggle = archetypes.map(el => (
            el.rowKey === selectedItemIndex ? {...el, collapsed: !el.collapsed} : el
        ))
        setArchetypes(toggle)
    }

    const toggleFeatsExpanded = (selectedItemIndex) => {
        let toggle = feats.map(el => (
            el.name === selectedItemIndex ? {...el, collapsed: !el.collapsed} : el
        ))
        setFeats(toggle)
    }

    return (
        <View style = {Styles.globalStyles.parentContainerView}>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                   source={ require('../../assets/starBackgroundVert.jpg')}>
                    <ImageBackground imageStyle={styles.imgBackground} 
                        source={emblem && {uri: emblem}}>
                        <View style={styles.levelsView}>
                            {
                                charClasses.map(charClass => {
                                    return(
                                        <Text key={charClass.class} style={styles.levelHeader}>{charClass.class + ' | Level: ' + charClass.level}</Text>
                                    )
                                })
                            }
                        </View>
                        <ScrollView style={styles.scrollingView}>
                            {
                                apiArchetypes
                                ?   <View>
                                        <Text style={styles.featHeader}>Archetypes</Text>
                                        {
                                            archetypes.map(arch => {
                                                return (
                                                    <View key={arch.name} style={styles.featsView}>
                                                        <Pressable style={{ flexDirection: 'row' }} onPress={() => toggleArchetypesExpanded(arch.rowKey)}>
                                                            <Text style={styles.featItem}>{arch.name} </Text>
                                                            {
                                                                arch.collapsed ?
                                                                    <FontAwesome5 style={ styles.icon } name='angle-up' />
                                                                    : <FontAwesome5 style={ styles.icon } name='angle-down' />
                                                            }
                                                        </Pressable>
                                                        <Collapsible collapsed={arch.collapsed}>
                                                            <View style={styles.content}>
                                                                <Animatable.Text
                                                                    style={styles.featText}
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
                                <Text style={styles.featHeader}>Feats</Text>
                                {
                                    feats.map(feat => {
                                        return (
                                            <View key={feat.name} style={styles.featsView}>
                                                <Pressable style={{ flexDirection: 'row' }} onPress={() => toggleFeatsExpanded(feat.name)}>
                                                    <Text style={styles.featItem}>{feat.name} </Text>
                                                    {
                                                        feat.collapsed ?
                                                            <FontAwesome5 style={ styles.icon } name='angle-up' />
                                                            : <FontAwesome5 style={ styles.icon } name='angle-down' />
                                                    }
                                                </Pressable>
                                                <Collapsible collapsed={feat.collapsed}>
                                                    <View style={styles.content}>
                                                        <Animatable.Text
                                                            style={styles.featText}
                                                            animation={feats ? undefined : 'zoomIn'}
                                                            duration={300}
                                                            useNativeDriver>{feat.text}</Animatable.Text>
                                                    </View>
                                                </Collapsible>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </ImageBackground>
            </View>
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
    },
    levelsView: {
        alignItems: 'center'
    },
    levelHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    featHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: 5
    },
    featText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        paddingHorizontal: 5
    },
    featItem: {
        fontSize: 22,
        color: '#ffffff',
        //textDecorationLine: 'underline'
    },
    featsView: {
        paddingHorizontal: 30
    },
    scrollingView: {
        paddingHorizontal: 5,
        height: '100%'
    },
    icon: {
        fontSize: 25, 
        color: 'white',
        alignSelf: 'center',
        paddingRight: 5
      },
      imgBackground: {
        width: '100%',
        resizeMode: 'contain'
    },
})

export default FeaturesScreen