import React, { useState, useContext } from 'react'
import apiRequest from '../../../lib/ApiReqest'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

import {LocationContext} from "../../../context/LocationContext"
import { AuthContext } from "../../../context/AuthContext"

const NewPopupForm = () => {

    const { pins, SetPins,newPlace,SetNewPlace, SetRecentPinId } = useContext(LocationContext)
    const { currentUser} = useContext(AuthContext)

    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [star, setStar] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPin = {
            username: currentUser,
            title,
            desc,
            rating: star,
            lat: newPlace.lat,
            long: newPlace.long,
        }

        try {
            const res = await apiRequest.post("/api/pins", newPin)
            SetPins([...pins, res.data])
            SetRecentPinId(res.data._id)
            SetNewPlace(null)
        } catch (err) {
            console.log("an error Occured")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <Input
                    placeholder="Enter a title"
                    autoFocus
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <Textarea
                    placeholder="Say us something about this place."
                    value={desc || ''}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <div className="star-selector">
                    {[1,2,3,4,5].map((i) => (
                        <span key={i} onClick={() => setStar(i)}>
                            {star >= i ? <StarIcon className="star-icon filled" /> : <StarBorderIcon className="star-icon" />}
                        </span>
                    ))}
                </div>
                <button type="submit" className="submitButton">
                    Add Pin
                </button>
            </form>
        </div>
    )
}

export default NewPopupForm
