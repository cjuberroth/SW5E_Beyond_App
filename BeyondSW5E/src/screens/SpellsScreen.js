import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { DataTable } from 'react-native-paper'
import PowerCardList from '../components/PowerCardList'
import DuoToggleSwitch from "react-native-duo-toggle-switch"
import CharacterContext from '../context/CharacterContext'

/*
    This screen will need to be modified to accomodate the difference between force and tech powers
    Additionally, there are several comments below which identify the need to paramaterize several
    other values which come from character data and the api
*/

const SpellsScreen = () => {
    // Import contexts for char data
    const charData = useContext(CharacterContext).character
    const proficiency = useContext(CharacterContext).characterInformation.proficiency
    const forcePoints = useContext(CharacterContext).characterCasting.forcePoints
    const powers = useContext(CharacterContext).characterCasting.forcePowersData
    const charMods = useContext(CharacterContext).characterMods
    const currentForcePoints = forcePoints - charData.currentStats.forcePointsUsed
    const wisdomForceSave = 8 + charMods.wis_mod
    const charismaForceSave = 8 + charMods.cha_mod

    const [powerToggle, setPowerToggle] = useState(true)
    return (
        <View style = {{flex: 1}}>
            <View>
                <DuoToggleSwitch 
                    primaryText="FORCE"
                    secondaryText="TECH"
                    onPrimaryPress={() => {setPowerToggle(!powerToggle)}}
                    onSecondaryPress={() => {setPowerToggle(!powerToggle)}}
                />
            </View>
            {
                // In line conditional which determines which type of powers to display
                powerToggle
                ?   <View style={{flex:1}}>
                        <View>
                            <Text>FORCE POWERS TOGGLED</Text>
                            <Text>Force Points: {currentForcePoints} / {forcePoints}</Text>
                            <Text>Force Saves: {wisdomForceSave} / {charismaForceSave}</Text>
                            <Text>Force Power Hit: +{charMods.wis_mod + proficiency} / +{charMods.cha_mod + proficiency}</Text>
                        </View>
                        <ScrollView
                            bounces={false}
                        >
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>At-Will</Text>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title></DataTable.Title>
                                    <DataTable.Title>Period</DataTable.Title>
                                    <DataTable.Title>Range</DataTable.Title>
                                    <DataTable.Title>Duration</DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row>
                                    <DataTable.Cell>{powers[0].name}</DataTable.Cell>
                                    <DataTable.Cell>{powers[0].castingPeriodText}</DataTable.Cell>
                                    <DataTable.Cell>{powers[0].range}</DataTable.Cell>
                                    <DataTable.Cell>{powers[0].duration}</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>{powers[1].name}</DataTable.Cell>
                                    <DataTable.Cell>{powers[1].castingPeriodText}</DataTable.Cell>
                                    <DataTable.Cell>{powers[1].range}</DataTable.Cell>
                                    <DataTable.Cell>{powers[1].duration}</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>Level 1</Text>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title></DataTable.Title>
                                    <DataTable.Title>Period</DataTable.Title>
                                    <DataTable.Title>Range</DataTable.Title>
                                    <DataTable.Title>Duration</DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row>
                                    <DataTable.Cell>{powers[0].name}</DataTable.Cell>
                                    <DataTable.Cell>{powers[0].castingPeriodText}</DataTable.Cell>
                                    <DataTable.Cell>{powers[0].range}</DataTable.Cell>
                                    <DataTable.Cell>{powers[0].duration}</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>{powers[1].name}</DataTable.Cell>
                                    <DataTable.Cell>{powers[1].castingPeriodText}</DataTable.Cell>
                                    <DataTable.Cell>{powers[1].range}</DataTable.Cell>
                                    <DataTable.Cell>{powers[1].duration}</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>Level 2</Text>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title></DataTable.Title>
                                    <DataTable.Title>Period</DataTable.Title>
                                    <DataTable.Title>Range</DataTable.Title>
                                    <DataTable.Title>Duration</DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row>
                                    <DataTable.Cell>{powers[0].name}</DataTable.Cell>
                                    <DataTable.Cell>{powers[0].castingPeriodText}</DataTable.Cell>
                                    <DataTable.Cell>{powers[0].range}</DataTable.Cell>
                                    <DataTable.Cell>{powers[0].duration}</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>{powers[1].name}</DataTable.Cell>
                                    <DataTable.Cell>{powers[1].castingPeriodText}</DataTable.Cell>
                                    <DataTable.Cell>{powers[1].range}</DataTable.Cell>
                                    <DataTable.Cell>{powers[1].duration}</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        </ScrollView>
                    </View>
                :   <View>
                        <Text>TECH POWERS TOGGLED</Text>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        alignItems: 'center',
        flex: 1
    },
    headerStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default SpellsScreen

/*
<FlatList
                data = { charCasting.forcePowers }
                renderItem={({ item }) => {
                    return <Text>{ item }</Text>
                }}
*/