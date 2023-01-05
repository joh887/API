const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')


//Getting all
router.get('/', async (req,res) => {
    try{
        const Patients = await Patient.find()
        res.json(Patients)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Getting One
router.get('/:id', getPatient, (req,res) => {
    res.json(res.patient)
})
//Creating One
router.post('/', async (req,res) => {
    const patient = new Patient({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    })
    try{
        const newPatient = await patient.save()
        res.status(201).json(newPatient)
    }catch (err){
        res.status(400).json({message: err.message})
    }

})
//Updating One
router.patch('/:id',getPatient, async (req,res) => {
    if (req.body.name != null){
        res.patient.name = req.body.name
    }
    if (req.body.phoneNumber != null){
        res.patient.phoneNumber = req.body.phoneNumber
    }
    try{
        const updatedPatient = await res.patient.save()
        res.json(updatedPatient)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Deleting One
router.delete('/:id', getPatient, async (req,res) => {
    try{
        await res.patient.remove()
        res.json({message: 'Deleted patient'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getPatient(req, res, next){
    let patient
    try{
        patient = await Patient.findById(req.params.id)
        if(patient == null){
            return res.status(404).json({message: 'Cannot find patient'})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }
    res.patient = patient
    next()

}

module.exports = router