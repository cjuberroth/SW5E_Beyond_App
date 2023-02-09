import React from 'react'

const DiceRoll = (numDie, dieSides) => {
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

        rolls.forEach(i => result += i)

        return result
    }
}

export default DiceRoll