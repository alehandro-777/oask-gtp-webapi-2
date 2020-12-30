const db = require('./db/index')

const User = require('./user/user-model')
const DbPoint = require('./points/point-cfg/point-cfg.model')
const Form = require('./forms/form-cfg-model')
const Control = require('./forms/control/form-control.model')
const Menu = require('./menu/forms_menu/forms-menu-model')

exports.GenerateTestData = () => {
    GenerateTestUsers()
    GenerateTestControls() 
    GenerateTestPoints()
    GenerateTestForms()
    GenerateTestMenu()
}

function GenerateTestUsers() {
    let users = [
        { name:'Администратор А.А.',
          email:'aaa@bb.cc.dd',
          phone:'111-222-4444',  
          login:'admin',
          password:'admin',
          role:'admin'  
        },
        { name:'Диспетчер А.А.',
          email:'aaa@bb.cc.dd',
          phone:'111-222-4444',  
          login:'user',
          password:'user',
          role:'user'  
        }
    ]

    db.createMany(User, users)
}

function GenerateTestControls() {
    let controls = [
        {
            _id : 1,
            id: '1',
            name: '1',
            label: 'Дата',
            value: '2020-12-31',
            type: 'date',
            min: '2019-12-31',
            max:'2029-12-31'
        },
        {
            _id : 2,
            id: '2',
            name: '2',
            label: 'Час',
            value: '00:00',
            type: 'time',
            min: '2019-12-31',
            max:'2029-12-31'
        },
        {
            _id : 3,
            id: '3',
            name: '3',
            label: 'Дата,час',
            value: '2020-12-31 00:00',
            type: 'datetime-local',
        },
        {
            _id : 4,
            id: '4',
            name: '4',
            label: 'Місяць',
            value: '0',
            type: 'month',
        },
        {
            _id : 5,
            id: '5',
            name: '5',
            label: 'Година',
            value: '0',
            type: 'select',
            options:[
                {key:'0', value:'00:00'},
                {key:'1', value:'01:00'},
                {key:'2', value:'02:00'},
                {key:'3', value:'03:00'},
                {key:'4', value:'04:00'},
                {key:'5', value:'05:00'},
                {key:'6', value:'06:00'},
                {key:'7', value:'07:00'},
                {key:'8', value:'08:00'},
                {key:'9', value:'09:00'},
                {key:'10', value:'10:00'},
                {key:'11', value:'11:00'},
                {key:'12', value:'12:00'},
                {key:'13', value:'13:00'},
                {key:'14', value:'14:00'},
                {key:'15', value:'15:00'},
                {key:'16', value:'16:00'},
                {key:'17', value:'17:00'},
                {key:'18', value:'18:00'},
                {key:'19', value:'19:00'},
                {key:'20', value:'20:00'},
                {key:'21', value:'21:00'},
                {key:'22', value:'22:00'},
                {key:'23', value:'23:00'}
            ]
        },
        {
            _id : 6,
            id: '6',
            name: '6',
            label: 'Реж.год',
            value: '0',
            type: 'select',
            options:[
                {key:'0', value:'00:00'},
                {key:'2', value:'02:00'},
                {key:'3', value:'03:00'},
                {key:'4', value:'04:00'},
                {key:'6', value:'06:00'},
                {key:'8', value:'08:00'},
                {key:'10', value:'10:00'},
                {key:'12', value:'12:00'},
                {key:'14', value:'14:00'},
                {key:'16', value:'16:00'},
                {key:'18', value:'18:00'},
                {key:'20', value:'20:00'},
                {key:'22', value:'22:00'},
            ]
        },
        {
            _id : 7,
            id: '7',
            name: '7',
            label: 'Int параметр',
            value: '1',
            type: 'number',
            min: '1',
            max: '10'    
        },
        {
            _id : 8,
            id: '8',
            name: '8',
            label: 'String параметр',
            value: '8',
            type: 'text'
        },
        {
            _id : 9,
            id: '9',
            name: '9',
            label: 'Стан ПСГ',
            value: '0',
            type: 'select',
            options:[
                {key:'0', value:'Нейтр'},
                {key:'1', value:'Відбір'},
                {key:'2', value:'Закачка'}
            ]            
        },

    ]

    db.createMany(Control, controls)
}

