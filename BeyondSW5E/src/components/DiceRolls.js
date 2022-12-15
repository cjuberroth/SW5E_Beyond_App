import React from 'react'

const DiceRoll = (numDie, dieSides) => {
    const dieRoll = () => {
        return Math.floor(Math.random() * dieSides) + 1
    }

    if (numDie === 1) {
        return dieRoll()
    } else {

        var result = Array.from({length: numDie}, () => dieRoll())

        if (result.length === 1) {
            result = result.map(x => {
                return parseInt(x, 10)
            })
        }

        console.log(result)

        return result
    }
}

export default DiceRoll