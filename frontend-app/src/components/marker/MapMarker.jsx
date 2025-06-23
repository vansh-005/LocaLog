import React, { useContext } from 'react'
import { Marker } from 'react-map-gl'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { AuthContext } from '../../context/AuthContext'
import { LocationContext } from '../../context/LocationContext'

const MapMarker = () => {
    const { currentUser } = useContext(AuthContext)
    const { SetCurrentPlaceId, pins, recentPinId } = useContext(LocationContext)

    const handleMarkerClick = (id) => {
        SetCurrentPlaceId(id)
        console.log(`${id}`)
    }

    return (
        <>
            {pins.map((p) => (
                <Marker
                    key={p._id}
                    latitude={p.lat}
                    longitude={p.long}
                    anchor="bottom"
                    onClick={() => handleMarkerClick(p._id)}
                >
                    <LocationOnIcon
                        className={recentPinId === p._id ? 'new-pin-icon animate' : ''}
                        style={{
                            fontSize: 40,
                            color: p.username === currentUser ? 'tomato' : 'slateblue',
                            cursor: 'pointer',
                        }}
                    />
                </Marker>
            ))}
        </>
    )
}

export default MapMarker
