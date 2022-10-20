import React, { useContext } from 'react'
import { Text, View, StyleSheet, ImageBackground, TextInput } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles'

const NotesScreen = () => {
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    return (
        <View style = { AppStyles.globalStyles.parentContainerView }>
            <View style={ styles.header }>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                    source={ require('../../assets/header-background.jpg') }>
                        <View style={styles.contentView}>
                            <Text style={styles.screenHeader}>Notes</Text>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                returnKeyType='none'
                            />
                        </View>
                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1
    },
    input: {
        borderWidth: 3,
        borderColor: '#4A0C05',
        height: '100%',
        flex: 1,
        color: 'white',
        padding: 4,
        textAlignVertical: 'top'
    },
    contentView: {
        padding: 10,
        flex: 1
    },
    screenHeader: {
        fontSize: 18,
        color: 'white'
    }
})

export default NotesScreen