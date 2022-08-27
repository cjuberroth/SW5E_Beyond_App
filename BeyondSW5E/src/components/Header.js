import React, { useContext, useRef } from 'react'
import { Text, View, StyleSheet, Image, Animated } from 'react-native'
import HeaderContext from '../context/HeaderContext'
import CharacterContext from '../context/CharacterContext'

const Header = () => {
    const headerHeight = useContext(HeaderContext).headerUtils.headerHeight
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterMods = useContext(CharacterContext).characterMods
    const numberPresent = useContext(CharacterContext).functions.numberPresent

    return (
        <>
            <View style={[styles.headerContainer, {height: headerHeight / 2}]}>

                <Image
                    source={{uri: characterInfo.image}}
                    style={{ flex: 1, width: '100%', height: '100%', marginBottom: 5 }}
                    resizeMode={"contain"}
                />
                <View style={styles.headerStats}>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Prof</Text>
                        <Text style={styles.statTextBig}>{numberPresent(characterInfo.proficiency) + characterInfo.proficiency}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Speed</Text>
                        <Text style={styles.statTextBig}>{characterInfo.speed + 'ft'}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Initiative</Text>
                        <Text style={styles.statTextBig}>{numberPresent(characterMods.dex_mod) + characterMods.dex_mod}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>AC</Text>
                        <Text style={styles.statTextBig}>AC</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        //flexDirection: 'row'
    },
    headerStats: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    statBox: {
        alignItems: 'center'
    },
    statText: {
        color: 'white'
    },
    statTextBig: {
        fontSize: 20,
        color: 'white'
    },
    headingStyle: {
        fontSize: 30,
        backgroundColor: '#263238',
        color: 'white',
        textAlign: 'center',
        marginBottom: 15
    },
})

export default Header

