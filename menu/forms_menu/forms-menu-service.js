const db = require('../../db');
const Model = require('./forms-menu-model');
const base = require('../../shared')

exports.create = (body) => {
      
    const new_Object = new Model(body);

    return db.create(new_Object);
}

exports.deleteOne = (id) => {    
   
    return db.deleteOne(Model, {"_id": id});
}

exports.select = async  (query) => {
    return await base.getPageOfDocs(Model, query);
}

exports.update = (id, body) => {
       
    const newObject = new Model(body).toObject();
    delete newObject['_id'];
    return db.update(FormValue, {"_id": id}, newObject);
}

exports.findById = (id) => {    
   
    return db.findById(Model, {"_id": id});
}
