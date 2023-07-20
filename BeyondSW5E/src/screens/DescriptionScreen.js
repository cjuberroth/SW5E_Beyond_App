import React, { useContext } from 'react'
import { Text, View, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import CharacterContext from '../context/CharacterContext'
//import SettingsContext from '../context/SettingsContext'
import { useSettingsContext } from '../context/SettingsContext'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles'

const DescriptionScreen = () => {
    const charInfo = useContext(CharacterContext).characterInformation
    const background = charInfo.background
    const characteristics = charInfo.characteristics
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
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
                    <ScrollView>
                        <Text style={ styles.headerStyle }>Background</Text>
                        <Text style={styles.chars}>{ background.name } | Feature: { background.feat.name }</Text>
                        <Text style={ styles.headerStyle }>Characteristics</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.chars, styles.header]}>Alignment: { characteristics.alignment }</Text>
                            <Text style={[styles.chars, styles.header]}>Place of Birth: { characteristics['Place of Birth'] }</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.chars, styles.header]}>Gender: { characteristics.Gender }</Text>
                            <Text style={[styles.chars, styles.header]}>Age: { characteristics.Age }</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.chars, styles.header]}>Height: { characteristics.Height }</Text>
                            <Text style={[styles.chars, styles.header]}>Weight: { characteristics.Weight }</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.chars, styles.header]}>Hair: { characteristics.Hair }</Text>
                            <Text style={[styles.chars, styles.header]}>Eyes: { characteristics.Eyes }</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.chars, styles.header]}>Skin: { characteristics.Skin }</Text>
                            <Text style={[styles.chars, styles.header]}>Apperance: { characteristics.Appearance }</Text>
                        </View>
                        <Text style={ styles.headerStyle }>Personality Traits</Text>
                        <Text style={styles.chars}>{ characteristics['Personality Traits'] }</Text>
                        <Text style={ styles.headerStyle }>Ideals</Text>
                        <Text style={styles.chars}>{ characteristics.Ideal }</Text>
                        <Text style={ styles.headerStyle }>Bonds</Text>
                        <Text style={styles.chars}>{ characteristics.Bond }</Text>
                        <Text style={ styles.headerStyle }>Flaws</Text>
                        <Text style={styles.chars}>{ characteristics.Flaw }</Text>
                        <Text style={ styles.headerStyle }>Backstory</Text>
                        <Text style={styles.chars}>{ characteristics.Backstory }</Text>
                    </ScrollView>
                    </ImageBackground>
                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chars: {
        fontSize: 16,
        color: 'white',
        padding: 4,
        marginHorizontal: 4
    },
    header: {
        flex: 1
    },
    headerStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10
    },
    imgBackground: {
        width: '100%',
        resizeMode: 'contain'
    },
})

export default DescriptionScreen