import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, ImageBackground, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DuoToggleSwitch from "react-native-duo-toggle-switch"
import CharacterContext from '../context/CharacterContext'
//import SettingsContext from '../context/SettingsContext'
import { useSettingsContext } from '../context/SettingsContext'
import PowerTable from '../components/PowerTable'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles'

const SpellsScreen = () => {
    const navigation = useNavigation()
    const proficiency = useContext(CharacterContext).characterInformation.proficiency
    const forcePoints = useContext(CharacterContext).characterCasting.maxForcePoints
    const charMods = useContext(CharacterContext).characterMods
    const {forcePointsState, setForcePointsState} = useContext(CharacterContext)
    const wisdomForceSave = 8 + charMods.wis_mod + proficiency
    const charismaForceSave = 8 + charMods.cha_mod + proficiency
    const techSave = 8 + charMods.int_mod + proficiency
    const techPoints = useContext(CharacterContext).characterCasting.maxTechPoints
    const {techPointsState, setTechPointsState} = useContext(CharacterContext)
    let [powerToggle, setPowerToggle] = useState(true)
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const {emblem} = useSettingsContext()

    const castingPointsModal = (pointsType) => {
        navigation.navigate('CastingPointsModal', { pointsType: pointsType })
    }

    const castsBoth = forcePoints > 0 && techPoints > 0
    if(!castsBoth){
        if(techPoints > 0) {
            powerToggle = false
        }
        else {
            powerToggle = true
        }
    }
    return (
        <View style = {AppStyles.globalStyles.parentContainerView}>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                    source={ require('../../assets/starBackgroundVert.jpg') }>
                    {
                        castsBoth
                        ?   <View style={{alignItems: 'center'}}>
                                <DuoToggleSwitch 
                                    primaryText="FORCE"
                                    secondaryText="TECH"
                                    onPrimaryPress={() => { powerToggle ? null : setPowerToggle(!powerToggle) }}
                                    onSecondaryPress={() => { powerToggle ? setPowerToggle(!powerToggle) : null }}
                                    activeColor='#ffe81f'
                                    activeTextColor='black'
                                    inactiveTextColor='#CFD8DC'
                                />
                            </View>
                        :   null
                    }
                    <View style={{flex:1}}>
                        <ImageBackground imageStyle={styles.imgBackground} 
                        //source={require('../../assets/rebel-alliance.png')}
                            source={emblem && {uri: emblem}}
                        >
                            {
                                powerToggle
                                ?   <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 5}}>
                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <View style={{flexDirection: 'row', width: '80%'}}>
                                                <View style={{backgroundColor: '#15f2fd', flex: 1, alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRightWidth: 2, marginTop: 3}}>
                                                    <Text style={{fontSize: 20}}>{wisdomForceSave}</Text>
                                                </View>
                                                <View style={{backgroundColor: '#EB212E', flex: 1, alignItems: 'center', borderTopRightRadius: 5, borderBottomRightRadius: 5, borderLeftWidth: 2, marginTop: 3}}>
                                                    <Text style={{fontSize: 20, color: 'white'}}>{charismaForceSave}</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.descriptorText}>force Saves</Text>
                                        </View>
                                        <View style={{flex:1, alignItems: 'center'}}>
                                            <Pressable style={{borderColor: '#ffe81f', borderWidth: 2, alignItems: 'center', borderRadius: 5, width: '80%'}}
                                                onPress={() => castingPointsModal('Force')}>
                                                <View >
                                                    <Text style={{fontSize: 20, color: 'white'}}>{forcePointsState} / {forcePoints}</Text>
                                                </View>
                                            </Pressable>
                                            <Text style={styles.descriptorText}>force points</Text>
                                        </View>
                                        <View style={{flex:1, alignItems: 'center'}}>
                                            <View style={{flexDirection: 'row', width: '80%'}}>
                                                <View style={{backgroundColor: '#15f2fd', flex: 1, alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRightWidth: 2, marginTop: 3}}>
                                                    <Text style={{fontSize: 20}}>+{charMods.wis_mod + proficiency}</Text>
                                                </View>
                                                <View style={{backgroundColor: '#EB212E', flex: 1, alignItems: 'center', borderTopRightRadius: 5, borderBottomRightRadius: 5, borderLeftWidth: 2, marginTop: 3}}>
                                                    <Text style={{fontSize: 20, color: 'white'}}>+{charMods.cha_mod + proficiency}</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.descriptorText}>force hit</Text>
                                        </View>
                                    </View>
                                :   <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                        <View style={{flex:1, alignItems: 'center'}}>
                                            <View style={{backgroundColor: '#ffe81f', alignItems: 'center', borderRadius: 5, width: '80%', marginTop: 3}}>
                                                <Text style={{fontSize: 20}}>{techSave}</Text>
                                            </View>
                                            <Text style={styles.descriptorText}>tech Save</Text>
                                        </View>
                                        <View style={{flex:1, alignItems: 'center'}}>
                                            <Pressable style={{borderColor: '#ffe81f', borderWidth: 2, alignItems: 'center', borderRadius: 5, width: '80%'}}
                                                onPress={() => castingPointsModal('Tech')}>
                                                <View>
                                                    <Text style={{fontSize: 20, color: 'white'}}>{techPointsState} / {techPoints}</Text>
                                                </View>
                                            </Pressable>
                                            <Text style={styles.descriptorText}>tech points</Text>
                                        </View>
                                        <View style={{flex:1, alignItems: 'center'}}>
                                            <View style={{backgroundColor: '#ffe81f', alignItems: 'center', borderRadius: 5, width: '80%', marginTop: 3}}>
                                                <Text style={{fontSize: 20}}>+{charMods.int_mod + proficiency}</Text>
                                            </View>
                                            <Text style={styles.descriptorText}>tech hit</Text>
                                        </View>
                                    </View>
                            }
                            <ScrollView bounces={false}>
                                <PowerTable powerLevel = { 0 } powerToggle = { powerToggle } />
                                <PowerTable powerLevel = { 1 } powerToggle = { powerToggle } />
                                <PowerTable powerLevel = { 2 } powerToggle = { powerToggle } />
                                <PowerTable powerLevel = { 3 } powerToggle = { powerToggle } />
                                <PowerTable powerLevel = { 4 } powerToggle = { powerToggle } />
                                <PowerTable powerLevel = { 5 } powerToggle = { powerToggle } />
                                <PowerTable powerLevel = { 6 } powerToggle = { powerToggle } />
                                <PowerTable powerLevel = { 7 } powerToggle = { powerToggle } />
                                <PowerTable powerLevel = { 8 } powerToggle = { powerToggle } />
                                <PowerTable powerLevel = { 9 } powerToggle = { powerToggle } />
                            </ScrollView>
                        </ImageBackground>
                    </View>
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
        alignSelf: 'center'
    },
    imgBackground: {
        width: '100%',
        resizeMode: 'contain'
    },
    descriptorText: {
        fontFamily: 'star-font',
        fontSize: 14,
        color: '#ffe81f'
    }
})

export default SpellsScreen