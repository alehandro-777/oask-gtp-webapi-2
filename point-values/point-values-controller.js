const service = require('./point-values-service')

exports.select = (req, res) => {  
    
    service.select(+req.params.id, req.query)    
    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.selectOne = (req, res) => {    
    service.selectOne(+req.params.id, req.query)    
    .then( (result) => {
        result.point_id =req.params.id;
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}