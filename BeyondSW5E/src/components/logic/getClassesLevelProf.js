
const getClassesLevelProf = (data) => {
//this function gets the level, proficiency, and classes

    let charLevel = []
    let charProf = 0
    let charClasses = []

    for (let i = 0; i < data.classes.length; i++) {
        charLevel.push(data.classes[i].levels)
        charClasses.push({class: data.classes[i].name, level: data.classes[i].levels})
    }

    charLevel = charLevel.reduce((a, b) => a + b, 0)

    //calculate proficiency based on character level
    charProf = Math.ceil(charLevel / 4) + 1

    return {
        level: charLevel,
        prof: charProf,
        classes: charClasses
    }
}

export default getClassesLevelProf