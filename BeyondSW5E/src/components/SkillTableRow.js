import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const numberPresent = function(score) {
  if(score >= 0) {
      return "+"
  } else {
      return
  }
}

function SkillTableRow({ skillName, skillProficiency, baseAttribute, charAttributeMod, charProficiencyMod }) {
  return (
    <View style={styles.rowStyle}>
      {skillProficiency === "Proficient" ? <FontAwesome style={styles.icon} name="circle" />
        : skillProficiency === "Expertise" ? <FontAwesome style={styles.icon} name="star" />
          : <FontAwesome style={styles.icon} name="circle-o" />}
      <Text style={styles.modCol}>{ baseAttribute.toUpperCase().substring(0, 3) }</Text>
      <Text style={styles.skillCol}>{ skillName }</Text>
      {skillProficiency === "Proficient" ? <Text style={styles.bonusCol}>{numberPresent(charAttributeMod + charProficiencyMod)}{charAttributeMod + charProficiencyMod}</Text>
        : skillProficiency === "Expertise" ? <Text style={styles.bonusCol}>{numberPresent(charAttributeMod + (charProficiencyMod * 2))}{charAttributeMod + (charProficiencyMod * 2)}</Text>
          : <Text style={styles.bonusCol}>{numberPresent(charAttributeMod)}{charAttributeMod}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  rowStyle: {
    //flex: 1,
    flexDirection: 'row',
    margin: 5
  },
  modCol: {
    flex:1,
    fontSize: 15,
    color: 'white'
  },
  skillCol: {
      flex:5,
      fontSize: 15,
      color: 'white'
  },
  bonusCol: {
    flex: 2,
    fontSize: 15,
    color: 'white'
  },
  icon: {
      fontSize: 20,
      flex:2,
      paddingLeft:2,
      color: 'white'
  }
})

export default SkillTableRow
