import { StyleSheet } from "react-native";

const tableStyles = StyleSheet.create({
    tableRow: {
        flexDirection: 'row',
        margin: 5
    },
    column: {
        fontSize: 15,
        color: 'white',
        paddingHorizontal: 10
    }
})

const globalStyles = StyleSheet.create({
    parentContainerView: {
        backgroundColor: '#263238',
        flex: 1
    }
})

export default { 
    tableStyles, 
    globalStyles 
}