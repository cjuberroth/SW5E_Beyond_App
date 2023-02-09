import React, { useContext } from 'react'
import { Text, View, StyleSheet, ImageBackground, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import HeaderContext from '../context/HeaderContext'
import CharacterContext from '../context/CharacterContext'
import HeaderButtonSmall from './HeaderButtonSmall'

const HeaderCollapsed = () => {
    const characterInfo = useContext(CharacterContext).characterInformation
    const navigation = useNavigation()
    const toggleHeader = useContext(HeaderContext).headerUtils.toggleHeader
    const toggleInspiration = useContext(HeaderContext).headerUtils.toggleInspiration
    const toggleInspirationStyle = useContext(HeaderContext).headerUtils.toggleInspirationStyle
    


    return (
        <ImageBackground style={{height: '100%', resizeMode: 'contain'}}
                source={require('../../assets/header-background-upsidedown.jpg')}>
            <View style={{flex: 1}} >
                <View style={styles.headerContainer}>
                    <HeaderButtonSmall onPress={() => navigation.navigate('ConditionsModal')} icon='allergies' buttonStyle={styles.headerButton} />
                    <HeaderButtonSmall onPress={() => navigation.navigate('RestModal')} icon='bed' buttonStyle={styles.headerButton} />
                    <HeaderButtonSmall onPress={() => navigation.navigate('DefensesModal')} icon='shield-alt' buttonStyle={styles.headerButton} />
                    <HeaderButtonSmall onPress={toggleInspiration} icon='lightbulb' buttonStyle={toggleInspirationStyle} />
                    
                </View>
                <View style={{alignItems: 'center', flex: 1}}>
                    <Pressable style={styles.collapseButton} onPress={toggleHeader}>
                        <Text style={styles.collapseButtonText}>{characterInfo.name}</Text>
                        <Text style={styles.collapseButtonText}> | Lvl {characterInfo.level} </Text>
                        <FontAwesome5 style={ styles.icon } name='angle-down' />
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
        borderBottomColor: '#4A0C05', 
        //borderBottomWidth: 2
    },
    collapseButton: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#4A0C05',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#4A0C05',
        alignItems: 'center'
    },
    collapseButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        //paddingHorizontal: 5
    },
    icon: {
        fontSize: 25, 
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
        backgroundColor: '#4A0C05',
        marginHorizontal: 20,
        width: '75%'
    }
})

export default HeaderCollapsed

