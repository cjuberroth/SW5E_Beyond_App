import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, TextInput } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import Header from '../components/header/Header'
import HeaderCollapsed from '../components/header/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
//import SettingsContext from '../context/SettingsContext'
import { useSettingsContext } from '../context/SettingsContext'
import AppStyles from '../styles/AppStyles'

const NotesScreen = () => {
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const [notes, setNotes] = useState('')
    const {emblem} = useSettingsContext()

    return (
        <View style = { AppStyles.globalStyles.parentContainerView }>
            <View style={ styles.header }>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                    source={ require('../../assets/starBackgroundVert.jpg') }>
                    <ImageBackground imageStyle={styles.imgBackground} 
                    //source={require('../../assets/rebel-alliance.png')}
                    source={emblem && {uri: emblem}}
                    >
                        <View style={styles.contentView}>
                            <Text style={styles.screenHeader}>Notes</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setNotes}
                                multiline={true}
                                returnKeyType='none'
                            />
                        </View>
                    </ImageBackground>
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
        borderColor: 'white',
        height: '100%',
        flex: 1,
        color: 'white',
        padding: 4,
        textAlignVertical: 'top'
    },
    contentView: {
        padding: 10,
        height: '100%'
    },
    screenHeader: {
        fontSize: 18,
        color: 'white'
    },
    imgBackground: {
        width: '100%',
        resizeMode: 'contain'
    },
})

export default NotesScreen