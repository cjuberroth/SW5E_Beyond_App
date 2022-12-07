import React, { useContext, useState } from "react"
import { Text, View, StyleSheet, Pressable, Alert } from "react-native"
import { DataTable } from "react-native-paper"
import { Entypo } from '@expo/vector-icons'
import AppStyles from "../styles/AppStyles"
import CharacterContext from '../context/CharacterContext'

const EquipmentBlock = ({ category, equipment }) => {
	const {equippable, setEquippable} = useContext(CharacterContext)
	const [equippedState, setEquippedState] = useState(equipment)

	const toggleEquipped = (selectedItemIndex) => {
		let toggle = equippedState.map(el => (
			el.name === selectedItemIndex ? {...el, equipped: !el.equipped} : el
		))
		setEquippedState(toggle)
		setEquippable(toggle)
	}	

	//console.log(equippedState)
	//console.log(equippable)

	return (
		<View>
			<DataTable style={styles.dataTable}>
				<DataTable.Header style={[styles.tableHeaderRow, styles.tableRow]}>
					<DataTable.Title>
						<Text style={styles.tableTitle}>
							{category == null ? 'Miscellaneous' : category}
						</Text>
					</DataTable.Title>
				</DataTable.Header>
				{
					equippedState.map((item) => {
					//equipment.map((item) => {
						return (
							<DataTable.Row style={styles.tableRow} key={item.name}>
								<Pressable style={{ flex: 1, flexDirection: 'row' }} onPress={() => toggleEquipped(item.name)}>
									<DataTable.Cell style={styles.colItem}>
										<Text style={item.equipped ? styles.tableDataTextEquipped : styles.tableDataText}>{item.name}</Text>
									</DataTable.Cell>
									<DataTable.Cell style={styles.colCost}>
										<Text style={item.equipped ? styles.tableDataTextEquipped : styles.tableDataText}>{item.cost}</Text>
									</DataTable.Cell>
									<DataTable.Cell style={styles.colQty}>
										<Text style={ item.equipped ? styles.tableDataTextEquipped : styles.tableDataText}>{item.quantity}</Text>
									</DataTable.Cell>
								</Pressable>
								<DataTable.Cell style={styles.colInfo}>
									<Pressable onPress={() => Alert.alert('Equipment info modal')}>
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
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
	tableHeaderText: {
        fontWeight: 'bold'
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
        backgroundColor: 'gray'
    },
    tableRow: {
        borderBottomColor: 'gray', 
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
