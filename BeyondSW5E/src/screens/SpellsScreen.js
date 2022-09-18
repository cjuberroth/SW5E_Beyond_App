import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import DuoToggleSwitch from "react-native-duo-toggle-switch"
import CharacterContext from '../context/CharacterContext'
import PowerTable from '../components/PowerTable'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import Styles from '../styles/AppStyles'

const SpellsScreen = () => {
    const charData = useContext(CharacterContext).character
    const proficiency = useContext(CharacterContext).characterInformation.proficiency
    const forcePoints = useContext(CharacterContext).characterCasting.forcePoints
    const charMods = useContext(CharacterContext).characterMods
    const currentForcePoints = forcePoints - charData.currentStats.forcePointsUsed
    const wisdomForceSave = 8 + charMods.wis_mod + proficiency
    const charismaForceSave = 8 + charMods.cha_mod + proficiency
    const techSave = 8 + charMods.int_mod + proficiency
    const techPoints = useContext(CharacterContext).characterCasting.techPoints
    const currentTechPoints = techPoints - charData.currentStats.techPointsUsed
    const [powerToggle, setPowerToggle] = useState(true)
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed

    return (
        <View style = {Styles.globalStyles.parentContainerView}>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <View style={{alignItems: 'center'}}>
                    <DuoToggleSwitch 
                        primaryText="FORCE"
                        secondaryText="TECH"
                        onPrimaryPress={() => {setPowerToggle(!powerToggle)}}
                        onSecondaryPress={() => {setPowerToggle(!powerToggle)}}
                    />
                </View>
                <View style={{flex:1}}>
                    {
                        powerToggle
                        ?   <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row', width: '80%'}}>
                                        <View style={{backgroundColor: '#15f2fd', flex: 1, alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderRightWidth: 2}}>
                                            <Text style={{fontSize: 20}}>{wisdomForceSave}</Text>
                                        </View>
                                        <View style={{backgroundColor: '#EB212E', flex: 1, alignItems: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10, borderLeftWidth: 2}}>
                                            <Text style={{fontSize: 20}}>{charismaForceSave}</Text>
                                        </View>
                                    </View>
                                    <Text style={{color: 'white', fontSize: 16}}>Force Saves</Text>
                                </View>
                                <View style={{flex:1, alignItems: 'center'}}>
                                    <View style={{backgroundColor: '#ffffbf', alignItems: 'center', borderRadius: 10, width: '80%'}}>
                                        <Text style={{fontSize: 20}}>{currentForcePoints} / {forcePoints}</Text>
                                    </View>
                                    <Text style={{color: 'white', fontSize: 16}}>Force Points</Text>
                                </View>
                                <View style={{flex:1, alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row', width: '80%'}}>
                                        <View style={{backgroundColor: '#15f2fd', flex: 1, alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderRightWidth: 2}}>
                                            <Text style={{fontSize: 20}}>+{charMods.wis_mod + proficiency}</Text>
                                        </View>
                                        <View style={{backgroundColor: '#EB212E', flex: 1, alignItems: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10, borderLeftWidth: 2}}>
                                            <Text style={{fontSize: 20}}>+{charMods.cha_mod + proficiency}</Text>
                                        </View>
                                    </View>
                                    <Text style={{color: 'white', fontSize: 16}}>Force Hit</Text>
                                </View>
                            </View>
                        :   <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <View style={{flex:1, alignItems: 'center'}}>
                                    <View style={{backgroundColor: '#ffffbf', alignItems: 'center', borderRadius: 10, width: '80%'}}>
                                        <Text style={{fontSize: 20}}>{techSave}</Text>
                                    </View>
                                    <Text style={{color: 'white', fontSize: 16}}>Tech Save</Text>
                                </View>
                                <View style={{flex:1, alignItems: 'center'}}>
                                    <View style={{backgroundColor: '#ffffbf', alignItems: 'center', borderRadius: 10, width: '80%'}}>
                                        <Text style={{fontSize: 20}}>{currentTechPoints} / {techPoints}</Text>
                                    </View>
                                    <Text style={{color: 'white', fontSize: 16}}>Tech Points</Text>
                                </View>
                                <View style={{flex:1, alignItems: 'center'}}>
                                    <View style={{backgroundColor: '#ffffbf', alignItems: 'center', borderRadius: 10, width: '80%'}}>
                                        <Text style={{fontSize: 20}}>+{charMods.int_mod + proficiency}</Text>
                                    </View>
                                    <Text style={{color: 'white', fontSize: 16}}>Tech Hit</Text>
                                </View>
                            </View>
                            // <View style={{alignItems: 'center'}}>
                            //     <Text>Tech Points: {currentTechPoints} / {techPoints}</Text>
                            //     <Text>Tech Save: {techSave}</Text>
                            //     <Text>Tech Power Hit: +{charMods.int_mod + proficiency}</Text>
                            // </View>
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
                </View>
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
    }
})

export default SpellsScreen