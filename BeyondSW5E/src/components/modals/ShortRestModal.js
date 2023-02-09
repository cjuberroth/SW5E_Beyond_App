import React, { useContext, useState, useMemo } from 'react'
import { View, Pressable, Text, StyleSheet, FlatList } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import AppStyles from '../../styles/AppStyles'
import Checkbox from '../Checkbox'
import CharacterContext from '../../context/CharacterContext'

const ShortRestModal = () => {
    const navigation = useNavigation()
    const [checkedReset, onChangeReset] = useState(false)
    const [checkedApply, onChangeApply] = useState(true)
    const charClasses = useContext(CharacterContext).characterInformation.classes
    const conMod = useContext(CharacterContext).characterMods.con_mod
    const classData = useContext(CharacterContext).apiData.class
    
    const [checkedDie, onChangeDie] = useState({})
    const handleChange = (e) => {
        const value = {
            ...checkedDie,
            [e.target.name]: e.target.checkedDie,
        }
        onChangeDie(value)
    }

    const closeModal = () => {
        navigation.dispatch(StackActions.pop(2))
    }

    const getHitDie = (charClass) => {
        for(i = 0; i < classData.length; i++) {
            if (classData[i].name === charClass) {
                return classData[i].hitDiceDieType
            }
        }
    }

    

    const renderCheckbox = (count) => {
        //let arr = new Array(count).fill()
        let arr = Array.from(Array(count).keys())

    
            return (
                arr.map((id) => 
                    <Checkbox
                        checked={checkedDie}
                        onChange={onChangeDie}
                        buttonStyle={styles.checkboxBase}
                        activeButtonStyle={styles.checkboxChecked}
                        id={id}
                    />
                )
            )
        
    }

    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={closeModal}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={closeModal} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText}>Short Rest   </Text>
                    <FontAwesome5 style={ styles.modalCloseButton } name="book-reader" />
                </View>
                <Text style={{fontSize: 14}}>A short rest is a period of downtime, at least 1 hour long, during which a character does nothing more strenuous than eating, drinking, reading, and tending to wounds.</Text>
                <View style={ styles.modalHeading }>
                    <Text style={ styles.modalHeading }>Recover</Text>
                </View>
                <View style={ AppStyles.tableStyles.tableRow }>
                    <Checkbox 
                        checked={checkedReset}
                        onChange={onChangeReset}
                        buttonStyle = {styles.checkboxBase}
                        activeButtonStyle = {styles.checkboxChecked} />
                    <Text style={{flex: 9, paddingLeft: 5, fontSize: 14}}>Reset max HP changes during this rest</Text>
                </View>
                <View style={ AppStyles.tableStyles.tableRow }>
                    <Checkbox 
                        checked={checkedApply}
                        onChange={onChangeApply}
                        buttonStyle = {styles.checkboxBase}
                        activeButtonStyle = {styles.checkboxChecked} />
                    <Text style={{flex: 9, paddingLeft: 5, fontSize: 14}}>Automatically apply healing with dice result</Text>
                </View>
                <FlatList
                    data = { charClasses }
                    keyExtractor = {(item) => item.class}
                    renderItem = {({ item }) => {
                        return (
                            <>
                                <Text>{item.class} (Hit Die: 1d{getHitDie(item.class)}+{conMod})</Text>
                                    <View style={ styles.checkboxView }>
                                        {renderCheckbox(item.level)}
                                    </View>
                            </>
                        )
                    }}
                />
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
        //height: '75%',
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
    modalHeading: {
        alignItems: 'center',
        fontSize: 20,
        paddingTop: 10
    },
    checkboxView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    checkboxBase: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'transparent',
        height: 20,
        marginHorizontal: 1
      },
      checkboxChecked: {
        backgroundColor: 'black',
      },
})

export default ShortRestModal