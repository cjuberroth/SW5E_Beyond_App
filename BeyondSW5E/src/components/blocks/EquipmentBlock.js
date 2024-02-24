import React, { useContext } from "react"
import { Text, View, StyleSheet, Pressable, Alert } from "react-native"
import { DataTable } from "react-native-paper"
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import AppStyles from "../../styles/AppStyles"
import CharacterContext from '../../context/CharacterContext'

const EquipmentBlock = ({ category, equipment }) => {
	const { equippable, setEquippable } = useContext(CharacterContext)
	const getCharacterAC = useContext(CharacterContext).characterEquipment.getCharacterAC
	const { armorProfs } = useContext(CharacterContext)
	const { armorProficient } = useContext(CharacterContext)
	const navigation = useNavigation()

	/* const toggleEquipped = (selectedItemIndex) => {
		let toggle = equippable.map(el => (
			el.name === selectedItemIndex ? {...el, equipped: !el.equipped} : el
		))
		if (getCharacterAC(toggle) === 'OverArmored') {
			return
		}

		setEquippable(toggle)
	} */

	const toggleEquipped = (selectedItemIndex) => {
		let toggle = equippable.map(el => {
			if (el.name === selectedItemIndex) {
				if (el.equipmentCategory === 'Armor' || el.equipmentCategory === 'Weapon') {
					return {...el, equipped: !el.equipped}
				} else {
					return el
				}
			} else {
				return el
			}
		})
		if (getCharacterAC(toggle) === 'OverArmored') {
			return
		}

		setEquippable(toggle)
	}

	const getProficiency = (item) => {
		if (armorProfs.has(item.armorClassification) && item.equipmentCategory === 'Armor' || item.armorClassification === 'Shield') {
			return true
		} else {
			return false
		}
	}

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
			customDamageType: item.damageType,
			proficiency: getProficiency(item)
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
					equippable.map((item) => {
						if (item.equipmentCategory === category) {
							return (
								<DataTable.Row style={styles.tableRow} key={item.name}>
									<DataTable.Cell style={styles.colItem}>
										{ getProficiency(item) ? 
											<View style={{flex: 1, flexDirection: 'row', marginTop: 0}}>
												<FontAwesome5 name='arrow-circle-up' color={'white'} size={14} />
												<Text> </Text>
											</View>
										:
											<Text></Text>
										}
										{ item.carried === true ?
											item.equipped === true ?
												item.custom === true ?
													<Pressable style={{flex: 1, flexDirection: 'row'}} onPress={() => toggleEquipped(item.name)}>
														<FontAwesome5 name='user-shield' color='white' size={14} />
														<Text style={styles.tableDataText}> **{item.name}</Text>
													</Pressable>
												:
													<Pressable style={{flex: 1, flexDirection: 'row'}} onPress={() => toggleEquipped(item.name)}>
														<FontAwesome5 name='user-shield' color='white' size={14} />
														<Text style={styles.tableDataText}> {item.name}</Text>
													</Pressable>
											:
												item.custom === true ?
													<Pressable style={{flex: 1, flexDirection: 'row'}} onPress={() => toggleEquipped(item.name)}>
														<Text style={styles.tableDataText}>**{item.name} </Text>
													</Pressable>
												:
													<Pressable style={{flex: 1, flexDirection: 'row'}} onPress={() => toggleEquipped(item.name)}>
														<Text style={styles.tableDataText}>{item.name} </Text>
													</Pressable>
										:
											item.custom === true ?
												<Text style={styles.tableDataText}>**{item.name} </Text>
											:
												<Text style={styles.tableDataText}>{item.name} </Text>
										}
									</DataTable.Cell>
									<DataTable.Cell style={styles.colQty}>
										<Text style={ styles.tableDataText}>x{item.carriedQuantity}</Text>
									</DataTable.Cell>
									<DataTable.Cell style={styles.colQty}>
										<Text style={ styles.tableDataText}>{item.weight}lb </Text>
										{ item.carried === true ? 
											<FontAwesome5 name='suitcase' color='white' size={14} />
										:
											<></>
										}
									</DataTable.Cell>
									<DataTable.Cell style={styles.colInfo}>
										<Pressable onPress={() => showItemDetails(item)}>
											<Entypo style={{fontSize: 20, color: 'white'}} name='info-with-circle' />
										</Pressable>
									</DataTable.Cell>
								</DataTable.Row>
							);
						}
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
		flex: 4, 
		fontSize: 12,
		marginTop: 5
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
		marginTop: 5,
		justifyContent: 'flex-end'
	},
})

export default EquipmentBlock;

{/* <FontAwesome5 style={{fontSize: 15, color: 'white'}} name='fingerprint' /> */}