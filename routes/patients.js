const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')
const Doctor = require('../models/doctor')

//Getting all
router.get('/', async (req,res) => {
    try{
        const Patients = await Patient.find()
        res.json(Patients)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})


//Check the aligibility of the Doctor
// Question How can I use /:id/:somethingElse?
router.get('/:id/availability', getPatient, async (req,res) => { 
    try {
      const chosen_doctor = await Doctor.findOne({ name: res.patient.doctor });
      if (!chosen_doctor) {
        res.status(404).json({ message: 'Doctor not found' });
        return;
      }
      const chosen_date = res.patient.prefered_date;
      if (!chosen_doctor[chosen_date]) {
        res.json({ message: 'Doctor available on chosen date' });
        return;
      }
      res.json({ message: 'Doctor available' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });





//Getting Specific Patient
router.get('/details', getPatient, (req,res) => {
    res.json(res.patient)
})




//Creating One
router.post('/', async (req,res) => {
    const patient = new Patient({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        doctor: req.body.doctor,
        prefered_date: req.body.prefered_date
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
        // var name = await req.query.name
        // console.log("name", name )
        
        var id = await req.query.id
        console.log("id", id)
        

        return res.status(200).json({message: 'Sample Response'})


        // patient = await Patient.findById(req.params.id)
        // if(patient == null){
        //     return res.status(404).json({message: 'Cannot find patient'})
        // }
    } catch(err){
        return res.status(500).json({message: err.message})
    }
    res.patient = patient
    next()

}

module.exports = router