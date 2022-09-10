import React, { useContext, useRef, useState } from 'react'
import { Text, View, StyleSheet, Image, Animated, Button } from 'react-native'
import Modal from 'react-native-modal'
import HeaderContext from '../context/HeaderContext'
import CharacterContext from '../context/CharacterContext'

const Header = () => {
    const headerHeight = useContext(HeaderContext).headerUtils.headerHeight
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterMods = useContext(CharacterContext).characterMods
    const numberPresent = useContext(CharacterContext).functions.numberPresent
    const [isRestVisible, setRestVisible] = useState(false)

    const toggleRest = () => {
        setRestVisible(!isRestVisible)
    }

    return (
        <>
            <View style={{height: headerHeight}}>
                <View style={styles.headerContainer}>
                    <Button title="Rest" onPress={toggleRest} />
                    <Image
                        source={{uri: characterInfo.image}}
                        style={{ flex: 1, width: '100%', height: '100%' }}
                        resizeMode={"contain"}
                    />
                    <Button title="Rest" onPress={toggleRest} />
                    <Modal 
                        isVisible={isRestVisible}
                        onBackdropPress={toggleRest}>
                        <View style={{ backgroundColor: 'gray' }}>
                            <Text style={{ color: 'white' }}>Rest Modal</Text>
                            <Button title="Close" onPress={toggleRest} />
                        </View>
                    </Modal>
                </View>
                
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerStats: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
        marginTop: 10
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

