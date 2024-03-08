import useAPI_DataStore from "../../stores/apiDataStore"

//Check if an object key has an empty value
export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

//Calculate mods
export const modifier = (ability) => {
    return Math.floor((ability-10)/2)
}

//determines if the given class is a force using class
export const isForceClass = (charClass) => {
    const { apiData } = useStore()
    for (let i = 0; i < apiData.classData.length; i++) {
        if (apiData.classData[i].name === charClass) {
            if (apiData.classData[i].levelChanges[1]["Force Powers Known"] != undefined) {
                return true
            } else {
                return false
            }
        }
    }
}

//determines if the given class is a tech using class
export const isTechClass = (charClass) => {
    const { apiData } = useAPI_DataStore()
    for (let i = 0; i < apiData.classData.length; i++) {
        if (apiData.classData[i].name === charClass) {
            if (apiData.classData[i].levelChanges[1]["Tech Powers Known"] != undefined) {
                return true
            } else {
                return false
            }
        }
    }
}

//present a number with a + sign if positive
export const numberPresent = (score) => {
    if (score >= 0) {
        return "+"
    } else {
        return
    }
}

//converts armor proficiency to correct case
export const getArmorProficiencies = (str) => {
    str = str.trim()
    const spaceIndex = str.indexOf(' ')
    if (spaceIndex !== -1) {
        let convertedString = str.replace(/\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
            })
        return convertedString.substring(0, spaceIndex)
    } else {
        return str
    }
}