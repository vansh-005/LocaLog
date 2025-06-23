import { createContext, useState } from "react"

export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {

    const [pins, setPins] = useState([])
    const [currentPlaceId, setCurrentPlaceId] = useState(null)
    const [newPlace, setNewPlace] = useState(null)
    const [recentPinId, setRecentPinId] = useState(null)

    const SetPins = (data) => {
        setPins(data)
    }
    const SetCurrentPlaceId = (data) => {
        setCurrentPlaceId(data)
    }
    const SetNewPlace = (data) => {
        setNewPlace(data)
    }
    const SetRecentPinId = (data) => {
        setRecentPinId(data)
    }

    return (
        <LocationContext.Provider value={{ pins,newPlace,currentPlaceId,recentPinId,SetPins , SetCurrentPlaceId, SetNewPlace, SetRecentPinId }}>
            {children}
        </LocationContext.Provider>
    )
}
