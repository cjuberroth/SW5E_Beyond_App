import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Text>We have a project!</Text>
            <Button 
                title="Abilities"
                onPress={() => navigation.navigate('Abilities')}
            />
            <Button 
                title="Skills"
                onPress={() => navigation.navigate('Skills')}
            />
            <Button 
                title="Actions"
                onPress={() => navigation.navigate('Actions')}
            />
            <Button 
                title="Inventory"
                onPress={() => navigation.navigate('Inventory')}
            />
            <Button 
                title="Manage Inventory"
                onPress={() => navigation.navigate('ManageInventory')}
            />
            <Button 
                title="Force/Tech Powers"
                onPress={() => navigation.navigate('Spells')}
            />
            <Button 
                title="Manage Force/Tech Powers"
                onPress={() => navigation.navigate('ManageSpells')}
            />
            <Button 
                title="Features and Traits"
                onPress={() => navigation.navigate('Features')}
            />
            <Button 
                title="Proficiencies"
                onPress={() => navigation.navigate('Proficiencies')}
            />
            <Button 
                title="Description"
                onPress={() => navigation.navigate('Description')}
            />
            <Button 
                title="Notes"
                onPress={() => navigation.navigate('Notes')}
            />
            <Button 
                title="Test"
                onPress={() => navigation.navigate('Test')}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

export default HomeScreen
