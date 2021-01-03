const express = require('express')

const user_controller = require('../user/user-controller')
const imgs_controller = require('../upload/upload-controller')
const cfg_forms_controller = require('../forms/forms-controller')
const form_data_controller = require('../forms/forms-data-controller')
const form_control_controller = require('../forms/control/form-control-controller')
const cfgpoints_controller = require('../points/point-cfg/point-cfg-controller')
const values_controller = require('../points/point-values/point-values-controller')
const transactions_controller = require('../points/point-transactions/point-transactions-controller')
const menu_controller = require('../menu/forms_menu/form-menu-controller')
const point_values_controller = require('../point-values/point-values-controller')


const router = express.Router()
const authorize = require('./auth')


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Incoming request Time: ', Date.now())
  next()
})

router.get('/', express.static(__dirname ));

router.post('/login', user_controller.login )
router.get('/logins/:login', user_controller.testFreeLogin )

router.post('/users',      user_controller.postUser )
router.get('/users',       user_controller.selectUsers )
router.delete('/users/:id', user_controller.deleteUser )
router.put('/users/:id',    user_controller.updateUser )
router.get('/users/:id',    user_controller.findOneUser )

router.post('/image',  imgs_controller.uploadImage )
router.post('/images',  imgs_controller.uploadManyImages )
router.delete('/images/:id', imgs_controller.deleteOneImage);
//router.get('/images/:id', product_imgs_controller.findOneImage);
router.get('/images', imgs_controller.selectImages);


router.post('/forms',      cfg_forms_controller.create )
router.get('/forms',       cfg_forms_controller.select )
router.delete('/forms/:id', cfg_forms_controller.delete )
router.patch('/forms/:id',    cfg_forms_controller.update )
router.get('/forms/:id',    cfg_forms_controller.findOne )


router.post('/formvalues',      form_data_controller.create )
router.get('/formvalues',       form_data_controller.select )
router.delete('/formvalues/:id', form_data_controller.delete )
router.patch('/formvalues/:id',    form_data_controller.update )
router.get('/formvalues/:id',    form_data_controller.getPageDataValuesForForm )

router.post('/formcontrols',      form_control_controller.create )
router.get('/formcontrols',       form_control_controller.select )
router.delete('/formcontrols/:id', form_control_controller.delete )
router.patch('/formcontrols/:id',    form_control_controller.update )
router.get('/formcontrols/:id',    form_control_controller.findOne )

router.post('/cfgpoints',      cfgpoints_controller.create )
router.get('/cfgpoints',       cfgpoints_controller.select )
router.delete('/cfgpoints/:id', cfgpoints_controller.delete )
router.patch('/cfgpoints/:id',    cfgpoints_controller.update )
router.get('/cfgpoints/:id',    cfgpoints_controller.findOne )

router.post('/values',      values_controller.create )
router.get('/values',       values_controller.select )
router.delete('/values/:id', values_controller.delete )
router.patch('/values/:id',    values_controller.update )
router.get('/values/:id',    values_controller.findOne )

router.post('/transactions',      transactions_controller.create )
router.get('/transactions',       transactions_controller.select )
router.delete('/transactions/:id', transactions_controller.delete )
router.patch('/transactions/:id',    transactions_controller.update )
router.get('/transactions/:id',    transactions_controller.findOne )

router.post('/menu',      menu_controller.create )
router.get('/menu',       menu_controller.select )
router.delete('/menu/:id', menu_controller.delete )
router.patch('/menu/:id',    menu_controller.update )
router.get('/menu/:id',    menu_controller.findOne )

router.get('/pointvalues/:id',    point_values_controller.select )
router.get('/pointvalue/:id',    point_values_controller.selectOne )

module.exports =  router 