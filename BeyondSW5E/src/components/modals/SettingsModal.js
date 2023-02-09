import React, { useContext } from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Select, SelectModalProvider } from '@mobile-reality/react-native-select-pro'
import CharacterContext from '../../context/CharacterContext'
import useSettings from '../../hooks/useSettings'
import factions from '../../../data/factions.json'

const SettingsModal = () => {
    const navigation = useNavigation()
    const [value, setData, removeData, getData] = useSettings()

    const handleSelect = (item) => {
        console.log(item.label)
    }

    return (
        <SelectModalProvider>
            <View style={styles.modalContainer}>
                <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                <View style={ styles.modalInner }>
                    <View style={ styles.modalHeader }>
                        <Pressable style={ styles.modalCloseButton } onPress={() => {navigation.goBack()}} >
                            <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                        </Pressable>
                        <Text style={ styles.modalHeaderText }>Settings</Text>
                    </View>
                    <View>
                        <Text style={styles.modalSubheadText}>Choose Alignment</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Pressable onPress={() => console.log('Light Side')}
                                style={styles.modalButtons}>
                                <Text style={{fontSize: 18}}>Light Side</Text>
                            </Pressable>
                            <Pressable onPress={() => console.log('Dark Side')}
                                style={styles.modalButtons}>
                                <Text style={{fontSize: 18}}>Dark Side</Text>
                            </Pressable>
                        </View>
                        <Text style={styles.modalSubheadText}>Choose Faction: </Text>
                        <View >
                            <Select options={factions}
                                clearable={true}
                                closeOptionsListOnSelect={true}
                                onSelect={handleSelect} />
                        </View>
                    </View>
                </View>
            </View>
        </SelectModalProvider>
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
        //height: '80%',
        width: '95%',
        backgroundColor: '#ECEFF1',
        //justifyContent: 'center',
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
    modalCloseButton: {
        fontSize: 25, 
        color: 'black',
    },
    modalSubheadText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        paddingBottom: 5
    },
    modalButtons: {
        paddingBottom: 5
    }
})

export default SettingsModal