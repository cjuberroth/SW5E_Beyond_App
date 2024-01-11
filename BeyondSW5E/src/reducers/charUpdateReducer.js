import { useContext } from "react"
import CharacterContext from "../context/CharacterContext"

export const INITIAL_STATE = useContext(CharacterContext)

export const charUpdateReducer = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}