import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'

const PowerDetailModal = ({ route }) => {
    const navigation = useNavigation()
    
    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText}>Power Details</Text>
                </View>
                <View style={ styles.modalHeading }>
                    { route.params.level === 0 ?
                        <Text style={ styles.modalHeading }>{route.params.name} - At-will</Text>
                        : <Text style={ styles.modalHeading }>{route.params.name} - Level {route.params.level}</Text>
                    }
                </View>
                <View style={styles.modalStats}>
                    { route.params.powerType === "Force" ?
                        <>
                            <Text style={styles.modalStatCol}>Force Alignment:</Text>
                            <Text style={styles.modalStatValueCol}>{route.params.forceAlignment}</Text>
                        </>
                        : <></>
                    }
                </View>
                <View style={styles.modalStats}>
                    <Text style={styles.modalStatCol}>Casting Period:</Text>
                    <Text style={styles.modalStatValueCol}>{route.params.castingPeriod}</Text>
                </View>
                <View style={styles.modalStats}>
                    <Text style={styles.modalStatCol}>Range:</Text>
                    <Text style={styles.modalStatValueCol}>{route.params.range}</Text>
                </View>
                <View style={styles.modalStats}>
                    <Text style={styles.modalStatCol}>Duration:</Text>
                    <Text style={styles.modalStatValueCol}>{route.params.duration}</Text>
                </View>
                <View style={styles.modalStats}>
                    <Text style={styles.modalStatCol}>Concentration:</Text>
                    { route.params.concentration ? <Text style={styles.modalStatValueCol}>Yes</Text>
                    : <Text style={styles.modalStatValueCol}>No</Text>}
                </View>
                <View style={styles.modalStats}>
                    { route.params.powerType === 'Force' ?
                        <>
                            <Text style={styles.modalStatCol}>Prerequisite:</Text>
                            { route.params.hasPrereq ? <Text style={styles.modalStatValueCol}>{route.params.hasPrereq}</Text>
                            : <Text style={styles.modalStatValueCol}>None</Text>}
                        </>
                        : <></>
                    }
                </View>
                { route.params.description ? <Text style={styles.modalDescriptionText}>{route.params.description}</Text>
                    : <Text style={styles.modalDescriptionText}>Description: None</Text>}
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
    }
})

export default PowerDetailModal