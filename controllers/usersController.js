const Medicine = require('../database/models/medicine.Model');
const moment = require('moment');

const AllMedicine = async function(req,res){
    let id = req.user._id;
    const medication = await Medicine.find({id});
    
    if(!medication){
        //await req.flash('info', 'Flash is back!');
        return res.json({
            data: 'No record has been found'
        })
    }
    //await req.flash('info', 'Flash is successful!');
    res.json({medication})
};

const addMedicine = async function(req,res){
    let id = req.user._id;
    const data = req.body;
    const medicine = new Medicine({
        id: id,
        name: data.name,
        dosage: data.dosage,
        frequency: data.frequency,
        notification: data.notification,
        timeZone: data.timeZone,
        time: moment(req.body.birthDateISO8601, 'YYYY-MM-DD hh:mma')
    })
    const result = await medicine.save()
    /*if(result){
        await req.flash('info','successfully saved');
    }*/
    const me = await result.toJSON()
    res.json({me, msg: 'success'})
};

const editMedicine = async (req, res)=>{
    const {id: medsId} = req.params
    const meds = await Medicine.findOne({ _id: medsId })
    if (!meds) {
        return res.json({msg: 'failed'})
    }
    res.json({msg: "success",meds})
}

const deleteMedicine = async (req, res)=>{
    const {id: medsID} = req.params
    const meds = await Medicine.findOneAndDelete({ _id: medsID })
    if (!meds) {
        return res.json({msg: 'failed'})
    }
    res.json({msg: "success",meds})
};

module.exports={AllMedicine, addMedicine,editMedicine, deleteMedicine}