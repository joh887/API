require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to Database'))

app.use(express.json())

const patientRouter = require('./routes/patients')
const doctorRouter = require('./routes/doctors')

app.use('/patients', patientRouter)
app.use('/doctors',doctorRouter)




app.listen(3000, () => console.log('Server Started'))