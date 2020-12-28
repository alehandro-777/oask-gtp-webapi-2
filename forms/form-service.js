const db = require('../db');
const FormCfg = require('./form-cfg-model');
const base = require('../shared')
const PointCfg = require('../points/point-cfg/point-cfg.model')
const FormDataService = require('./form-data-service')


exports.create = (body) => {
      
    const new_Product = new FormCfg(body);

    return db.create(new_Product);
}

exports.deleteOne = (id) => {    
   
    return db.deleteOne(FormCfg, {"_id": id});
}

exports.select = async  (query) => {
    return await base.getPageOfDocs(FormCfg, query);
}

exports.update = (id, body) => {
       
    const new_Product = new FormCfg(body).toObject();
    delete new_Product['_id'];
    console.log(new_Product);

    return db.update(FormCfg, {"_id": id}, new_Product);
}

exports.findById = async (id, query) => { 
    let result = {};

    let form = await db.findById(FormCfg, {"_id": id});
    result["title"] = form.title;
    let point_cfgs = await AsyncPopulateControls(form);
    
    let values;

    //edit time slice or new values
    if (query.current_time) {
        values = await FormDataService.GetValuesVector(form.point_controls, query.current_time);
    }
    else {
        values = await FormDataService.GetLastValuesVector(form.point_controls);      
    }

    result["controls"] = InitControls(point_cfgs, values);
    return result;
}

function AsyncPopulateControls(form) {
    let promises = [];
    for (let i = 0; i < form.point_controls.length; i++) {
        const point_id  = form.point_controls[i];
        let point_cfg = db.findById(PointCfg, {"_id": point_id}).populate("control_id");
        promises.push(point_cfg);
    }

    return Promise.all(promises);
}

function InitControls(point_cfgs, values) {
    let result = [];
    for (let i = 0; i < point_cfgs.length; i++) {
        let point_cfg  = point_cfgs[i];
        if (!point_cfg) continue;
        let control = point_cfg.control_id;
        control.name = point_cfg._id;
        control.label = point_cfg.name;
        control.id = point_cfg._id;

        if (point_cfg.min) control.min =  point_cfg.min;
        if (point_cfg.max) control.max =  point_cfg.max;
        if (point_cfg.min) control.value =  point_cfg.min;

        if (values[point_cfg._id]) control.value = values[point_cfg._id];
        result.push(control);
    }

    return result;
}