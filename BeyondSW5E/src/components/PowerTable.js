import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import CharacterContext from '../context/CharacterContext'

const PowerTable = ({ powerLevel, powerToggle }) => {
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

    return (
        powersByLevel == 0
        ?   null
        :   <View>
                <Text style={styles.tableTitle}>{tableTitle}</Text>
                <DataTable style={styles.dataTable}>
                    <DataTable.Header>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title>Period</DataTable.Title>
                        <DataTable.Title>Range</DataTable.Title>
                        <DataTable.Title>Duration</DataTable.Title>
                    </DataTable.Header>
                    {
                        powersByLevel.map(power => {
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{power.name}</DataTable.Cell>
                                    <DataTable.Cell>{power.castingPeriodText}</DataTable.Cell>
                                    <DataTable.Cell>{power.range}</DataTable.Cell>
                                    <DataTable.Cell>{power.duration}</DataTable.Cell>
                                </DataTable.Row>
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
        fontSize: 16
    },
    dataTable: {
        paddingBottom: 10
    }
})

export default PowerTable