function GenerateTestPoints() {
    let points = [
        {
            _id : 1,
            short_name: 'Дата',
            name: 'Дата',
            full_name: 'Службові теги.Дата',
            control_id: 1,
            min: '2019-12-31',
            max:'2029-12-31'
        },
        {
            _id : 2,
            short_name: 'Час',
            name: 'Час',
            full_name: 'Службові теги. Час hh:mm',
            control_id: 2,
        },
        {
            _id : 3,
            short_name: 'Д/Ч',
            name: 'Дата,час',
            full_name: 'Службові теги. Дата-Час локальний',
            control_id: 3,
        },
        {
            _id : 4,
            short_name: 'Міс.',
            name: 'Місяць',
            full_name: 'Службові теги. Місяць',
            control_id: 4,
        },
        {
            _id : 5,
            short_name: 'Год.',
            name: 'Година',
            full_name: 'Службові теги. Година 0-23',
            control_id: 5,
        },
        {
            _id : 6,
            short_name: 'Год.',
            name: 'Година',
            full_name: 'Службові теги. Година режимна',
            control_id: 6,
        },
        //------------------------------------------------------------------------------------------
        {
            _id : 100,
            short_name: 'Рвх',
            name: 'КС-Бобровницька-05.Рвх КС',
            full_name: 'Мринське ВУПЗГ.ПСГ Червоні партизани.КС-Бобровницька-05.Рвх КС',
            control_id: 7,
            min: '0',
            max: '100',
        },
        {
            _id : 101,
            short_name: 'Рвих',
            name: 'КС-Бобровницька-05.Рвих КС',
            full_name: 'Мринське ВУПЗГ.ПСГ Червоні партизани.КС-Бобровницька-05.Рвих КС',
            control_id: 7,
            min: '0',
            max: '100',
        },
        {
            _id : 102,
            short_name: 'ГПА',
            name: 'КС-Бобровницька-05.N ГПА',
            full_name: 'Мринське ВУПЗГ.ПСГ Червоні партизани.КС-Бобровницька-05.N ГПА в роботі',
            control_id: 7,
            min: '0',
            max: '3',
        },
        //------------------------------------------------------------------------------------------
        {
            _id : 103,
            short_name: 'Рвх',
            name: 'ДКС Мрин.Рвх КС',
            full_name: 'Мринське ВУПЗГ.ПСГ Червоні партизани.ДКС Мрин.Рвх КС',
            control_id: 7,
            min: '0',
            max: '100',
        },
        {
            _id : 104,
            short_name: 'Рвих',
            name: 'ДКС Мрин.Рвих КС',
            full_name: 'Мринське ВУПЗГ.ПСГ Червоні партизани.ДКС Мрин.Рвих КС',
            control_id: 7,
            min: '0',
            max: '100',
        },
        {
            _id : 105,
            short_name: 'ГПА',
            name: 'ДКС Мрин.N ГПА',
            full_name: 'Мринське ВУПЗГ.ПСГ Червоні партизани.ДКС Мрин.N ГПА в роботі',
            control_id: 7,
            min: '0',
            max: '13',
        },
        //----------------------------------------------------------------------------------------------
        {
            _id : 106,
            short_name: 'Q ПСГ',
            name: 'Q ПСГ',
            full_name: 'Мринське ВУПЗГ.ПСГ Червоні партизани.Q ПСГ',
            control_id: 7,
            min: '0',
            max: '3000',
        },
        {
            _id : 107,
            short_name: 'с.роб',
            name: 'К-сть свердловин',
            full_name: 'Мринське ВУПЗГ.ПСГ Червоні партизани.К-сть свердловин',
            control_id: 7,
            min: '0',
            max: '67',
        },
        {
            _id : 108,
            short_name: 'Стан',
            name: 'Стан ПСГ',
            full_name: 'Мринське ВУПЗГ.ПСГ Червоні партизани.Стан ПСГ',
            control_id: 9
        },

    ]

    db.createMany(DbPoint, points)

}

function GenerateTestForms() {
    let forms = [
        {
            _id : 1,
            title : 'Мринське ВУПЗГ.ПСГ Червоні партизани.КС-Бобровницька-05.Режим',    // friendly  name
            point_controls : [1, 5, 100,101,102],                                       //db_points id
        },
        {
            _id : 2,
            title : 'Мринське ВУПЗГ.ПСГ Червоні партизани.ДКС Мрин.Режим',   // friendly  name
            point_controls : [1, 5, 103,104,105],                            //db_points id
        },
        {
            _id : 3,
            title : 'Мринське ВУПЗГ.ПСГ Червоні партизани.ПСГ',              // friendly  name
            point_controls : [1, 5, 106,107,108],                            //db_points id
        },
        {
            _id : 4,
            title : 'Мринське ВУПЗГ.ПСГ Червоні партизани',                 // friendly  name
            point_controls : [1, 5, 100,101,102, 103,104,105, 106,107,108], //db_points id
        },

    ]
    db.createMany(Form, forms)
}

function GenerateTestMenu() {
    let menus = [  
    {
        _id :  "1",            // unique id
        name: "Мринське ВУПЗГ",
        full_name: "Мринське ВУПЗГ",
        payload: {},
        children: [ "1.1" ],
    },
    {
        _id :  "1.1",            // unique id
        name: "ПСГ Червоні партизани",
        full_name: "Мринське ВУПЗГ.ПСГ Червоні партизани",
        payload: {},
        children: [ "1.1.1", "1.1.2", "1.1.3"],
    },
    {
        _id :  "1.1.1",            // unique id
        name: "КС Бобровницька-05",
        full_name: "Мринське ВУПЗГ.ПСГ Червоні партизани.КС Бобровницька-05",
        payload: {"_id":1},
        children: [],
    },
    {
        _id :  "1.1.2",            // unique id
        name: "ДКС Мрин",
        full_name: "Мринське ВУПЗГ.ПСГ Червоні партизани.ДКС Мрин",
        payload: {"_id":2},
        children: [],
    },
    {
        _id :  "1.1.3",            // unique id
        name: "ПСГ",
        full_name: "Мринське ВУПЗГ.ПСГ Червоні партизани.ПСГ",
        payload: {"_id":4},
        children: [],
    },

    ]
    db.createMany(Menu, menus)
}