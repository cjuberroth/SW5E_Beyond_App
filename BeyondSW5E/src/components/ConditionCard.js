import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import AppStyles from '../styles/AppStyles'
import Checkbox from './Checkbox'

const ConditionCard = ({ item }) => {
    const characterInfo = useContext(CharacterContext).characterInformation
    
    const getConditions = (charCondition) => {
        for (i = 0; i < characterInfo.conditions.length; i++) {
            if (characterInfo.conditions[i] === charCondition) {
                return true
            }
        }
    }    
    
    const [checked, onChange] = useState(getConditions(item.name))
    
    return (
        <View>
            <View style = { AppStyles.tableStyles.tableRow }>
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    buttonStyle={styles.checkboxBase}
                    activeButtonStyle={styles.checkboxChecked} />
                <Text style = {[ styles.column, styles.colItem ]}> { item.name }</Text>
                <Text style = {[ styles.column, styles.colCost ]}>{ item.description }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    colItem: { flex: 3, fontSize: 12 },
    colCost: { flex: 7, fontSize: 12 },
    checkboxBase: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      borderColor: 'black',
      backgroundColor: 'transparent',
      height: 20
    },
    checkboxChecked: {
      backgroundColor: 'black',
    },
    column: {
        fontSize: 15,
        color: 'black',
    }
})

export default ConditionCard