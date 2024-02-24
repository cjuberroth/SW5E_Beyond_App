import React, { useContext } from 'react'
import { Text, View, StyleSheet, ImageBackground, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import HeaderContext from '../../context/HeaderContext'
import CharacterContext from '../../context/CharacterContext'
import { useSettingsContext } from '../../context/SettingsContext'
import HeaderButtonSmall from './HeaderButtonSmall'

const HeaderCollapsed = () => {
    const characterInfo = useContext(CharacterContext).characterInformation
    const navigation = useNavigation()
    const toggleHeader = useContext(HeaderContext).headerUtils.toggleHeader
    const toggleInspiration = useContext(HeaderContext).headerUtils.toggleInspiration
    const toggleInspirationStyle = useContext(HeaderContext).headerUtils.toggleInspirationStyle
    const { conditionsState } = useContext(CharacterContext)
    const { alignmentSettings } = useSettingsContext()
    
    return (
        <ImageBackground style={{height: '100%', resizeMode: 'contain'}}
                source={require('../../../assets/starBackground.jpg')}>
            <View style={{flex: 1}} >
                <View style={styles.headerContainer}>
                    <HeaderButtonSmall onPress={() => navigation.navigate('ConditionsModal')} 
                        icon='allergies' 
                        buttonStyle=
                        {
                            conditionsState > 0 ?
                                [styles.headerButton, {backgroundColor: alignmentSettings.headerButtonColor}]
                            :
                                [styles.headerButtonActive, {backgroundColor: alignmentSettings.inspirationButtonColor}]
                        }
                         />
                    <HeaderButtonSmall onPress={() => navigation.navigate('RestModal')} 
                        icon='bed' 
                        buttonStyle={[styles.headerButton, {backgroundColor: alignmentSettings.headerButtonColor}]} />
                    <HeaderButtonSmall onPress={() => navigation.navigate('DefensesModal')} 
                        icon='shield-alt' 
                        buttonStyle={[styles.headerButton, {backgroundColor: alignmentSettings.headerButtonColor}]} />
                    <HeaderButtonSmall onPress={toggleInspiration} 
                        icon='lightbulb' 
                        buttonStyle={toggleInspirationStyle} />
                    
                </View>
                <View style={[styles.collapseButton, {backgroundColor: alignmentSettings.headerButtonColor}]}>
                    <Pressable style={{flexDirection: 'row', width: '84%'}} onPress={toggleHeader}>
                        <Text style={styles.collapseButtonText} adjustsFontSizeToFit>{characterInfo.name} | Lvl {characterInfo.level} </Text>
                        <FontAwesome5 style={ styles.icon } name='angle-down' />
                    </Pressable>
                    <Pressable style={{flexDirection: 'row'}} onPress={() => {navigation.navigate('DiceRollModal')}}>
                        <Text style={styles.collapseButtonText}>Roll </Text>
                        <FontAwesome5 style={ styles.icond20 } name='dice-d20' />
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 2,
        //borderBottomColor: '#4A0C05', 
        borderBottomColor: 'rgba(21, 242, 253, 0.1)',
        //borderBottomWidth: 2
    },
    collapseButton: {
        flex: 0.5,
        flexDirection: 'row',
        //borderWidth: 2,
        //borderColor: '#4A0C05',
        //borderColor: 'rgba(21, 242, 253, 0.1)',
        width: '100%',
        justifyContent: 'center',
        //backgroundColor: '#4A0C05',
        backgroundColor: 'rgba(21, 242, 253, 0.1)',
        alignItems: 'center'
    },
    collapseButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        //paddingHorizontal: 5
    },
    icon: {
        fontSize: 20, 
        color: 'white',
        alignSelf: 'center',
        paddingRight: 5
    },
    headerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        paddingHorizontal: 1,
        borderRadius: 4,
        //backgroundColor: '#4A0C05',
        backgroundColor: 'rgba(21, 242, 253, 0.1)',
        marginHorizontal: 20,
        width: '75%'
    },
    headerButtonActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        paddingHorizontal: 1,
        borderColor: '#15f2fd',
        borderWidth: 2,
        borderRadius: 4,
        //backgroundColor: '#4A0C05',
        backgroundColor: 'rgba(21, 242, 253, 0.1)',
        marginHorizontal: 20,
        width: '75%'
    },
    icond20: {
        fontSize: 15, 
        color: 'white',
        alignSelf: 'center',
        paddingRight: 5
    },
})

export default HeaderCollapsed

