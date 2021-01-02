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