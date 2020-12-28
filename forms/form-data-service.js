const db = require('../db');
const FormValue = require('./form-submited-data-model');
const base = require('../shared')
const PointCfg = require('../points/point-cfg/point-cfg.model')
const PointValue = require('../points/point-values/point-value-model')
const Transaction = require('../points/point-transactions/point-transaction-model')
const User = require('../user/user-model');
const FormCfg = require('../forms/form-cfg-model')


exports.create = async (body) => {
    const user = await db.findOne(User);    
    const trans = await db.create(new Transaction({user:user._id, data:body}));

    const values = DecodeInputsToValuesList(body, trans._id);
    const promises = [];

    for (let i = 0; i < values.length; i++) {
        const promise = UpsertValue(values[i], trans._id);
        promises.push(promise);
    }
 
    let res = Promise.all(promises);

    return res;
}

function  UpsertValue(new_value, transaction_id) {
    return db.findOneAndUpdate(PointValue, 
        {current_time: new_value.current_time, point_id : new_value.point_id}, 
        {...new_value, transaction_id});
}

function DecodeInputsToValuesList(form_data) {
    let values =[];
    let current_time;
    let num_value;
    let str_value;
    let str_current_time;
    
        //date
        if (form_data["1"]) {
            current_time = new Date(form_data["1"]);    //set date
            str_current_time = current_time.toDateString()
            delete form_data["1"];  
        }
        //time
        if (form_data["2"]) {
            let time = new Date(form_data["2"]);    //set time
            str_current_time = str_current_time + time.toString('hh:mm')
            delete form_data["2"]; 
        }
        //date-time local
        if (form_data["3"]) {
            current_time = new Date(form_data["3"]);    //set date
            str_current_time = form_data["3"];
            delete form_data["3"]; 
        }
        //month
        if (form_data["4"]) {


            delete form_data["4"]; 
        }
        //add hours
        if (form_data["5"]) {
            let hour = form_data["5"];
            current_time.setTime(current_time.getTime() + (hour*60*60*1000));
            str_current_time = current_time.toISOString()
            delete form_data["5"]; 
        }
        //add hour
        if (form_data["6"]) {
            let hour = form_data["6"];
            current_time.setTime(current_time.getTime() + (hour*60*60*1000));
            str_current_time = current_time.toISOString()
            delete form_data["6"]; 
        }



    for (const point_id in form_data) {

        str_value = form_data[point_id];
        num_value = parseFloat(str_value);

        //TODO str_value for digital objects !!!
        let value = {point_id, current_time, num_value, str_value, str_current_time};

        values.push(value);
    }
    return values;
}


exports.deleteOne = (id) => {    
   
    return db.deleteOne(FormValue, {"_id": id});
}

exports.select = async  (query) => {
    return await base.getPageOfDocs(FormValue, query);
}

exports.update = (id, body) => {
       
    const new_Product = new FormValue(body).toObject();
    delete new_Product['_id'];
    console.log(new_Product);

    return db.update(FormValue, {"_id": id}, new_Product);
}

exports.findById = async (id) => {      
    let form_cfg = await db.findById(FormCfg, {"_id": id});

    //select point cfgs
    let cfgs = await db.find(PointCfg, { '_id' : {$in: form_cfg.point_controls} });
    let header = CreateTableHeaderFromPointsCfg(cfgs)

    //select values
    let values = await db.find(PointValue, { 'point_id' : {$in: form_cfg.point_controls} }, null, {sort: {current_time: 1}})

    let rows = CreateRowsFromCells(values)

    return {header, rows};
}


//for create new form initial values
exports.GetLastValuesVector = async (point_ids) => {
    let promises = [];

    for (let i = 0; i < point_ids.length; i++) {
        const point_id = point_ids[i];
        //select last values
        let promise = db.findOne(PointValue, { 'point_id' : point_id }, {}, { sort: { current_time: -1 } });
        promises.push(promise);
    }

    let values = await Promise.all(promises);

    let res_object = values.reduce((acc, curr)=>{
        if(curr) acc[curr.point_id] = curr.str_value;
        return acc;
    }, {}) 

    let time = new Date();

    AddValuesForDateTimeControls(point_ids, res_object, time);
    return res_object;
}
//for edit forms initial values
exports.GetValuesVector = async function GetValuesVector(point_ids, time) {
     //select values on time
     let values = await db.find(PointValue, { 'point_id' : {$in: point_ids}, 'current_time' : time });
     let res_object = values.reduce((acc, curr)=>{
        acc[curr.point_id] = curr.str_value;
        return acc;
    }, {});

    AddValuesForDateTimeControls(point_ids, res_object, new Date(time))
    return res_object;
}

function AddValuesForDateTimeControls(point_ids, res_object, time) {
            //date
            if (point_ids.includes(1)) {
                res_object['1'] = time.toDateString();
            }
            //time
            if (point_ids.includes(2)) {
                res_object['2'] = 0;
            }
            //date-time local
            if (point_ids.includes(3)) {
                res_object['3'] = 0;
            }
            //month
            if (point_ids.includes(4)) {
                res_object['4'] = 0;
            }
            //add hours
            if (point_ids.includes(5)) {
                res_object['5'] = 0;
                res_object['5'] = time.getHours();
            }
            //add hour
            if (point_ids.includes(6)) {
                res_object['6'] = 0;
                res_object['6'] = time.getHours();
            }

}

function CreateTableHeaderFromPointsCfg(cfgs) {
    return cfgs.reduce((acc, curr)=>{
        acc.push({'id':curr.id, 'text' : curr.short_name});
        return acc;
    }, [])
}


function CreateRowsFromCells(values) {
    let current_time = new Date();
    let result = [];
    let obj;

    for (let i = 0; i < values.length; i++) {
        const value = values[i];

        if (current_time.getTime() !== value.current_time.getTime()) {
            if (obj) result.push(obj);
            current_time = value.current_time;
            obj = {"1" : value.str_current_time};
        }
        obj[value.point_id] = value.str_value;
    }
    //push last row
    if (obj) result.push(obj);
    return result;
}