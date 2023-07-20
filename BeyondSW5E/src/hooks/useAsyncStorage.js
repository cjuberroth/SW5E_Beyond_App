import { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"

const useAsyncStorage = (key) => {
    const [data, setData] = useState(null)

    const getData = async () => {
        try {
            const storedData = await AsyncStorage.getItem(key)
            setData(storedData !== null ? JSON.parse(storedData) : null)
        } catch (error) {
            console.log('Error retrieving data from AsyncStorage: ', error)
        }
    }

    const storeData = async (value) => {
        try {
            const storedData = JSON.stringify(value)
            await AsyncStorage.setItem(key, storedData)
            setData(value)
        } catch (error) {
            console.log('Error storing data in AsyncStorage: ', error)
        }
    }
    
    useEffect(() => {
        getData()
    }, [])

    /* const initializeData = async (initialValue) => {
        try {
            const storedData = await AsyncStorage.getItem(key)
            if (storedData === null) {
                const initialData = JSON.stringify(initialValue)
                await AsyncStorage.setItem(key, initialData)
                setData(initialValue)
          }
        } catch (error) {
          console.log('Error initializing data in AsyncStorage: ', error)
        }
      } */
    
      return { data, storeData, /* initializeData */ }
}

export default useAsyncStorage