import React, { useContext } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { DataTable } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import CharacterContext from '../context/CharacterContext'

const PowerTable = ({ powerLevel, powerToggle }) => {
    const navigation = useNavigation()
    const forcePowers = useContext(CharacterContext).characterCasting.forcePowersData
    const techPowers = useContext(CharacterContext).characterCasting.techPowersData
    let powersByLevel = powerToggle ? forcePowers : techPowers
    powersByLevel = powersByLevel.filter((power) => {
        if(power.level == powerLevel) {
            return power
        }
    })

    let tableTitle = ''
    if (powerLevel == 0) {
        tableTitle = 'At Will'
    }
    else {
        tableTitle = 'Level ' + powerLevel
    }

    const showPowerDetails = (power) => {
        navigation.navigate('PowerDetailModal', {
            name: power.name,
            level: power.level,
            forceAlignment: power.forceAlignment,
            castingPeriod: power.castingPeriod,
            range: power.range,
            duration: power.duration,
            concentration: power.concentration,
            hasPrereq: power.prerequisite,
            description: power.description,
            powerType: power.powerType
        })
    }

    return (
        powersByLevel == 0
        ?   null
        :   <View>
                <DataTable style={styles.dataTable}>
                    <DataTable.Header style={[styles.tableHeaderRow, styles.tableRow]}>
                        <DataTable.Title>
                            <Text style={styles.tableTitle}>{tableTitle}</Text>
                        </DataTable.Title>
                        <DataTable.Title>
                            <Text style={[styles.tableDataText,styles.tableHeaderText]}>Period</Text>
                        </DataTable.Title>
                        <DataTable.Title>
                            <Text style={[styles.tableDataText,styles.tableHeaderText]}>Range</Text>
                        </DataTable.Title>
                        <DataTable.Title>
                            <Text style={[styles.tableDataText,styles.tableHeaderText]}>Duration</Text>
                        </DataTable.Title>
                    </DataTable.Header>
                    {
                        powersByLevel.map(power => {
                            return (
                                <Pressable style={styles.tableRow} onPress={() => showPowerDetails(power)}>
                                    <DataTable.Row key={power.name}>
                                        <DataTable.Cell>
                                            <Text style={styles.tableDataText}>{power.name}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            <Text style={styles.tableDataText}>{power.castingPeriodText}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            <Text style={styles.tableDataText}>{power.range}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            <Text style={styles.tableDataText}>{power.duration}</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                </Pressable>
                            )
                        })
                    }
                </DataTable>
            </View>
    )
}

const styles = StyleSheet.create({
    tableTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    dataTable: {
    },
    tableHeaderText: {
        fontWeight: 'bold'
    },
    tableDataText: {
        fontSize: 12,
        color: 'white'
    },
    tableHeaderRow: {
        backgroundColor: 'rgba(52, 52, 52, 0.6)'
    },
    tableRow: {
        borderBottomColor: 'gray'
    }
})

export default PowerTable