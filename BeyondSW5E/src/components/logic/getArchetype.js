
const getArchetype = (data) => {
    let archetypes = []
    for (let i = 0; i < data.classes.length; i++) {
        if (data.classes[i].archetype?.name) {
            archetypes.push(data.classes[i].archetype.name)
        }
    }
    return archetypes
}

export default getArchetype