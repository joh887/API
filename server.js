require('dotenv').config()

const express = require('express');
const app = express();
const mongo = require('./models/mongo');

app.use(express.json())

const patientRouter = require('./routes/patients')
const doctorRouter = require('./routes/doctors')

app.use('/patients', patientRouter)
app.use('/doctors',doctorRouter)

const port = process.env.PORT;
console.log(port)
app.listen(process.env.PORT, () => console.log('Server Started'))