import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'

const EquipmentDetailsModal = ({ route }) => {
    //currently doesn't take custom equipment into account
    //it will show some info, but not enough
    const navigation = useNavigation()
    
    //for enhanced items
    if (route.params.ehType) {

        const fixEhDescription = (description) => {
            return description.replace('_**Requires attunement**_', '').replace('_', '"')
        }

        return (
            <View style={ styles.modalContainer}>
                <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                <View style={ styles.modalInner }>
                    <View style={ styles.modalHeader }>
                        <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                            <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                        </Pressable>
                        <Text style={ styles.modalHeaderText}>Item Details</Text>
                    </View>
                    <View style={ styles.modalHeading }>
                        <Text style={ styles.modalHeading }>{route.params.name}</Text>
                    </View>
                    <View style={styles.modalStats}>
                        <Text style={styles.modalStatCol}>Equipped:</Text>
                        <Text style={styles.modalStatValueCol}>{route.params.equipped ? 'Yes' : 'No'}</Text>
                    </View>
                    { route.params.custom === true ?
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>**Custom Equipment</Text>
                        </View>
                    :
                        <></>
                    }
                    <View style={styles.modalStats}>
                        <Text style={styles.modalStatCol}>Item Type:</Text>
                        <Text style={styles.modalStatValueCol}>{route.params.ehType}</Text>
                    </View>
                    <View style={styles.modalStats}>
                        <Text style={styles.modalStatCol}>Subtype:</Text>
                        <Text style={styles.modalStatValueCol}>{route.params.ehSubtype}</Text>
                    </View>
                    <View style={styles.modalStats}>
                        <Text style={styles.modalStatCol}>Rarity:</Text>
                        { route.params.ehPrereq ? <Text style={styles.modalStatValueCol}>Yes</Text>
                        : <Text style={styles.modalStatValueCol}>No</Text>}
                    </View>
                    <View style={styles.modalStats}>
                        <Text style={styles.modalStatCol}>Requires Attunement:</Text>
                        { route.params.ehAttunement ? <Text style={styles.modalStatValueCol}>Yes</Text>
                        : <Text style={styles.modalStatValueCol}>No</Text>}
                    </View>
                    { route.params.ehDescription != null ? <Text style={styles.modalDescriptionText}>{fixEhDescription(route.params.ehDescription)}</Text>
                        : <Text style={styles.modalDescriptionText}>Description: None</Text>}
                </View>
            </View>
        )
    }
    
    //for regular equipment
    if (route.params.eqCategory === 'Armor') {
        return (
            <View style={ styles.modalContainer}>
                <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                <View style={ styles.modalInner }>
                    <View style={ styles.modalHeader }>
                        <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                            <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                        </Pressable>
                        <Text style={ styles.modalHeaderText}>Item Details</Text>
                    </View>
                    <View style={ styles.modalHeading }>
                        <Text style={ styles.modalHeading }>{route.params.name} - {route.params.eqCategory}</Text>
                    </View>
                    <View style={[styles.modalStats, {marginBottom: 10}]}>
                        <Text>Cost: {route.params.eqCost}</Text>
                        <Text>Weight: {route.params.eqWeight}</Text>
                    </View>
                    <View style={styles.modalStats}>
                        <Text style={styles.modalStatCol}>Equipped:</Text>
                        <Text style={styles.modalStatValueCol}>{route.params.equipped ? 'Yes' : 'No'}</Text>
                    </View>
                    { route.params.custom === true ?
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>**Custom Equipment</Text>
                        </View>
                    :
                        <></>
                    }
                    { route.params.eqArmorType ? 
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>Armor Classification:</Text>
                            <Text style={styles.modalStatValueCol}>{route.params.eqArmorType}</Text>
                        </View> : <View></View> }
                    { route.params.eqArmorAC ?
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>Armor Class:</Text>
                            <Text style={styles.modalStatValueCol}>{route.params.eqArmorAC}</Text>
                        </View> : <View></View> }
                    { route.params.eqArmorStealth ?
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>Stealth Disadvantage:</Text>
                            { route.params.eqArmorStealth ? <Text style={styles.modalStatValueCol}>Yes</Text>
                            : <Text style={styles.modalStatValueCol}>No</Text>}
                        </View> : <View></View> }
                    { route.params.eqProperty ?
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>Properties:</Text>
                            <Text style={styles.modalStatValueCol}>{route.params.eqProperty.map(el => el).join(', ')}</Text>
                        </View> : <View></View> }
                    { route.params.eqDescription != null ? <Text style={styles.modalDescriptionText}>{route.params.eqDescription}</Text>
                        : <Text style={styles.modalDescriptionText}>Description: None</Text>}
                </View>
            </View>
        )
    } else if (route.params.eqCategory === 'Weapon') {
        return (
            <View style={ styles.modalContainer}>
                <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                <View style={ styles.modalInner }>
                    <View style={ styles.modalHeader }>
                        <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                            <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                        </Pressable>
                        <Text style={ styles.modalHeaderText}>Item Details</Text>
                    </View>
                    <View style={ styles.modalHeading }>
                        <Text style={ styles.modalHeading }>{route.params.name} - {route.params.eqCategory}</Text>
                    </View>
                    <View style={[styles.modalStats, {marginBottom: 10}]}>
                        <Text>Cost: {route.params.eqCost}</Text>
                        <Text>Weight: {route.params.eqWeight}</Text>
                    </View>
                    <View style={styles.modalStats}>
                        <Text style={styles.modalStatCol}>Equipped:</Text>
                        <Text style={styles.modalStatValueCol}>{route.params.equipped ? 'Yes' : 'No'}</Text>
                    </View>
                    { route.params.custom === true ?
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>**Custom Equipment</Text>
                        </View>
                    :
                        <></>
                    }
                    { route.params.customToHit ?
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>To Hit:</Text>
                            <Text style={styles.modalStatValueCol}>+{route.params.customToHit}</Text>
                        </View> 
                    : 
                        <View></View>
                    }
                    { route.params.customDamageDice && route.params.customDamageNumberOfDice ?
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>Damage:</Text>
                            <Text style={styles.modalStatValueCol}>{route.params.customDamageNumberOfDice}d{route.params.customDamageDice} {route.params.eqWeaponDamageType}</Text>
                        </View> 
                    : 
                        <View></View>
                    }
                    { route.params.eqWeaponType ? 
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>Weapon Classification:</Text>
                            <Text style={styles.modalStatValueCol}>{route.params.eqWeaponType}</Text>
                        </View> : <View></View> }
                    { route.params.eqWeaponDamageDieNumber && route.params.eqWeaponDamageDie && route.params.eqWeaponDamageType ? 
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>Damage:</Text>
                            <Text style={styles.modalStatValueCol}>{route.params.eqWeaponDamageDieNumber}d{route.params.eqWeaponDamageDie} {route.params.eqWeaponDamageType}</Text>
                        </View> : <View></View> }
                    { route.params.eqProperty ? 
                        <View style={styles.modalStats}>
                            <Text style={styles.modalStatCol}>Properties:</Text>
                            <Text style={styles.modalStatValueCol}>{route.params.eqProperty.map(el => el).join(', ')}</Text>
                        </View> : <View></View> }
                    { route.params.eqDescription != null ? <Text style={styles.modalDescriptionText}>{route.params.eqDescription}</Text>
                        : <Text style={styles.modalDescriptionText}>Description: None</Text>}
                </View>
            </View>
        )
    } else { //if it's not a weapon or armor, it's adventuring gear
        return (
            <View style={ styles.modalContainer}>
                <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                <View style={ styles.modalInner }>
                    <View style={ styles.modalHeader }>
                        <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                            <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                        </Pressable>
                        <Text style={ styles.modalHeaderText}>Item Details</Text>
                    </View>
                    <View style={ styles.modalHeading }>
                        <Text style={ styles.modalHeading }>{route.params.name} - {route.params.eqCategory}</Text>
                    </View>
                    <View style={[styles.modalStats, {marginBottom: 10}]}>
                        <Text>Cost: {route.params.eqCost}</Text>
                        <Text>Weight: {route.params.eqWeight}</Text>
                    </View>
                    { route.params.eqDescription != null ? <Text style={styles.modalDescriptionText}>{route.params.eqDescription}</Text>
                        : <Text style={styles.modalDescriptionText}>Description: None</Text>}
                </View>
            </View>
        )
    }
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
    modalDescriptionText: {
        marginTop: 10
    },
    modalCloseButton: {
        fontSize: 25, 
        color: 'black',
    },
    modalHeading: {
        alignItems: 'center',
        fontSize: 25,
        paddingVertical: 5
    },
    modalStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 1
    },
    modalStatCol: {
        flex: 2
    },
    modalStatValueCol: {
        flex: 2
    },
})

export default EquipmentDetailsModal