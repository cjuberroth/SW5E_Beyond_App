import React, { useContext } from "react"
import { Text, View, StyleSheet, Alert } from "react-native"
import { DataTable } from "react-native-paper"
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import AppStyles from "../styles/AppStyles"
import CharacterContext from '../context/CharacterContext'
import SelectDropdown from 'react-native-select-dropdown'

const InventoryBlock = ({ category, equipment }) => {
	const { equippable, setEquippable } = useContext(CharacterContext)
	const getCharacterAC = useContext(CharacterContext).characterEquipment.getCharacterAC
	const { armorProfs } = useContext(CharacterContext)
	const { armorProficient } = useContext(CharacterContext)
	const navigation = useNavigation()
	const actions = ['View Info', 'Manage Carry', 'Equip/Unequip', 'Remove']

	const handleActions = (action, item) => {
		switch (action) {
			case 'View Info':
				showItemDetails(item)
				break
			case 'Manage Carry':
				navigation.navigate('CarryModal', {
					name: item.name,
					quantity: item.quantity,
					carriedQuantity: item.carriedQuantity,
					weight: item.weight
				})
				break
			case 'Equip/Unequip':
				toggleEquipped(item.name, item.carried)
				break
			case 'Remove':
				Alert.alert('Coming Soon', 'Removal of items from inventory is not yet supported.')
				break
		}
	}
	
	const toggleEquipped = (selectedItemIndex, carry) => {
		if (carry === false) {
			Alert.alert('Not Carried', 'You cannot equip an item you are not carrying.')
			return
		}
		let toggle = equippable.map(el => (
			el.name === selectedItemIndex ? {...el, equipped: !el.equipped} : el
		))
		if (getCharacterAC(toggle) === 'OverArmored') {
			return
		}
		setEquippable(toggle)
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
					equippable.map((item) => {
						if (item.equipmentCategory === category) {
							return (
								<DataTable.Row style={styles.tableRow} key={item.name}>
									<DataTable.Cell style={styles.colItem}>
										{ item.equipped === true ?
											<FontAwesome5 name='user-shield' color={'#444'} size={14} />
											:
											<Text></Text>
										}
										{ item.custom === true ? 
											<Text style={styles.tableDataText}> **{item.name} </Text>
											:
											<Text style={styles.tableDataText}> {item.name} </Text>
										}
									</DataTable.Cell>
									<DataTable.Cell style={styles.colQty}>
										<Text style={styles.tableDataText}>x{item.quantity}</Text>
									</DataTable.Cell>
									<SelectDropdown
										data={actions}
										defaultButtonText='Actions'
										buttonStyle={styles.dropdown1BtnStyle}
										buttonTextStyle={styles.dropdown1BtnTxtStyle}
										renderDropdownIcon={isOpened => {
											return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={14} />;
										}}
										dropdownIconPosition={'right'}
										dropdownStyle={styles.dropdown1DropdownStyle}
										rowStyle={styles.dropdown1RowStyle}
										rowTextStyle={styles.dropdown1RowTxtStyle}
										onSelect={(selectedItem) => {
											handleActions(selectedItem, item)
										}}
										buttonTextAfterSelection={() => {
											return 'Actions'
										}}
										rowTextForSelection={(item) => {
											return item
										}} />
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
        color: 'black'
    },
	tableDataTextEquipped: {
        fontSize: 14,
        color: 'black',
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
		fontSize: 12,
	},
	colQty: { 
		flex: 1, 
		fontSize: 12,
		justifyContent: 'center'
	},
	colCarry: { 
		flex: 2, 
		fontSize: 12,
		justifyContent: 'center',
		borderWidth: 1, 
		borderColor: 'red'
	},
	colInfo: { 
		flex: 1, 
		fontSize: 12,
		justifyContent: 'flex-end'
	},
	dropdown1BtnStyle: {
		flex: 3,
		height: '60%',
		backgroundColor: '#FFF',
		borderRadius: 5,
		//borderWidth: 1,
		//borderColor: '#444',
		alignSelf: 'center'
	},
	dropdown1BtnTxtStyle: {
		color: '#444', 
		textAlign: 'center', 
		fontSize: 14
	},
	dropdown1DropdownStyle: {
		backgroundColor: '#EFEFEF', 
		borderRadius: 5
	},
	dropdown1RowStyle: {
		backgroundColor: '#EFEFEF', 
		borderBottomColor: '#C5C5C5'
	},
	dropdown1RowTxtStyle: {
		color: '#444', 
		textAlign: 'left', 
		fontSize: 14
	},
})

export default InventoryBlock;

{/* <FontAwesome5 style={{fontSize: 15, color: 'white'}} name='fingerprint' /> */}