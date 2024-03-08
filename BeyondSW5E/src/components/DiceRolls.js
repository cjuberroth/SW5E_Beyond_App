const DiceRoll = (numDie, dieSides, longPress) => {
    const dieRoll = () => {
        return Math.floor(Math.random() * dieSides) + 1
    }

    if (numDie === 1) {
        return dieRoll()
    } else {

        var rolls = Array.from({length: numDie}, () => dieRoll())

        if (rolls.length === 1) {
            rolls = rolls.map(x => {
                return parseInt(x, 10)
            })
        }

        var result = 0

        if(!longPress)
        {
            rolls.forEach(i => result += i)
        }
        else{
            return rolls.sort((a, b) => a - b)
        }

        return result
    }
}

export default DiceRoll