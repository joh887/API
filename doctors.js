const express = require('express')
const router = express.Router()
const Doctor = require('../models/doctor')


//Getting all
router.get('/', async (req,res) => {
    try{
        const doctors = await Doctor.find()
        res.json(doctors)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Getting One
router.get('/:id', getDoctor, (req,res) => {
    res.json(res.doctor)
})
//Creating One
router.post('/', async (req,res) => {
    const doctor = new Doctor({
        name: req.body.name,
        monday: req.body.monday,
        tuesday: req.body.tuesday,
        wednesday: req.body.wednesday,
        thursday: req.body.thursday,
        friday: req.body.friday
    })
    try{
        const newdoctor = await doctor.save()
        res.status(201).json(newdoctor)
    }catch (err){
        res.status(400).json({message: err.message})
    }

})
//Updating One
router.patch('/:id',getDoctor, async (req,res) => {
    if (req.body.name != null){
        res.doctor.name = req.body.name
    }
    if (req.body.monday != null){
        res.doctor.monday = req.body.monday
    }
    if (req.body.tuesday != null){
        res.doctor.tuesday = req.body.tuesday
    }
    if (req.body.wednesday != null){
        res.doctor.wednesday = req.body.wednesday
    }
    if (req.body.thursday != null){
        res.doctor.thursday = req.body.thursday
    }
    if (req.body.friday != null){
        res.doctor.friday = req.body.friday
    }
    try{
        const updatedDoctor = await res.doctor.save()
        res.json(updateddoctor)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Deleting One
router.delete('/:id', getDoctor, async (req,res) => {
    try{
        await res.doctor.remove()
        res.json({message: 'Deleted doctor'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getDoctor(req, res, next){
    let doctor
    try{
        doctor = await Doctor.findById(req.params.id)
        if(doctor == null){
            return res.status(404).json({message: 'Cannot find doctor'})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }
    res.doctor = doctor
    next()

}

module.exports = router