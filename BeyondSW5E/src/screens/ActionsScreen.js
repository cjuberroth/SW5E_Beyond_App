import React, { useContext } from 'react'
import { Text, View, StyleSheet, ImageBackground, ScrollView, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CharacterContext from '../context/CharacterContext'
//import SettingsContext from '../context/SettingsContext'
import { useSettingsContext } from '../context/SettingsContext'
import Header from '../components/header/Header'
import HeaderCollapsed from '../components/header/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles'
import ActionCard from '../components/cards/ActionCard'

const ActionsScreen = () => {
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const {equippable, setEquippable} = useContext(CharacterContext)
    const charData = useContext(CharacterContext).character
    const charLevel = useContext(CharacterContext).characterInformation.level
    const {emblem} = useSettingsContext()
    const navigation = useNavigation()

    const showActionDetails = (action) => {
		navigation.navigate('ActionDetailsModal', {
			actionName: action	
		})
	}

    let unarmedDamageDie = 0

    //Determine if the character has any monk levels and what their unarmed strike damage should be if they are
    charData.classes.forEach(charClass => {
        if(charClass.name == 'Monk')
            unarmedDamageDie = Math.ceil(charClass.levels / 4) * 2 + 2
    });

    return (
        <View style={ styles.container }>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                    source={ require('../../assets/starBackgroundVert.jpg') }>
                    <ImageBackground imageStyle={styles.imgBackground}
                        source={emblem && {uri: emblem}}
                        >
                        <ScrollView>
                            <View>
                                {
                                    equippable.map((item, index) => {
                                        //console.log(item.equipped && item.equipmentCategory=="Weapon")
                                        if(item.equipped && item.equipmentCategory=="Weapon"){
                                            return (
                                                <ActionCard
                                                    key={index}
                                                    item={item}
                                                    />
                                            )
                                        }
                                    })
                                }
                                <ActionCard 
                                    item={{
                                        name: 'Unarmed Strike',
                                        damageDiceDieTypeEnum: unarmedDamageDie,
                                        damageNumberOfDice: 1,
                                        damageType: 'Kinetic',
                                        isMonk: unarmedDamageDie > 0
                                    }}
                                />
                            </View>
                            {/* TODO: This will need to be modified to be dynamically sized */}
                            <View style={styles.genericActionsView}>
                                <Text style={styles.genericActionHeader}>Actions in Combat</Text>
                                <View style={styles.genericActionsBlock}>
                                    <Pressable onPress={() => showActionDetails('ATTACK')}><Text style={styles.genericActionText}>Attack</Text></Pressable><Text style={styles.genericActionText}>*</Text>
                                    <Pressable onPress={() => showActionDetails('CAST')}><Text style={styles.genericActionText}>Cast</Text></Pressable><Text style={styles.genericActionText}>*</Text>
                                    <Pressable onPress={() => showActionDetails('DASH')}><Text style={styles.genericActionText}>Dash</Text></Pressable><Text style={styles.genericActionText}>*</Text>
                                    <Pressable onPress={() => showActionDetails('DISENGAGE')}><Text style={styles.genericActionText}>Disengage</Text></Pressable>
                                </View>
                                <View style={styles.genericActionsBlock}>
                                    <Pressable onPress={() => showActionDetails('DODGE')}><Text style={styles.genericActionText}>Dodge</Text></Pressable><Text style={styles.genericActionText}>*</Text>
                                    <Pressable onPress={() => showActionDetails('GUARD')}><Text style={styles.genericActionText}>Guard</Text></Pressable><Text style={styles.genericActionText}>*</Text>
                                    <Pressable onPress={() => showActionDetails('HELP')}><Text style={styles.genericActionText}>Help</Text></Pressable><Text style={styles.genericActionText}>*</Text>
                                    <Pressable onPress={() => showActionDetails('HIDE')}><Text style={styles.genericActionText}>Hide</Text></Pressable>
                                </View>
                                <View style={styles.genericActionsBlock}>
                                    <Pressable onPress={() => showActionDetails('READY')}><Text style={styles.genericActionText}>Ready</Text></Pressable><Text style={styles.genericActionText}>*</Text>
                                    <Pressable onPress={() => showActionDetails('SEARCH')}><Text style={styles.genericActionText}>Search</Text></Pressable><Text style={styles.genericActionText}>*</Text>
                                    <Pressable onPress={() => showActionDetails('USE')}><Text style={styles.genericActionText}>Use</Text></Pressable>
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#263238',
    },
    header: {
        flex: 1
    },
    genericActionsView: {
        flex: 1,
        alignItems: 'center'
    },
    genericActionsBlock: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'space-between',
        paddingTop: 2,
        paddingHorizontal: 5,
        justifyContent: 'center'
    },
    genericActionText: {
        fontSize: 20,
        color: 'white',
        padding: 4
    },
    genericActionHeader: {
        fontFamily: 'star-font',
        fontSize: 24,
        color: '#ffe81f',
        padding: 4,
        //textDecorationLine: 'underline'
    },
    imgBackground: {
        width: '100%',
        resizeMode: 'contain'
    },
})

export default ActionsScreen