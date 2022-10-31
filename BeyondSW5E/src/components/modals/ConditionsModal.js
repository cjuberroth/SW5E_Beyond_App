import React, { useContext, useState, useEffect } from 'react'
import { View, Pressable, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import Collapsible from 'react-native-collapsible'
import Accordion from 'react-native-collapsible/Accordion'
import * as Animatable from 'react-native-animatable'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../../context/CharacterContext'
import ConditionCard from '../ConditionCard'
import Checkbox from '../Checkbox'

const ConditionsModal = ({ navigation }) => {
    const apiConditions = useContext(CharacterContext).apiData.conditions
    const characterInfo = useContext(CharacterContext).characterInformation
    
    const getConditions = (charCondition) => {
        for (i = 0; i < characterInfo.conditions.length; i++) {
            if (characterInfo.conditions[i] === charCondition) {
                return true
            }
        }
    }    
    
    const [checked, onChange] = useState([])

    for(let i = 0; i < apiConditions.length; i++) {
        apiConditions[i]["collapsed"] = true
    }

    const [conditions, setConditions] = useState(apiConditions)
    
    const toggleConditionsExpanded = (selectedItemIndex) => {
        let toggle = conditions.map(el => (
            el.name === selectedItemIndex ? {...el, collapsed: !el.collapsed} : el
        ))
        setConditions(toggle)
    }

    return (
        <View style={styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <FlatList
                    data = {conditions}
                    keyExtractor = {(condition) => condition.rowKey}
                    renderItem = {({ item }) => {return (
                        <View>
                            <TouchableOpacity onPress={() => toggleConditionsExpanded(item.name)}>
                                <View style={styles.conditionHeader}>
                                    <Checkbox
                                        checked={getConditions(item.name)}
                                        onChange={onChange}
                                        buttonStyle={styles.checkboxBase}
                                        activeButtonStyle={styles.checkboxChecked} />
                                    <Text style={styles.conditionHeaderText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={item.collapsed}>
                                <View style={styles.content}>
                                    <Animatable.Text
                                        animation={conditions ? undefined : 'zoomIn'}
                                        duration={300}
                                        useNativeDriver>{item.description}</Animatable.Text>
                                </View>
                            </Collapsible>
                        </View>
                    )}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    modalInner: {
        height: '85%',
        width: '95%',
        backgroundColor: '#ECEFF1',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    modalHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    modalCloseButton: {
        fontSize: 25, 
        color: 'black',
    },
    tableHeader: {
        flexDirection: 'row',
        margin: 5,
    },
    column: {
        fontSize: 15,
        color: 'black',
        //paddingHorizontal: 10
    },
    colEquip: {
        flex: 1
    },
    colCondition: {
        flex: 3
    },
    colDescription: {
        flex: 7
    },
    conditionHeader: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        flexDirection: 'row'
    },
    conditionHeaderText: {
        //textAlign: 'center',
        paddingLeft: 5,
        fontSize: 16,
        fontWeight: '500',
        flex: 9
    },
    content: {
        padding: 20
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
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
})

export default ConditionsModal