import React, { useContext } from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import CharacterContext from '../../context/CharacterContext'

const SkillDetailsModal = ({ route }) => {
    const navigation = useNavigation()
    const numberPresent = useContext(CharacterContext).functions.numberPresent

    const skillCheckDescription = (skill) => {
        switch (skill) {
            case 'Athletics':
                return 'Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming. Examples include the following activities:\n\nYou attempt to climb a sheer or slippery cliff, avoid hazards while scaling a wall, or cling to a surface while something is trying to knock you off.\nYou try to jump an unusually long distance or pull off a stunt midjump.\nYou struggle to swim or stay afloat in treacherous currents, storm-tossed waves, or areas of thick seaweed or another creature tries to push or pull you underwater or otherwise interfere with your swimming.'
            case 'Acrobatics':
                return 'Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking spaceship’s deck. The GM might also call for a Dexterity (Acrobatics) check to see if you can perform acrobatic stunts, including dives, rolls, somersaults, and flips.'
            case 'Sleight of Hand':
                return 'Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Dexterity (Sleight of Hand) check. The GM might also call for a Dexterity (Sleight of Hand) check to determine whether you can lift a wallet off another person or slip something out of another person’s pocket.'
            case 'Stealth':
                return 'Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.'
            case 'Investigation':
                return 'When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through ancient materials in search of a hidden fragment of knowledge might also call for an Intelligence (Investigation) check.'
            case 'Lore':
                return 'Your Intelligence (Lore) check measures your ability to recall information about the Force, artifacts, histories, and religions.'
            case 'Nature':
                return 'Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.'
            case 'Piloting':
                return 'Your Intelligence (Piloting) check measures your ability to control vehicles, aircraft, and spaceships. Piloting governs your ability to maneuver through tight spaces and debris fields or dogfight with enemy craft.'
            case 'Technology':
                return 'Your Intelligence (Technology) checks measure your ability to recall information about droids, vehicles, spaceships, aircraft, and computers, as well as your ability to interface with them. Technology can also be used to stabilize a droid or construct.'
            case 'Animal Handling':
                return 'When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal’s intentions, the GM might call for a Wisdom (Animal Handling) check. You also make a Wisdom (Animal Handling) check to control your mount when you attempt a risky maneuver.'
            case 'Insight':
                return 'Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone’s next move. Doing so involves gleaning clues from body language, speech habits, and changes in mannerisms.'
            case 'Medicine':
                return 'A Wisdom (Medicine) check lets you try to stabilize a dying companion or diagnose an illness.'
            case 'Perception':
                return 'Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses. For example, you might try to hear a conversation through a closed door, eavesdrop under an open window, or hear monsters moving stealthily in the forest. Or you might try to spot things that are obscured or easy to miss, whether they are orcs lying in ambush on a road, thugs hiding in the shadows of an alley, or candlelight under a closed secret door.'
            case 'Survival':
                return 'The GM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that rancors live nearby, predict the weather, or avoid quicksand and other natural hazards.'
            case 'Deception':
                return 'Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies. Typical situations include trying to fast-talk a guard, con a merchant, earn money through gambling, pass yourself off in a disguise, dull someone’s suspicions with false assurances, or maintain a straight face while telling a blatant lie.'
            case 'Intimidation':
                return 'When you attempt to influence someone through overt threats, hostile actions, and physical violence, the GM might ask you to make a Charisma (Intimidation) check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision.'
            case 'Performance':
                return 'Your Charisma (Performance) check determines how well you can delight an audience with music, dance. acting, storytelling, or some other form of entertainment.'
            case 'Persuasion':
                return 'When you attempt to influence someone or a group of people with tact, social graces, or good nature, the GM might ask you to make a Charisma (Persuasion) check. Typically, you use persuasion when acting in good faith, to foster friendships, make cordial requests, or exhibit proper etiquette. Examples of persuading others include convincing a Chamberlain to let your party see the king, negotiating peace between warring tribes, or inspiring a crowd of townsfolk.'
            default:
                return 'None'
        }
    }

    return (
        <View style={ styles.modalContainer}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' },]} onPress={navigation.goBack}/>
            <View style={ styles.modalInner }>
                <View style={ styles.modalHeader }>
                    <Pressable style={ styles.modalCloseButton } onPress={navigation.goBack} >
                        <FontAwesome5 style={ styles.modalCloseButton } name="window-close" />
                    </Pressable>
                    <Text style={ styles.modalHeaderText}>Skill Details</Text>
                </View>
                <Text style = { styles.heading }>{route.params.skillName}</Text>
                <View style={styles.modalStats}>
                    <Text style={styles.modalStatCol}>Proficiency:</Text>
                    <Text style={styles.modalStatValueCol}>{route.params.skillProficiency !== undefined ? route.params.skillProficiency : 'None'}</Text>
                </View>
                <View style={styles.modalStats}>
                    <Text style={styles.modalStatCol}>Modifier:</Text>
                    <Text style={styles.modalStatValueCol}>{numberPresent(route.params.charAttributeMod)}{route.params.charAttributeMod}</Text>
                </View>
                <View style={styles.modalStats}>
                    <Text style={styles.modalStatCol}>Base Attribute:</Text>
                    <Text style={styles.modalStatValueCol}>{route.params.baseAttribute}</Text>
                </View>
                <Text style = { styles.textStyle }>{skillCheckDescription(route.params.skillName)}</Text>
            </View>
        </View>
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
        //height: '85%',
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
    modalCloseButton: {
        fontSize: 25, 
        color: 'black',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    textStyle: {
        fontSize: 12,
        color: 'black',
        marginLeft: 10,
        marginTop: 10
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
    },
})

export default SkillDetailsModal