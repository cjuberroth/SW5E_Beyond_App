import { useState } from 'react'
import { AsyncStorage } from 'react-native'

const useSettings = (key) => {
    const [value, setValue] = useState(null)

    const getData = async () => {
        try {
            const data = await AsyncStorage.getItem(key)
            if (data !== null) {
                setValue(data)
                console.log('Value retrieved successfully: ', data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setData = async (data) => {
        try {
            await AsyncStorage.setItem(key, data)
            setValue(data)
            console.log('Value saved successfully: ' + key)
        } catch (error) {
            console.log(error)
        }
    }

    const removeData = async () => {
        try {
            await AsyncStorage.removeItem(key)
            setValue(null)
        } catch (error) {
            console.log(error)
        }
    }

    return [value, setData, removeData, getData]
}

export default useSettings