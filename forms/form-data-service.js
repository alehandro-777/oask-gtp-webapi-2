const db = require('../db');
const FormValue = require('./form-submited-data-model');
const base = require('../shared')
const PointCfg = require('../points/point-cfg/point-cfg.model')
const PointValue = require('../points/point-values/point-value-model')
const Transaction = require('../points/point-transactions/point-transaction-model')
const User = require('../user/user-model');
const FormCfg = require('../forms/form-cfg-model')
const config = require('config');
const moment = require('moment'); // require

exports.create = async (body) => {

    const user = await db.findOne(User);    
    const trans = await db.create(new Transaction({user:user._id, data:body}));

    const values = await DecodeFormKVPtoPointValuesList(body, trans._id);
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

async function DecodeFormKVPtoPointValuesList(form_data) {
    let values =[];
    let current_time;
    let num_value;
    let str_value;
    let str_current_time;
    
        //date
        if (form_data["1"]) {
            current_time = new Date(form_data["1"]);    //set date
            str_current_time = moment(current_time).format('YYYY-MM-DD');
            console.log(str_current_time)
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

        let value = await CreatePointValue(point_id, form_data[point_id]);      

        values.push( {...value, current_time, str_current_time} );
    }
    return values;
}

//digital or analog values
async function CreatePointValue(point_id, value){
    let result = {};
    result.point_id =point_id;
    result.str_value = value;
    //select config for point
    let point_cfg = await db.findById(PointCfg, point_id).populate('control_id');
    let control = point_cfg.control_id;

    //has digital state
    if (control.options.length > 0) {
        let state = control.options.find(element => element.key == value);
        if (state) result.str_value = state.value;
    }
    result.num_value = parseFloat(value);
    return result;
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

function createLinkHeader(page, per_page, count) {
    const header = {}
    header.page = parseInt(page) || 1;
    header.per_page = per_page;
    header.prev = (header.page > 1) ? header.page-1 : null;
    header.next = (header.per_page*header.page < count) ? header.page + 1 : null;
    header.last = Math.ceil(count / header.per_page);
    header.total_count = count;
    return header;
}

//MAIN function select data table  for form id (support pagination !!! )
exports.getPageDataValuesForForm = async (id, query) => { 

    const per_page_default = config.get('paginator.limit');
    const {page, per_page, sort, ...filter} = query;

    //select form confiruration     
    let form_cfg = await db.findById(FormCfg, {"_id": id});

    //select config for form points
    let cfgs = await db.find(PointCfg, { '_id' : {$in: form_cfg.point_controls} });

    //create header for gui table
    let header = CreateTableHeaderFromPointsCfg(cfgs)

    //get total rows for paginator
    let total = await db.count(PointValue, { 'point_id' : {$in: form_cfg.point_controls} })

    //determine page size count without types 1-6
    let db_points = form_cfg.point_controls.filter(e=>e >6)

    //create select page options
    let options ={}
    options.limit = parseInt(per_page) || per_page_default*db_points.length;
    options.skip = (parseInt(page) -1)*options.limit || 0;
    options.sort = {current_time: -1}
        
    //select arr value for form points 
    let values = await db.find(PointValue, { 'point_id' : {$in: form_cfg.point_controls} }, null, options)

    //build rows from cells
    let rows = CreateRowsFromCells(values, form_cfg.point_controls)

    //for paginator
    let link = createLinkHeader(page, options.limit, total)

    return {'title': form_cfg.title, header, rows, link};
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
    
    //move values in one big object
    let res_object = values.reduce((acc, curr)=>{
        if(curr) acc[curr.point_id] = curr.num_value;
        return acc;
    }, {}) 

    let time = new Date();
    
    console.log(time)

    Add_DateTime_to_row_Object(point_ids, res_object, time);
    return res_object;
}
//for edit forms initial values
exports.GetValuesVector = async function GetValuesVector(point_ids, time) {
    let shift = new Date(time)
    let new_time =  new Date(shift.getTime()-shift.getTimezoneOffset()*60*1000)

     //select values on time
     let values = await db.find(PointValue, { 'point_id' : {$in: point_ids}, 'current_time' : new_time.toISOString() });

     let res_object = values.reduce((acc, curr)=>{
        acc[curr.point_id] = curr.num_value;
        return acc;
    }, {});

    Add_DateTime_to_row_Object(point_ids, res_object, new Date(time))
    return res_object;
}
//добавляет вычисляемые служебные поля дата-время к объекту "строка"

function Add_DateTime_to_row_Object(point_ids, res_object, time) {
            //date
            if (point_ids.includes(1)) {
                res_object['1'] = moment(time).format('YYYY-MM-DD');
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
                res_object['5'] =  time.getHours();
            }
            //add hour
            if (point_ids.includes(6)) {
                res_object['6'] = 0;
                res_object['6'] =  time.getHours();
            }

}

function CreateTableHeaderFromPointsCfg(cfgs) {
    return cfgs.reduce((acc, curr)=>{
        acc.push({'id':curr.id, 'text' : curr.short_name});
        return acc;
    }, [])
}


function CreateRowsFromCells(values, point_ids) {
    let current_time = new Date();
    let result = [];
    let obj;

    for (let i = 0; i < values.length; i++) {
        const value = values[i];

        if (current_time.getTime() !== value.current_time.getTime()) {
            if (obj) result.push(obj);            
            //new row
            current_time = value.current_time;
            obj = {};
        
            //add date fime values        
            Add_DateTime_to_row_Object(point_ids, obj, new Date(current_time.getTime()+current_time.getTimezoneOffset()*60*1000))
        }
  
        obj[value.point_id] = value.str_value;
    }
    //push last row
    if (obj) result.push(obj);
    return result;
}

