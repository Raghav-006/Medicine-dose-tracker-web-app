const Medicine = require('../database/models/medicine.Model');
const moment = require('moment');

const AllMedicine = async function(req,res){
    //const query = {id:req.user._id};
    let id = req.user._id;
    let take = 1;
    let page = req.query.page;
    const skip = ((page - 1) * take);
    const limit = 1;
    try{
        const [medication, countResult] = await Promise.all([
            Medicine.find({id}).skip(skip).limit(limit),
            Medicine.countDocuments({id})
        ]);
        if(!medication){
            //await req.flash('info', 'Flash is back!');
            return res.json({
                data: 'No record has been found'
            })
        }
        //await req.flash('info', 'Flash is successful!');
        res.json({
            data: medication,
            meta: {countResult,page,last_page: Math.ceil(countResult / take)}
        })
    }catch(error){
        console.warn({error:error})
    }
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

const modalAddMedicine = async function(req,res){
    let id = req.user._id;
    console.log(`I am logging data: ${id}`);
    const data = req.body;
    const medicine = new Medicine({
        id: id,
        name: data.name,
        dosage: data.dosage,
        frequency: data.frequency,
        notification: data.notification,
        timeZone: data.timeZone,
        time: data.notifyTime
    })
    const result = await medicine.save()
    /*if(result){
        await req.flash('info','successfully saved');
    }*/
    const me = await result.toJSON()
    res.json({me, msg: 'success'})
}

const findMedicine = async (req,res)=>{
    const {id: medsId} = req.params;
    const meds = await Medicine.findById({_id:medsId});
    if (!meds) {
        return res.json({msg: 'failed'})
    }
    res.json({msg: "success",meds})
};

const updateMedicine = function (req, res){
    let {id: medsId} = req.params;
    let data = req.body;
    let inventory = {
        _id: data._id,
        id: data.id,
        name: data.name,
        dosage: data.dosage,
        frequency: data.frequency,
        notification: data.notification,
        timeZone: data.timeZone,
        time: data.time
    };
    console.log(inventory);
    Medicine.findByIdAndUpdate({_id: medsId},inventory,{new:true},
        function (err, meds) {
        if (err) {
            res.status(500).send(err);
            return res.json({msg: 'failed'})
        } else {
            res.json({msg: "success",meds})
        }
    }).clone().catch(function(err){ console.log(err)});
};

const deleteMedicine = async (req, res)=>{
    const {id: medsID} = req.params
    const meds = await Medicine.findOneAndDelete({ _id: medsID })
    if (!meds) {
        return res.json({msg: 'failed'})
    }
    res.json({msg: "success",meds})
};

module.exports={AllMedicine, addMedicine,modalAddMedicine,findMedicine,updateMedicine, deleteMedicine}