import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, Button, Pressable, FlatList } from 'react-native'
import Modal from 'react-native-modal'
import { FontAwesome5 } from '@expo/vector-icons'
import HeaderContext from '../context/HeaderContext'
import CharacterContext from '../context/CharacterContext'
import HeaderButton from './HeaderButton'

const Header = (headerHeight) => {
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterMods = useContext(CharacterContext).characterMods
    const apiData = useContext(CharacterContext).apiData
    const numberPresent = useContext(CharacterContext).functions.numberPresent
    const [isConditionsVisible, setConditionsVisible] = useState(false)
    const [isRestVisible, setRestVisible] = useState(false)
    const [isDefensesVisible, setDefensesVisible] = useState(false)
    const isCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const toggleHeader = useContext(HeaderContext).headerUtils.toggleHeader

    const toggleConditions = () => {
        setConditionsVisible(!isConditionsVisible)
    }
    const toggleRest = () => {
        setRestVisible(!isRestVisible)
    }
    const toggleDefenses = () => {
        setDefensesVisible(!isDefensesVisible)
    }

    return (
        <>
            <ImageBackground style={{height: '100%', resizeMode: 'contain'}}
                    source={require('../../assets/header-background-upsidedown.jpg')}>
                <View style={{flex: 1}} >
                    <View style={styles.headerContainer}>
                        <View style={styles.headerBtnCol}>
                            <HeaderButton onPress={toggleConditions} title="Conditions" />
                            <HeaderButton onPress={toggleRest} title="Rest" />
                        </View>
                        <Image
                            source={{uri: characterInfo.image}}
                            style={{ flex: 1, width: '100%', height: '100%' }}
                            resizeMode={"contain"}
                        />
                        <View style={styles.headerBtnCol}>
                            <HeaderButton onPress={toggleDefenses} title="Defenses" />
                            <HeaderButton onPress={() => alert('Function for inspiration')} title="Inspiration" />
                        </View>
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
                

                <View style={{alignItems: 'center', marginTop: 5, flex: 1}}>
                    <HeaderButton onPress={toggleHeader} title="Collapse Header" />
                </View>
                
                </View>
            </ImageBackground>

            {/* Rest Modal */}
            <Modal 
                isVisible={isRestVisible}
                onBackdropPress={toggleRest}>
                <View style={ styles.modalContainer}>
                    <Pressable style={ styles.modalCloseButton } onPress={toggleRest} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Pressable style={ styles.modalButton } onPress={() => alert('Function for short rest')} >
                        <Text style={ styles.modalButtonText }>Short Rest</Text>
                    </Pressable> 
                    <Pressable style={ styles.modalButton } onPress={() => alert('Function for long rest')} >
                        <Text style={ styles.modalButtonText }>Long Rest</Text>
                    </Pressable>
                </View>
            </Modal>

            {/* Conditions Modal */}
            <Modal 
                isVisible={isConditionsVisible}
                onBackdropPress={toggleConditions}>
                <View style={ styles.modalContainer}>
                    <Pressable style={ styles.modalCloseButton } onPress={toggleConditions} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <FlatList
                        data = {apiData.conditions}
                        keyExtractor = {(condition) => condition.rowKey}
                        renderItem = { ({ item }) => {
                            return (
                                <View>
                                    <Text style={styles.modalListHead}>{item.name}</Text>
                                    <Text style={styles.modalList}>{item.description}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </Modal>

            {/* Defenses Modal */}
            <Modal 
                isVisible={isDefensesVisible}
                onBackdropPress={toggleDefenses}>
                <View style={ styles.modalContainer}>
                    <Pressable style={ styles.modalCloseButton } onPress={toggleDefenses} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text>This is where resistances, immunities, and vulnerabilities go</Text>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 5
        //height: '100%'
    },
    headerBtnCol: {
        flex: 1,
        alignItems: 'center'
    },
    headerStats: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //flex: 1,
        paddingTop: 10
    },
    statBox: {
        alignItems: 'center'
    },
    statText: {
        color: 'black'
    },
    statTextBig: {
        fontSize: 25,
        color: 'black'
    },
    headingStyle: {
        fontSize: 30,
        backgroundColor: '#263238',
        color: 'white',
        textAlign: 'center',
        marginBottom: 15
    },
    modalContainer: {
        backgroundColor: 'gray',
        padding: 5
        
    },
    modalCloseButton: {
        fontSize: 25, 
        color: 'white',
        marginBottom: 5
    },
    modalButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: 'black',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%'
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        padding: 5
    },
    modalListHead: {
        color: 'white',
        fontWeight: 'bold',
        paddingBottom: 4
    },
    modalList: {
        color: 'white',
        paddingBottom: 8
    }
})

export default Header

