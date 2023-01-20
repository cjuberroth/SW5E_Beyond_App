import React, { useContext } from 'react'
import { Text, View, StyleSheet, ImageBackground, ScrollView  } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles'

const ActionsScreen = () => {
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const {equippable, setEquippable} = useContext(CharacterContext)
    console.log(equippable)
    return (
        <View style={ styles.container }>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                    source={ require('../../assets/header-background.jpg') }>
                    <View>
                        <Text>Actions Screen</Text>
                    </View>
                    <View>
                        <Text>List of equipped weapons</Text>
                        {
                            equippable.map((item) => {
                                //console.log(item.equipped && item.equipmentCategory=="Weapon")
                                if(item.equipped && item.equipmentCategory=="Weapon"){
                                    return (
                                        <View>
                                            <Text>{item.name}</Text>
                                        </View>
                                    )
                                }
                            })
                        }
                    </View>
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
})

export default ActionsScreen