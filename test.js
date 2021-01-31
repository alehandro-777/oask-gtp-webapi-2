const config = require('config');
const mongoose = require('mongoose');
const connString = config.get('dbConfig.connString');
const test = require('./generate-test-data')
let timer = null;

const connParams = {useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false };

console.log('Mongobd opening connection...')

mongoose.connect(connString, connParams);

mongoose.connection.on('error', (err) => {
    console.log('Error Mongobd connection: ' + err)
    process.exit(1)
}
);

mongoose.connection.once('open', () => { 
    console.log('Mongobd connected Ok')
    
    test.GenerateTestData()   
    
}); 

process.on('exit', ()=>{
    mongoose.connection.close();
    console.log(`Server stoped, process exit`)
});

//catches ctrl+c event
process.on('SIGINT', ()=>{
    mongoose.connection.close();
    process.exit(1)
});

const StartUpdate = async () => {
    console.log("wait 1 sec")
    timer = setTimeout(() => StartUpdate(), 1000)
  };


StartUpdate();


