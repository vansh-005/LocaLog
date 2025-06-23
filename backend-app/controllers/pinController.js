const Pin = require('../models/Pin')

exports.createPin = async (req, res) => {
    try {
    const newPin = new Pin({
        ...req.body,
        location: { type: 'Point', coordinates: [req.body.long, req.body.lat] }
    })
    const savedPin = await newPin.save()
        res.status(200).json(savedPin)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getAllPins = async (req, res) => {
    try {
        const pins = await Pin.find()
        res.status(200).json(pins)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getNearbyPins = async (req, res) => {
    try {
        const { lng, lat, distance = 1000 } = req.query
        const pins = await Pin.find({
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: parseInt(distance)
                }
            }
        })
        res.status(200).json(pins)
    } catch (err) {
        res.status(500).json(err)
    }
}
