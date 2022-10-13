import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, Pressable, FlatList } from 'react-native'
import Modal from 'react-native-modal'
import { FontAwesome5 } from '@expo/vector-icons'
import HeaderContext from '../context/HeaderContext'
import CharacterContext from '../context/CharacterContext'
import HeaderButton from './HeaderButton'
import Checkbox from './CheckBox'

const Header = () => {
    const characterInfo = useContext(CharacterContext).characterInformation
    const characterMods = useContext(CharacterContext).characterMods
    const characterEquipment = useContext(CharacterContext).characterEquipment
    const apiData = useContext(CharacterContext).apiData
    const numberPresent = useContext(CharacterContext).functions.numberPresent
    const [isConditionsVisible, setConditionsVisible] = useState(false)
    const [isRestVisible, setRestVisible] = useState(false)
    const [isDefensesVisible, setDefensesVisible] = useState(false)
    
    const isCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const toggleHeader = useContext(HeaderContext).headerUtils.toggleHeader
    const toggleInspiration = useContext(HeaderContext).headerUtils.toggleInspiration
    const toggleInspirationStyle = useContext(HeaderContext).headerUtils.toggleInspirationStyle

    const toggleConditions = () => {
        setConditionsVisible(!isConditionsVisible)
    }
    const toggleRest = () => {
        setRestVisible(!isRestVisible)
    }
    const toggleDefenses = () => {
        setDefensesVisible(!isDefensesVisible)
    }

    //conditions modal not working correctly; gets initial list from JSON but won't update
    //may need to rewrite modal component to not use flatlist or create as a separate
    //component and feed data into it as true/false values (similar to inventory/item card)
    const getConditions = (charCondition) => {
        for (i = 0; i < characterInfo.conditions.length; i++) {
            if (characterInfo.conditions[i] === charCondition) {
                return true
            }
        }
    }

    const [checked, onChange] = useState(checked)

    return (
        <>
            <ImageBackground style={{height: '100%', resizeMode: 'stretch'}}
                    source={require('../../assets/header-background-upsidedown.jpg')}>
                <View style={{flex: 1}} >
                    <View style={styles.headerContainer}>
                        <View style={styles.headerBtnCol}>
                            <HeaderButton onPress={toggleConditions} title="Conditions" buttonStyle={styles.headerButton} />
                            <HeaderButton onPress={toggleRest} title="Rest" buttonStyle={styles.headerButton} />
                        </View>
                        <Image
                            source={
                                characterInfo.image != '' ? {uri: characterInfo.image}
                                : require('../../assets/defaultCharImage.png')
                            }
                            style={{ flex: 1, width: '100%', height: '100%', borderRadius: 5, borderWidth: 2, borderColor: '#4A0C05' }}
                            resizeMode={"cover"}
                        />
                        <View style={styles.headerBtnCol}>
                            <HeaderButton onPress={toggleDefenses} title="Defenses" buttonStyle={styles.headerButton} />
                            <HeaderButton onPress={toggleInspiration} title="Inspiration" buttonStyle={toggleInspirationStyle} />
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
                            <Text style={styles.statTextBig}>{characterEquipment.armorClass}</Text>
                        </View>
                    </View>
                

                    <View style={{alignItems: 'center', flex: 1}}>
                        <Pressable style={styles.collapseButton} onPress={toggleHeader}>
                            <Text style={styles.collapseButtonText}>{characterInfo.name}  </Text>
                            <FontAwesome5 style={ styles.icon } name='angle-up' />
                        </Pressable>
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
                                    <View style={styles.modalListHeadView}>
                                        <Checkbox
                                            checked={getConditions(item.name)}
                                            onChange={onChange}
                                            buttonStyle={styles.checkboxBase}
                                            activeButtonStyle={styles.checkboxChecked} />
                                        <Text style={styles.modalListHead}>{item.name}</Text>
                                    </View>
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
        flex: 3.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 5
        //height: '100%'
    },
    headerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#4A0C05',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%'
      },
      inspirationButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#15f2fd',
        marginHorizontal: 20,
        marginVertical: 5,
        minWidth: '80%'
      },
    headerBtnCol: {
        flex: 1,
        alignItems: 'center'
    },
    headerStats: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#4A0C05', 
        borderBottomWidth: 2
    },
    statBox: {
        alignItems: 'center'
    },
    statText: {
        color: 'white'
    },
    statTextBig: {
        fontSize: 25,
        color: 'white'
    },
    collapseButton: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#4A0C05'
    },
    collapseButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 5
    },
    icon: {
        fontSize: 25, 
        color: 'white',
        alignSelf: 'center',
        paddingRight: 5
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
    modalListHeadView: {
        flexDirection: 'row'
    },
    modalListHead: {
        color: 'white',
        fontWeight: 'bold',
        paddingBottom: 4,
        flex: 9
    },
    modalList: {
        color: 'white',
        paddingBottom: 8
    },
    checkboxBase: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'transparent',
      },
    
      checkboxChecked: {
        backgroundColor: 'white',
      }
})

export default Header

