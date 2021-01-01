const PointCfg = require('../points/point-cfg/point-cfg.model')
const PointValue = require('../points/point-values/point-value-model')
const db = require('../db');
const moment = require('moment'); // require

exports.select = async (id, query)=> {
    //select config for point
    let point_cfg = await db.findById(PointCfg, id);

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
        value = await db.find(PointValue, { 'point_id' : id, 'current_time' : { $gte: moment.utc(query.start), $lt: moment.utc(query.end) } },
        'num_value str_value current_time str_current_time');        
    }
    return {...point_cfg.toObject(), 
        'values' : value, 
    }
}

