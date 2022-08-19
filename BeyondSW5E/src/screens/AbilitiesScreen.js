import React, {useContext, useRef} from 'react'
import { Text, View, StyleSheet, ImageBackground, Animated, ScrollView, Image } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import stylesGlobal from '../styles/stylesGlobal';

const H_MAX_HEIGHT = 150;
const H_MIN_HEIGHT = 65;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const AbilitiesScreen = () => {
    //for collapsible header
    const scrollOffsetY = useRef(new Animated.Value(0)).current
    const headerScrollHeight = scrollOffsetY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
        extrapolate: "clamp"
    })

    //import character data from context
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterAbilities = useContext(CharacterContext).characterAbilities
    const characterMods = useContext(CharacterContext).characterMods
    const characterSaves = useContext(CharacterContext).characterSaves

    const numberPresent = function(score) {
        if(score >= 0) {
            return "+"
        } else {
            return
        }
    }

    return (
        // This style import is a POC for the ability to extract common styles into a separate file
        <View style={stylesGlobal.parentContainerView}>
            <ScrollView
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollOffsetY } } }
                ], {useNativeDriver: false})}
                scrollEventThrottle={16}
            >
                <View style={{ paddingTop: H_MAX_HEIGHT }}>
                        <ImageBackground style={styles.imgBackground} source={require('../../assets/rebel-alliance.png')}>
                            <View style={styles.parentStyle}>
                                <View style={styles.boxStyle}>
                                        <Text style={styles.textStyle}>Strength</Text>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.str_mod)}{characterMods.str_mod}</Text>
                                        <Text style={styles.textStyle}>{characterAbilities.abilitiesStrength}</Text>
                                    
                                </View>
                                <View style={styles.boxStyle}>
                                    
                                        <Text style={styles.textStyle}>Dexterity</Text>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.dex_mod)}{characterMods.dex_mod}</Text>
                                        <Text style={styles.textStyle}>{characterAbilities.abilitiesDexterity}</Text>
                                    
                                </View>
                                <View style={styles.boxStyle}>
                                    
                                        <Text style={styles.textStyle}>Constitution</Text>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.con_mod)}{characterMods.con_mod}</Text>
                                        <Text style={styles.textStyle}>{characterAbilities.abilitiesConstitution}</Text>
                                    
                                </View>
                                <View style={styles.boxStyle}>
                                    
                                        <Text style={styles.textStyle}>Intelligence</Text>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.int_mod)}{characterMods.int_mod}</Text>
                                        <Text style={styles.textStyle}>{characterAbilities.abilitiesIntelligence}</Text>
                                    
                                </View>
                                <View style={styles.boxStyle}>
                                    
                                        <Text style={styles.textStyle}>Wisdom</Text>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.wis_mod)}{characterMods.wis_mod}</Text>
                                        <Text style={styles.textStyle}>{characterAbilities.abilitiesWisdom}</Text>
                                    
                                </View>
                                <View style={styles.boxStyle}>
                                    
                                        <Text style={styles.textStyle}>Charisma</Text>
                                        <Text style={styles.modStyle}>{numberPresent(characterMods.cha_mod)}{characterMods.cha_mod}</Text>
                                        <Text style={styles.textStyle}>{characterAbilities.abilitiesCharisma}</Text>
                                    
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={styles.parentStyle}>
                            <Text style={styles.headingStyle}>Saving Throws</Text>
                        </View>
                        <View style={styles.saveView}>
                            <Text style={styles.saveText}>Strength: {characterSaves.str_save}</Text>
                            <Text style={styles.saveText}>Dexterity: {characterSaves.dex_save}</Text>
                            <Text style={styles.saveText}>Constitution: {characterSaves.con_save}</Text>
                            <Text style={styles.saveText}>Intelligence: {characterSaves.int_save}</Text>
                            <Text style={styles.saveText}>Wisdom: {characterSaves.wis_save}</Text>
                            <Text style={styles.saveText}>Charisma: {characterSaves.cha_save}</Text>
                        </View>
                </View>
            </ScrollView>
            <Animated.View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: headerScrollHeight,
                    width: "100%",
                    overflow: "hidden",
                    zIndex: 999,
                    // STYLE
                    //borderBottomColor: "#EFEFF4",
                    //borderBottomWidth: 2,
                    padding: 10,
                    backgroundColor: '#263238'
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headingStyle}>{characterInfo.name}</Text>
                    <Image
                        source={{uri: characterInfo.image}}
                        style={{ flex: 1, width: '100%', height: '100%' }}
                        resizeMode={"contain"}
                    />
                </View>
            </Animated.View>
        </View>

    )
}

const styles = StyleSheet.create({
    // containerStyle: {
    //     flex: 1,
    //     backgroundColor: '#263238'
    // },
    parentStyle: {
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    boxStyle: {
        height: 120,
        width: 120,
        marginBottom: 15,
        marginTop: 20 //this would need to be removed if going back to the individual symbols
    },
    textStyle: {
        flexDirection: 'column',
        fontSize: 20,
        alignItems: 'center',
        textAlign: 'center',
        color: 'white'
    },
    modStyle: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        marginBottom: 9,
        marginTop: 2
    },
    headingStyle: {
        fontSize: 30,
        backgroundColor: '#263238',
        color: 'white',
        textAlign: 'center',
        marginBottom: 15
    },
    imgBackground: {
        width: '100%',
        //height: '100%' //this would need to be added back if going back to the individual symbols
    },
    saveView: {
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginLeft: 15
    },
    saveText: {
        color: 'white',
        textAlign: 'left',
        fontSize: 20
    }
})

export default AbilitiesScreen