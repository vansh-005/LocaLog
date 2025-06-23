import React, { lazy, useContext } from 'react'
import { Marker } from 'react-map-gl'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import {LocationContext} from "../../context/LocationContext"
import { AuthContext } from "../../context/AuthContext"
import { Dialog, DialogContent, DialogHeader, DialogBody } from '../ui/Dialog'
const NewPopupForm = lazy(() => import('../forms/newPopup/NewPopupForm'))

const UserMarkerPopup = () => {

    const { newPlace, SetNewPlace } = useContext(LocationContext)
    const { currentUser } = useContext(AuthContext)

    return (
        <div>
            {newPlace && currentUser && (
                <>
                    <Marker latitude={newPlace.lat} longitude={newPlace.long}>
                        <LocationOnIcon
                            style={{
                                fontSize: 40,
                                color: "tomato",
                                cursor: "pointer",
                            }}
                        />
                    </Marker>
                    <Dialog open onOpenChange={(open) => !open && SetNewPlace(null)}>
                        <DialogContent>
                            <DialogHeader>Add Review</DialogHeader>
                            <DialogBody>
                                <NewPopupForm />
                            </DialogBody>
                        </DialogContent>
                    </Dialog>

                </>
            )}
        </div>
    )
}

export default UserMarkerPopup
