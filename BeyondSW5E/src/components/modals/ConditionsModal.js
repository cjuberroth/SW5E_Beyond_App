import React, { useContext, useEffect, useState } from 'react'
import { View, Pressable, Text, StyleSheet, FlatList } from 'react-native'
import Collapsible from 'react-native-collapsible'
import * as Animatable from 'react-native-animatable'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../../context/CharacterContext'

const ConditionsModal = ({ navigation }) => {
    const apiConditions = useContext(CharacterContext).apiData.conditions
    const {conditionsState, setConditionsState} = useContext(CharacterContext)

    /* console.log(conditionsState)

    for(let i = 0; i < apiConditions.length; i++) {
        apiConditions[i]["collapsed"] = true
    }

    const [collapsingConditions, setCollapsingConditions] = useState(apiConditions)
    
    const toggleConditionsExpanded = (selectedItemIndex) => {
        let toggle = collapsingConditions.map(el => (
            el.name === selectedItemIndex ? {...el, collapsed: !el.collapsed} : el
        ))
        setCollapsingConditions(toggle)
    } */

    const toggleConditions = (selectedItemIndex) => {
        let toggle = conditionsState.map(el => (
            el.name === selectedItemIndex ? {...el, afflicted: !el.afflicted} : el
        ))
        setConditionsState(toggle)
    }
    
    const toggleConditionsExpanded = (selectedItemIndex) => {
        let toggle = conditionsState.map(el => (
            el.name === selectedItemIndex ? {...el, collapsed: !el.collapsed} : el
        ))
        setConditionsState(toggle)
    }

    return (
        <View style={styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <FlatList
                    data = {conditionsState}
                    keyExtractor = {(condition) => condition.rowKey}
                    renderItem = {({ item }) => {return (
                        <View>
                            <Pressable onPress={() => toggleConditionsExpanded(item.name)}>
                                <View style={styles.conditionHeader}>
                                    <Text style={item.afflicted ? styles.conditionHeaderTextAfflicted : styles.conditionHeaderText}>{item.name}</Text>
                                </View>
                            </Pressable>
                            <Collapsible collapsed={item.collapsed}>
                                <View style={styles.content}>
                                    <Animatable.Text
                                        animation={conditionsState ? undefined : 'zoomIn'}
                                        duration={300}
                                        useNativeDriver>{item.description}
                                    </Animatable.Text>
                                    {item.afflicted ? 
                                        <Pressable onPress={() => toggleConditions(item.name)}>
                                            <Text style={styles.conditionToggle}>ON</Text>
                                        </Pressable>
                                        : <Pressable onPress={() => toggleConditions(item.name)}>
                                            <Text style={styles.conditionToggle}>OFF</Text>
                                        </Pressable>}
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
    conditionHeaderTextAfflicted: {
        //textAlign: 'center',
        paddingLeft: 5,
        fontSize: 16,
        fontWeight: '900',
        flex: 9
    },
    content: {
        padding: 20
    },
    conditionToggle: {
        marginTop: 5,
        fontSize: 16,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        width: '25%',
        textAlign: 'center'
    }
})

export default ConditionsModal