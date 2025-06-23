import React, { useState, useContext} from 'react'
import apiRequest from '../../../lib/ApiReqest'
import { Card } from '../../ui/Card'
import { Input } from '../../ui/Input'

import {LocationContext} from "../../../context/LocationContext"
import { AuthContext } from "../../../context/AuthContext"

const NewPopupForm = () => {

    const { pins, SetPins,newPlace,SetNewPlace} = useContext(LocationContext)
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
            SetNewPlace(null)
        } catch (err) {
            console.log("an error Occured")
        }
    }

    return (
        <Card className="w-64 space-y-2">
            <form onSubmit={handleSubmit} className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                    placeholder="Enter a title"
                    autoFocus
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label className="text-sm font-medium">Description</label>
                <textarea
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    placeholder="Say us something about this place."
                    value={desc || ''}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <label className="text-sm font-medium">Rating</label>
                <select
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    value={star}
                    onChange={(e) => setStar(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white"
                >
                    Add Pin
                </button>
            </form>
        </Card>
    )
}

export default NewPopupForm
