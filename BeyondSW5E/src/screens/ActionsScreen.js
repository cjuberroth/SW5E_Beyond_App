import React, { useContext } from 'react'
import { Text, View, StyleSheet, ImageBackground, ScrollView  } from 'react-native'
import CharacterContext from '../context/CharacterContext'
import Header from '../components/Header'
import HeaderCollapsed from '../components/HeaderCollapsed'
import HeaderContext from '../context/HeaderContext'
import AppStyles from '../styles/AppStyles'
import ActionCard from '../components/ActionCard'

const ActionsScreen = () => {
    const flexValue = useContext(HeaderContext).headerUtils.flexValue
    const headerCollapsed = useContext(HeaderContext).headerUtils.isCollapsed
    const {equippable, setEquippable} = useContext(CharacterContext)
    return (
        <View style={ styles.container }>
            <View style={styles.header}>
                {!headerCollapsed ? <Header /> : <HeaderCollapsed />}
            </View>
            <View style={{flex: flexValue}}>
                <ImageBackground style={ AppStyles.globalStyles.screenBackground }
                    source={ require('../../assets/header-background.jpg') }>
                    <View>
                        {
                            equippable.map((item) => {
                                //console.log(item.equipped && item.equipmentCategory=="Weapon")
                                if(item.equipped && item.equipmentCategory=="Weapon"){
                                    return (
                                        <ActionCard
                                            item={item}
                                            />
                                    )
                                }
                            })
                        }
                        <ActionCard 
                            item={{
                                name: 'Unarmed Strike',
                                damageDiceDieTypeEnum: 4,
                                damageNumberOfDice: 1,
                                damageType: 'Kinetic'
                            }}
                        />
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