import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'

const ActionDetailsModal = ({ route }) => {
    //currently doesn't take custom equipment into account
    //it will show some info, but not enough
    const navigation = useNavigation()

    switch(route.params.actionName){
        case 'ATTACK':
            return (
                <View style={ styles.modalContainer}>
                    <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                    <View style={ styles.modalInner }>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Action Details</Text>
                        </View>
                        <View style={ styles.modalHeading }>
                            <Text style={ styles.modalHeading }>{route.params.actionName}</Text>
                        </View>
                        <Text style={styles.modalDescriptionText}>
                            The most common action to take in combat is the Attack action, whether you are swinging a vibrosword, firing a blaster, or brawling with your fists. With this action, you make one melee or ranged attack. See the “Making an Attack” section for the rules that govern attacks.
                            {'\n\n'}
                            Certain features, such as the Extra Attack class feature, allow you to make more than one attack with this action.
                        </Text>
                    </View>
                </View>
            )
            break;
        case 'CAST':
            return (
                <View style={ styles.modalContainer}>
                    <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                    <View style={ styles.modalInner }>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Action Details</Text>
                        </View>
                        <View style={ styles.modalHeading }>
                            <Text style={ styles.modalHeading }>{route.params.actionName}</Text>
                        </View>
                        <Text style={styles.modalDescriptionText}>
                            Force- and tech-casters such as consulars and engineers, as well as many creatures, have access to powers and can use them to great effect in combat. Each power has a casting time, which specifies whether the caster must use an action, a reaction, minutes, or even hours to cast the power. Casting a power is, therefore, not necessarily an action. Most powers do have a casting time of 1 action, so a force- or tech-caster often uses his or her action in combat to cast such a power. See chapter 10 for the rules on force- and tech-casting.
                        </Text>
                    </View>
                </View>
            )
            break;
        case 'DASH':
            return (
                <View style={ styles.modalContainer}>
                    <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                    <View style={ styles.modalInner }>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Action Details</Text>
                        </View>
                        <View style={ styles.modalHeading }>
                            <Text style={ styles.modalHeading }>{route.params.actionName}</Text>
                        </View>
                        <Text style={styles.modalDescriptionText}>
                            When you take the Dash action, you gain extra movement for the current turn. The increase equals your speed, after applying any modifiers. With a speed of 30 feet, for example, you can move up to 60 feet on your turn if you dash.
                            {'\n\n'}
                            Any increase or decrease to your speed changes this additional movement by the same amount. If your speed of 30 feet is reduced to 15 feet, for instance, you can move up to 30 feet this turn if you Dash.
                        </Text>
                    </View>
                </View>
            )
            break;
        case 'DISENGAGE':
            return (
                <View style={ styles.modalContainer}>
                    <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                    <View style={ styles.modalInner }>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Action Details</Text>
                        </View>
                        <View style={ styles.modalHeading }>
                            <Text style={ styles.modalHeading }>{route.params.actionName}</Text>
                        </View>
                        <Text style={styles.modalDescriptionText}>
                            If you take the Disengage action, your movement doesn’t provoke opportunity attacks for the rest of the turn.
                        </Text>
                    </View>
                </View>
            )
            break;
        case 'DODGE':
            return (
                <View style={ styles.modalContainer}>
                    <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                    <View style={ styles.modalInner }>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Action Details</Text>
                        </View>
                        <View style={ styles.modalHeading }>
                            <Text style={ styles.modalHeading }>{route.params.actionName}</Text>
                        </View>
                        <Text style={styles.modalDescriptionText}>
                            When you take the Dodge action, you focus entirely on avoiding attacks. Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage. You lose this benefit if you are incapacitated (as explained in appendix A) or if your speed drops to 0.
                        </Text>
                    </View>
                </View>
            )
            break;
        case 'GUARD':
            return (
                <View style={ styles.modalContainer}>
                    <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                    <View style={ styles.modalInner }>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Action Details</Text>
                        </View>
                        <View style={ styles.modalHeading }>
                            <Text style={ styles.modalHeading }>{route.params.actionName}</Text>
                        </View>
                        <Text style={styles.modalDescriptionText}>
                            You can defend an ally within 5 feet of you. When you take the Guard action, you focus entirely on preventing attacks from reaching your ally. Until the start of your next turn, any attack roll made against the guarded ally has disadvantage if you can see the attacker, as long as the ally is within 5 feet of you.
                            {'\n\n'}
                            Additionally, if an attack would hit the guarded ally, you can instead have it hit you (no action required). If you do so, the attacker chooses the maximum amount of damage instead of rolling.
                        </Text>
                    </View>
                </View>
            )
            break;
        case 'HELP':
            return (
                <View style={ styles.modalContainer}>
                    <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                    <View style={ styles.modalInner }>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Action Details</Text>
                        </View>
                        <View style={ styles.modalHeading }>
                            <Text style={ styles.modalHeading }>{route.params.actionName}</Text>
                        </View>
                        <Text style={styles.modalDescriptionText}>
                            You can lend your aid to an ally in the completion of a task. When you take the Help action, the ally you aid gains advantage on the next ability check it makes to perform the task you are helping with, provided that it makes the check before the start of your next turn.
                            {'\n\n'}
                            Alternatively, you can aid an ally in attacking a creature within 5 feet of you. You feint, distract the target, or in some other way team up to make your ally’s attack more effective. If your ally attacks the target before your next turn, the first attack roll is made with advantage.
                        </Text>
                    </View>
                </View>
            )
            break;
        case 'HIDE':
            return (
                <View style={ styles.modalContainer}>
                    <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                    <View style={ styles.modalInner }>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Action Details</Text>
                        </View>
                        <View style={ styles.modalHeading }>
                            <Text style={ styles.modalHeading }>{route.params.actionName}</Text>
                        </View>
                        <Text style={styles.modalDescriptionText}>
                            When you take the Hide action, you make a Dexterity (Stealth) check in an attempt to hide, following the rules in chapter 7 for hiding. If you succeed, you gain certain benefits, as described in the “Unseen Attackers and Targets” section later in this chapter.
                        </Text>
                    </View>
                </View>
            )
            break;
        case 'READY':
            return (
                <View style={ styles.modalContainer}>
                    <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                    <View style={ styles.modalInner }>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Action Details</Text>
                        </View>
                        <View style={ styles.modalHeading }>
                            <Text style={ styles.modalHeading }>{route.params.actionName}</Text>
                        </View>
                        <Text style={styles.modalDescriptionText}>
                            Sometimes you want to get the jump on a foe or wait for a particular circumstance before you act. To do so, you can take the Ready action on your turn, which lets you act using your reaction before the start of your next turn.
                            {'\n\n'}
                            First, you decide what perceivable circumstance will trigger your reaction. Then, you choose the action you will take in response to that trigger, or you choose to move up to your speed in response to it. Examples include “If the soldier steps on the trapdoor, I’ll pull the lever that opens it,” and “If the gamorrean steps next to me, I move away.”
                            {'\n\n'}
                            When the trigger occurs, you can either take your reaction right after the trigger finishes or ignore the trigger. Remember that you can take only one reaction per round.
                            {'\n\n'}
                            When you ready a power, you cast it as normal but hold its energy, which you release with your reaction when the trigger occurs. To be readied, a power must have a casting time of 1 action, and holding onto the power’s effect requires concentration (explained in chapter 10). If your concentration is broken, the power dissipates without taking effect. For example, if you are concentrating on the knight speed power and ready shock, your knight speed power ends, and if you take damage before you release shock with your reaction, your concentration might be broken.
                        </Text>
                    </View>
                </View>
            )
            break;
        case 'SEARCH':
            return (
                <View style={ styles.modalContainer}>
                    <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                    <View style={ styles.modalInner }>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Action Details</Text>
                        </View>
                        <View style={ styles.modalHeading }>
                            <Text style={ styles.modalHeading }>{route.params.actionName}</Text>
                        </View>
                        <Text style={styles.modalDescriptionText}>
                            When you take the Search action, you devote your attention to finding something. Depending on the nature of your search, the GM might have you make a Wisdom (Perception) check or an Intelligence (Investigation) check.
                        </Text>
                    </View>
                </View>
            )
            break;
        case 'USE':
            return (
                <View style={ styles.modalContainer}>
                    <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
                    <View style={ styles.modalInner }>
                        <View style={ styles.modalHeader }>
                            <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                                <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                            </Pressable>
                            <Text style={ styles.modalHeaderText}>Action Details</Text>
                        </View>
                        <View style={ styles.modalHeading }>
                            <Text style={ styles.modalHeading }>{route.params.actionName}</Text>
                        </View>
                        <Text style={styles.modalDescriptionText}>
                            Many objects and items, such as grenades or medpacs, require your action to use. When an object requires your action for its use, you take the Use an Object action. If you would normally have to use your object interaction to draw the item you are using, you can instead do so as part of the Use an Object action.
                        </Text>
                    </View>
                </View>
            )
            break;
        default:
            break;
    }
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
        paddingVertical: 5,
        fontWeight: 'bold'
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

export default ActionDetailsModal