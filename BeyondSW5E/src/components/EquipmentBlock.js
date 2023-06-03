import React, { useContext, useState } from "react"
import { Text, View, StyleSheet, Pressable } from "react-native"
import { DataTable, Button } from "react-native-paper"
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import AppStyles from "../styles/AppStyles"
import CharacterContext from '../context/CharacterContext'

const EquipmentBlock = ({ category, equipment }) => {
	const { setEquippable } = useContext(CharacterContext)
	const getCharacterAC = useContext(CharacterContext).characterEquipment.getCharacterAC
	const { armorProfs } = useContext(CharacterContext)
	const { armorProficient } = useContext(CharacterContext)
	const { carriedWeight, setCarriedWeight } = useContext(CharacterContext)
	const [equippedState, setEquippedState] = useState(equipment)
	const [selectedRows, setSelectedRows] = useState([])
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

	const handleCarry = (rowId) => {
		setSelectedRows((prevSelectedRows) => {
			if (prevSelectedRows.includes(rowId)) {
				return prevSelectedRows.filter((id) => id !== rowId)
			} else {
				return [...prevSelectedRows, rowId]
			}
		})
		let toggle = equippedState.map(el => (
            el.name === rowId ? {...el, carried: !el.carried, equipped: false} : el
        ))
		let tempWeight = 0
		equippedState.map(el => {
			if (el.name === rowId) {
				if (el.weight !== undefined) {
					if (el.carried === true) {
							tempWeight = -(parseFloat(el.weight)) * el.quantity
						} else {
							tempWeight = parseFloat(el.weight) * el.quantity
					}
				}
			}
		})
		setCarriedWeight(carriedWeight + tempWeight)
		getCharacterAC(toggle)
        setEquippable(toggle)
		setEquippedState(toggle)
	}

	//console.log(equippable)

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
			equipped: item.equipped,
			custom: item.custom,
			customToHit: item.tweaks?.toHit?.override,
			customDamageDice: item.tweaks?.damageDice?.dieSize,
			customDamageNumberOfDice: item.damageNumberOfDice,
			customDamageType: item.damageType
		})
	}

	return (
		<View>
			<DataTable>
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
									<DataTable.Cell style={styles.colItem}>
										{ item.custom === true ? (
											item.carried === true ? (
												<Pressable style={{flex: 1, flexDirection: 'row'}} onPress={() => toggleEquipped(item.name)}>
													<Text style={item.equipped ? styles.tableDataTextEquipped : styles.tableDataText}>**{item.name} </Text>
												</Pressable>
											) : (
												<Text style={styles.tableDataText}>**{item.name} </Text>
												)
										) : (
											item.carried === true ? (
												<Pressable style={{flex: 1, flexDirection: 'row'}} onPress={() => toggleEquipped(item.name)}>
													<Text style={item.equipped ? styles.tableDataTextEquipped : styles.tableDataText}>{item.name} </Text>
												</Pressable>
											) : (
												<Text style={styles.tableDataText}>{item.name} </Text>
												)
										)}
									</DataTable.Cell>
									<DataTable.Cell style={styles.colQty}>
										<Text style={ item.equipped ? styles.tableDataTextEquipped : styles.tableDataText}>x{item.quantity}</Text>
									</DataTable.Cell>
								<DataTable.Cell style={styles.colCarry}>
									<Button color='black'
										labelStyle={{fontSize: 12}}
										mode='contained'
										onPress={() => handleCarry(item.name)}
										compact='true'
									>
										{selectedRows.includes(item.name) ? 'Take' : 'Drop'}
									</Button>
								</DataTable.Cell>
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
		flexDirection: 'row'
    },
	colItem: { 
		flex: 5, 
		fontSize: 12
	},
	colQty: { 
		flex: 1, 
		fontSize: 12,
		justifyContent: 'center'
	},
	colCarry: { 
		flex: 2, 
		fontSize: 12,
		justifyContent: 'center'
	},
	colInfo: { 
		flex: 1, 
		fontSize: 12,
		justifyContent: 'flex-end'
	},
})

export default EquipmentBlock;

{/* <FontAwesome5 style={{fontSize: 15, color: 'white'}} name='fingerprint' /> */}