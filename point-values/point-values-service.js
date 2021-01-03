const PointCfg = require('../points/point-cfg/point-cfg.model')
const PointValue = require('../points/point-values/point-value-model')
const db = require('../db');
const moment = require('moment'); // require

exports.select = async (id, query)=> {
    //select config for point
    let point_cfg = await db.findById(PointCfg, id);
    let stat;
    let value;

    if (query.current_time) {
     //select values on time 
        value = await db.find(PointValue, { 'point_id' : id, 'current_time' : moment.utc(query.current_time) }, 
        'num_value str_value current_time str_current_time');        
    } else {
    //last
        value = await db.find(PointValue, { 'point_id' : id }, 
        'num_value str_value current_time str_current_time', 
        { sort: { current_time: -1 } });        
    }
    if (query.start && query.end) {
        let filter = { 'point_id' : id, 'current_time' : { $gte: moment.utc(query.start), $lt: moment.utc(query.end) } }
        value = await db.find(PointValue, filter,
        'num_value str_value current_time str_current_time', { sort : {current_time: 1} });        
        
        stat = await CalcAggregateFunctions(id, query.start, query.end)
    }
    return {...point_cfg.toObject(), 
        'values' : value,
        'group' : stat 
    }
}


function CalcAggregateFunctions(id, start, end) {
    return PointValue.aggregate([
        { $match : { 'point_id' : id, 'current_time' : { $gte: moment.utc(start).toDate(), $lt: moment.utc(end).toDate() } }},
        { $sort : { 'current_time' : 1 } },
        { $group: {
            _id: '$point_id',
            avg: { $avg: '$num_value'},
            sum: { $sum: '$num_value'},
            min: { $min: '$num_value'},
            max: { $max: '$num_value'},
            first: { $first: '$num_value'},
            last: { $last: '$num_value'}
        }}
    ]);
}

exports.selectOne = (id, query)=> {
    if (query.current_time) {
        //select values on time 
           return db.findOne(PointValue, { 'point_id' : id, 'current_time' : moment.utc(query.current_time) }, 
           'num_value str_value current_time str_current_time');        
       } else {
       //last
           return db.findOne(PointValue, { 'point_id' : id }, 
           'num_value str_value current_time str_current_time', 
           { sort: { current_time: -1 } });        
       }       
}
