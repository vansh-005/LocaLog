const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Pin = require('./models/pin')

dotenv.config()

async function seed() {
  await mongoose.connect(process.env.MONGO_URL)

  const samplePins = [
    { username: 'demo', title: 'Colombo', desc: 'Capital city', rating: 4, long: 79.8612, lat: 6.9271 },
    { username: 'demo', title: 'Kandy', desc: 'Temple of the Tooth', rating: 5, long: 80.6337, lat: 7.2906 }
  ]

  await Pin.deleteMany({ username: 'demo' })
  for (const p of samplePins) {
    const pin = new Pin({
      ...p,
      location: { type: 'Point', coordinates: [p.long, p.lat] }
    })
    await pin.save()
  }
  console.log('Demo pins seeded')
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
