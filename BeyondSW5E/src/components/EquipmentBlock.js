import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import AppStyles from "../styles/AppStyles";
import Checkbox from "./CheckBox";

const EquipmentBlock = ({ category, equipment }) => {
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
					equipment.map((item) => {
						//const [checked, onChange] = useState(item.equipped)
						return (
							<DataTable.Row style={styles.tableRow} key={item.name}>
								<DataTable.Cell style={styles.colEquip}>
									{
										item.equipped != null
										? 	
											<Checkbox
												checked={item.equipped}
												//onChange={onChange}
												buttonStyle={styles.checkboxBase}
												activeButtonStyle={styles.checkboxChecked}
											/>
										:
											<Text></Text>
									}
								</DataTable.Cell>
								<DataTable.Cell style={styles.colItem}>
									<Text style={styles.tableDataText}>{item.name}</Text>
								</DataTable.Cell>
								<DataTable.Cell style={styles.colCost}>
									<Text style={styles.tableDataText}>{item.cost}</Text>
								</DataTable.Cell>
								<DataTable.Cell style={styles.colQty}>
									<Text style={styles.tableDataText}>{item.quantity}</Text>
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
    tableHeaderRow: {
        backgroundColor: 'gray'
    },
    tableRow: {
        borderBottomColor: 'gray'
    },
	colEquip: { 
		flex: 4, 
		fontSize: 12 
	},
	colItem: { 
		flex: 12, 
		fontSize: 12 
	},
	colQty: { 
		flex: 3, 
		fontSize: 12 
	},
	colCost: { 
		flex: 5, 
		fontSize: 12 
	},
	checkboxBase: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		borderWidth: 2,
		borderColor: "white",
		backgroundColor: "transparent"
	},
	checkboxChecked: {
		backgroundColor: "white"
	}
});

export default EquipmentBlock;
