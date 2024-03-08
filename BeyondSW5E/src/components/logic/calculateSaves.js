

const calculateSaves = (data, classData, mods, charProf) => {
    const isEmpty = (obj) => {
		return Object.keys(obj).length === 0
	}

    if (!isEmpty(classData)) {
        for (let i = 0; i < classData.length; i++) {
            if (classData[i].name === data.classes[0].name) {
                var charSave = classData[i].savingThrows
            }
        }
    } else {
        console.log('classData is empty')
        return
    }

    //calculate saves
	if(charSave) {
		if (charSave.includes("Strength")) {
			var strSave = mods.str_mod + charProf
		} else {
			var strSave = mods.str_mod
		}
		if (charSave.includes("Dexterity")) {
			var dexSave = mods.dex_mod + charProf
		} else {
			var dexSave = mods.dex_mod
		}
		if (charSave.includes("Constitution")) {
			var conSave = mods.con_mod + charProf
		} else {
			var conSave = mods.con_mod
		}
		if (charSave.includes("Intelligence")) {
			var intSave = mods.int_mod + charProf
		} else {
			var intSave = mods.int_mod
		}
		if (charSave.includes("Wisdom")) {
			var wisSave = mods.wis_mod + charProf
		} else {
			var wisSave = mods.wis_mod
		}
		if (charSave.includes("Charisma")) {
			var chaSave = mods.cha_mod + charProf
		} else {
			var chaSave = mods.cha_mod
		}
	}

    return {
        strSave, dexSave, conSave, intSave, wisSave, chaSave, charSave
    }
}

export default calculateSaves