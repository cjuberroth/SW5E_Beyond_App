import React, { useContext, useState } from "react"
import { Text, View, StyleSheet, Pressable, Alert } from "react-native"
import { DataTable } from "react-native-paper"
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import AppStyles from "../styles/AppStyles"
import CharacterContext from '../context/CharacterContext'

const EquipmentBlock = ({ category, equipment }) => {
	const {equippable, setEquippable} = useContext(CharacterContext)
	const getCharacterAC = useContext(CharacterContext).characterEquipment.getCharacterAC
	const {armorProfs} = useContext(CharacterContext)
	const {armorProficient} = useContext(CharacterContext)
	const [equippedState, setEquippedState] = useState(equipment)
	const navigation = useNavigation()

	const toggleEquipped = (selectedItemIndex) => {
		let toggle = equippedState.map(el => (
			el.name === selectedItemIndex ? {...el, equipped: !el.equipped} : el
		))
		if (getCharacterAC(toggle) === 'OverArmored') {
			return
		}
		setEquippable(toggle)
		setEquippedState(toggle)
	}	

	console.log(equippable)

	const showItemDetails = (item) => {
		navigation.navigate('EquipmentDetailsModal', {
			name: item.name,
			eqDescription: item.description,
			eqArmorType: item.armorClassification,
			eqProperty: item.properties,
    		eqCost: item.cost,
    		eqWeight: item.weight,
    		eqArmorAC: item.ac,
    		eqArmorStealth: item.stealthDisadvantage,
    		eqWeaponType: item.weaponClassification,
			eqWeaponDamageDieNumber: item.damageNumberOfDice,
    		eqWeaponDamageDie: item.damageDieType,
    		eqWeaponDamageType: item.damageType,
    		eqCategory: item.equipmentCategory,
    		ehType: item.type,
    		ehSubtype: item.subtype,
    		ehRarity: item.rarityText,
    		ehPrereq: item.hasPrerequisite,
    		ehAttunement: item.requiresAttunement,
    		ehDescription: item.text,
			customTweaks: item.tweaks,
			equipped: item.equipped
		})
	}

	return (
		<View>
			<DataTable style={styles.dataTable}>
				<DataTable.Header style={[styles.tableHeaderRow, styles.tableRow]}>
					<DataTable.Title>
						<Text style={styles.tableTitle}>
							{category == null ? 'miscellaneous' : category.toLowerCase()}
						</Text>
					</DataTable.Title>
				</DataTable.Header>
				{
					equippedState.map((item) => {
						return (
							<DataTable.Row style={styles.tableRow} key={item.name}>
								<Pressable style={{ flex: 1, flexDirection: 'row' }} onPress={() => toggleEquipped(item.name)}>
									<DataTable.Cell style={styles.colItem}>
										<Text style={item.equipped ? styles.tableDataTextEquipped : styles.tableDataText}>{item.name} </Text>
										{/* <FontAwesome5 style={{fontSize: 15, color: 'white'}} name='fingerprint' /> */}
									</DataTable.Cell>
									<DataTable.Cell style={styles.colQty}>
										<Text style={ item.equipped ? styles.tableDataTextEquipped : styles.tableDataText}>x{item.quantity}</Text>
									</DataTable.Cell>
								</Pressable>
								<DataTable.Cell style={styles.colInfo}>
									<Pressable onPress={() => showItemDetails(item)}>
										<Entypo style={{fontSize: 20, color: 'white'}} name='info-with-circle' />
									</Pressable>
								</DataTable.Cell>
							</DataTable.Row>
						);
					})
				}
			</DataTable>
		</View>
	);
};

const styles = StyleSheet.create({
	tableTitle: {
        //fontWeight: 'bold',
		fontFamily: 'star-font',
        fontSize: 20,
        color: '#ffe81f'
    },
    tableDataText: {
        fontSize: 12,
        color: 'white'
    },
	tableDataTextEquipped: {
        fontSize: 14,
        color: 'white',
		fontWeight: 'bold'
    },
    tableHeaderRow: {
        backgroundColor: 'rgba(52, 52, 52, 0.2)'
    },
    tableRow: {
        borderBottomColor: 'rgba(52, 52, 52, 0.8)', 
		flex: 1
    },
	colInfo: { 
		flex: .1, 
		fontSize: 12,
		justifyContent: 'center'
	},
	colItem: { 
		flex: 12, 
		fontSize: 12
	},
	colQty: { 
		flex: 2, 
		fontSize: 12
	},
	colCost: { 
		flex: 4, 
		fontSize: 12
	}
})

export default EquipmentBlock;
