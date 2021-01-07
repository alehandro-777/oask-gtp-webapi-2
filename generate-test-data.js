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
            hint: 'hint',
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
            hint: 'hint',
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
            hint: 'hint',
        },
        {
            _id : 4,
            id: '4',
            name: '4',
            label: 'Місяць',
            value: '0',
            type: 'month',
            hint: 'hint',
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
            hint: 'hint',
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
            type: 'text',
            hint: 'hint',
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
        { "_id": 1,"full_name":"Службові теги.Дата", "name": "Дата", "short_name" :"Дата","eu": "Д", "min":"2019-12-31", "max":"2029-12-31", "control_id":1},
        { "_id": 2,"full_name":"Службові теги. Час hh:mm", "name": "Час", "short_name" :"Час","eu": "Г", "min":"00:00:00", "max":"23:59:59", "control_id":2},
        { "_id": 3,"full_name":"Службові теги. Дата-Час локальний", "name": "Дата/час", "short_name" :"Д/Ч","eu": "Р-М-ДT", "min":"2019-12-31T00:00", "max":"2029-12-31T23:59", "control_id":3},
        { "_id": 4,"full_name":"Службові теги. Місяць", "name": "Година", "short_name" :"Год.","eu": "міс", "min":"", "max":"", "control_id":4},
        { "_id": 5,"full_name":"Службові теги. Година 0-23", "name": "Година", "short_name" :"Год.","eu": "г", "min":"0", "max":"23", "control_id":5},
        { "_id": 6,"full_name":"Службові теги. Година режимна", "name": "Година", "short_name" :"Год.","eu": "г", "min":"0", "max":"22", "control_id":6},
        

        { "_id": 113,"full_name":"Богородчанське ВУПЗГ.ПСГ Богородчани.Q ВОГ", "name": "ПСГ Богородчани.Q ВОГ", "short_name" :"Q","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 196,"full_name":"Богородчанське ВУПЗГ.ПСГ Богородчани.ДКС Богородчани.N ГПА в роботі", "name": "ДКС Богородчани.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"10", "control_id":7},
        { "_id": 139,"full_name":"Богородчанське ВУПЗГ.ПСГ Богородчани.ДКС Богородчани.Рвих КС", "name": "ДКС Богородчани.Рвих КС", "short_name" :"Рвих КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 155,"full_name":"Богородчанське ВУПЗГ.ПСГ Богородчани.ДКС Богородчани.Рвх КС", "name": "ДКС Богородчани.Рвх КС", "short_name" :"Рвх КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 170,"full_name":"Богородчанське ВУПЗГ.ПСГ Богородчани.К-сть свердловин", "name": "ПСГ Богородчани.К-сть свердловин", "short_name" :"с.роб","eu": "од", "min":"0", "max":"157", "control_id":7},
        { "_id": 128,"full_name":"Богородчанське ВУПЗГ.ПСГ Богородчани.Р ВОГ", "name": "ПСГ Богородчани.Р ВОГ", "short_name" :"Р","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 184,"full_name":"Богородчанське ВУПЗГ.ПСГ Богородчани.Стан ПСГ", "name": "ПСГ Богородчани.Стан ПСГ", "short_name" :"стан","eu": "", "min":"0", "max":"2", "control_id":9},
        { "_id": 115,"full_name":"Дашавське ВУПЗГ.ПСГ Дашавське.Q ВОГ", "name": "ПСГ Дашавське.Q ВОГ", "short_name" :"Q","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 199,"full_name":"Дашавське ВУПЗГ.ПСГ Дашавське.ДКС Дашава.N ГПА в роботі", "name": "ПСГ Дашавське.ДКС Дашава.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"6", "control_id":7},
        { "_id": 141,"full_name":"Дашавське ВУПЗГ.ПСГ Дашавське.ДКС Дашава.Рвих КС", "name": "ПСГ Дашавське.ДКС Дашава.Рвих КС", "short_name" :"Рвих КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 157,"full_name":"Дашавське ВУПЗГ.ПСГ Дашавське.ДКС Дашава.Рвх КС", "name": "ПСГ Дашавське.ДКС Дашава.Рвх КС", "short_name" :"Рвх КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 172,"full_name":"Дашавське ВУПЗГ.ПСГ Дашавське.К-сть свердловин", "name": "ПСГ Дашавське.К-сть свердловин", "short_name" :"с.роб","eu": "од", "min":"0", "max":"100", "control_id":7},
        { "_id": 130,"full_name":"Дашавське ВУПЗГ.ПСГ Дашавське.Р ВОГ", "name": "ПСГ Дашавське.Р ВОГ", "short_name" :"Р","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 186,"full_name":"Дашавське ВУПЗГ.ПСГ Дашавське.Стан ПСГ", "name": "ПСГ Дашавське.Стан ПСГ", "short_name" :"стан","eu": "", "min":"0", "max":"2", "control_id":9},
        { "_id": 110,"full_name":"Мринське ВУПЗГ.ПСГ Мринське.Q ВОГ", "name": "ПСГ Мринське.Q ВОГ", "short_name" :"Q","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 193,"full_name":"Мринське ВУПЗГ.ПСГ Мринське.ДКС Мрин.N ГПА в роботі", "name": "ДКС Мрин.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"13", "control_id":7},
        { "_id": 136,"full_name":"Мринське ВУПЗГ.ПСГ Мринське.ДКС Мрин.Рвих КС", "name": "ДКС Мрин.Рвих КС", "short_name" :"Рвих КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 152,"full_name":"Мринське ВУПЗГ.ПСГ Мринське.ДКС Мрин.Рвх КС", "name": "ДКС Мрин.Рвх КС", "short_name" :"Рвх КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 192,"full_name":"Мринське ВУПЗГ.ПСГ Мринське.КС-5 Бобровницька.N ГПА в роботі", "name": "КС-5 Бобровницька.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"3", "control_id":7},
        { "_id": 135,"full_name":"Мринське ВУПЗГ.ПСГ Мринське.КС-5 Бобровницька.Рвих КС", "name": "КС-5 Бобровницька.Рвих КС", "short_name" :"Рвих КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 151,"full_name":"Мринське ВУПЗГ.ПСГ Мринське.КС-5 Бобровницька.Рвх КС", "name": "КС-5 Бобровницька.Рвх КС", "short_name" :"Рвх КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 167,"full_name":"Мринське ВУПЗГ.ПСГ Мринське.К-сть свердловин", "name": "ПСГ Мринське.К-сть свердловин", "short_name" :"с.роб","eu": "од", "min":"0", "max":"67", "control_id":7},
        { "_id": 109,"full_name":"Мринське ВУПЗГ.ПСГ Мринське.Р ВОГ", "name": "ПСГ Мринське.P ВОГ", "short_name" :"P","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 181,"full_name":"Мринське ВУПЗГ.ПСГ Мринське.Стан ПСГ", "name": "ПСГ Мринське.Стан ПСГ", "short_name" :"стан","eu": "", "min":"0", "max":"2", "control_id":9},
        { "_id": 112,"full_name":"Мринське ВУПЗГ.ПСГ Олишівка.Q ВОГ", "name": "ПСГ Олишівка.Q ВОГ", "short_name" :"Q","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 195,"full_name":"Мринське ВУПЗГ.ПСГ Олишівка.ДКС Олишівка.N ГПА в роботі", "name": "ПСГ Олишівка.ДКС Олишівка.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"7", "control_id":7},
        { "_id": 138,"full_name":"Мринське ВУПЗГ.ПСГ Олишівка.ДКС Олишівка.Рвих КС", "name": "ДКС Олишівка.Рвих КС", "short_name" :"Рвих КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 154,"full_name":"Мринське ВУПЗГ.ПСГ Олишівка.ДКС Олишівка.Рвх КС", "name": "ДКС Олишівка.Рвх КС", "short_name" :"Рвх КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 169,"full_name":"Мринське ВУПЗГ.ПСГ Олишівка.К-сть свердловин", "name": "ПСГ Олишівка.К-сть свердловин", "short_name" :"с.роб","eu": "од", "min":"0", "max":"27", "control_id":7},
        { "_id": 127,"full_name":"Мринське ВУПЗГ.ПСГ Олишівка.Р ВОГ", "name": "ПСГ Олишівка.Р ВОГ", "short_name" :"Р","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 183,"full_name":"Мринське ВУПЗГ.ПСГ Олишівка.Стан ПСГ", "name": "ПСГ Олишівка.Стан ПСГ", "short_name" :"стан","eu": "", "min":"0", "max":"2", "control_id":9},
        { "_id": 111,"full_name":"Мринське ВУПЗГ.ПСГ Солоха.Q ВОГ", "name": "ПСГ Солоха.Q ВОГ", "short_name" :"Q","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 194,"full_name":"Мринське ВУПЗГ.ПСГ Солоха.ДКС Солоха.N ГПА в роботі", "name": "ДКС Солоха.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"10", "control_id":7},
        { "_id": 137,"full_name":"Мринське ВУПЗГ.ПСГ Солоха.ДКС Солоха.Рвих КС", "name": "ДКС Солоха.Рвих КС", "short_name" :"Рвих КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 153,"full_name":"Мринське ВУПЗГ.ПСГ Солоха.ДКС Солоха.Рвх КС", "name": "ДКС Солоха.Рвх КС", "short_name" :"Рвх КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 168,"full_name":"Мринське ВУПЗГ.ПСГ Солоха.К-сть свердловин", "name": "ПСГ Солоха.К-сть свердловин", "short_name" :"с.роб","eu": "од", "min":"0", "max":"81", "control_id":7},
        { "_id": 126,"full_name":"Мринське ВУПЗГ.ПСГ Солоха.Р ВОГ", "name": "ПСГ Солоха.Р ВОГ", "short_name" :"Р","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 182,"full_name":"Мринське ВУПЗГ.ПСГ Солоха.Стан ПСГ", "name": "ПСГ Солоха.Стан ПСГ", "short_name" :"стан","eu": "", "min":"0", "max":"2", "control_id":9},
        { "_id": 114,"full_name":"Опарське ВУПЗГ.ПСГ Опарське.Q ВОГ", "name": "ПСГ Опарське.Q ВОГ", "short_name" :"Q","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 197,"full_name":"Опарське ВУПЗГ.ПСГ Опарське.ДКС-1 Опари.N ГПА в роботі", "name": "ДКС-1 Опари.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"15", "control_id":7},
        { "_id": 140,"full_name":"Опарське ВУПЗГ.ПСГ Опарське.ДКС-1 Опари.Рвих КС", "name": "ДКС-1 Опари.Рвих КС", "short_name" :"Рвих КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 156,"full_name":"Опарське ВУПЗГ.ПСГ Опарське.ДКС-1 Опари.Рвх КС", "name": "ДКС-1 Опари.Рвх КС", "short_name" :"Рвх КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 198,"full_name":"Опарське ВУПЗГ.ПСГ Опарське.ДКС-2 Опари.N ГПА в роботі", "name": "ДКС-2 Опари.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"4", "control_id":7},
        { "_id": 102,"full_name":"Опарське ВУПЗГ.ПСГ Опарське.ДКС-2 Опари.Рвих КС", "name": "ДКС-2 Опари.Рвих КС", "short_name" :"Р","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 101,"full_name":"Опарське ВУПЗГ.ПСГ Опарське.ДКС-2 Опари.Рвх КС", "name": "ДКС-2 Опари.Рвх КС", "short_name" :"Р","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 171,"full_name":"Опарське ВУПЗГ.ПСГ Опарське.К-сть свердловин", "name": "ПСГ Опарське.К-сть свердловин", "short_name" :"с.роб","eu": "од", "min":"0", "max":"76", "control_id":7},
        { "_id": 129,"full_name":"Опарське ВУПЗГ.ПСГ Опарське.Р ВОГ", "name": "ПСГ Опарське.Р ВОГ", "short_name" :"Р","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 185,"full_name":"Опарське ВУПЗГ.ПСГ Опарське.Стан ПСГ", "name": "ПСГ Опарське.Стан ПСГ", "short_name" :"стан","eu": "", "min":"0", "max":"2", "control_id":9},
        { "_id": 124,"full_name":"Пролетарське ВУПЗГ.ПСГ Кегичівське.Q ВОГ", "name": "ПСГ Кегичівське.Q ВОГ", "short_name" :"Q","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 165,"full_name":"Пролетарське ВУПЗГ.ПСГ Кегичівське.ДКС Кегичівка.Рвх КС", "name": "КС Кегичівка.Рвх КС", "short_name" :"Рвх КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 207,"full_name":"Пролетарське ВУПЗГ.ПСГ Кегичівське.ДКС Кегичівка.N ГПА в роботі", "name": "КС Кегичівка.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"3", "control_id":7},
        { "_id": 149,"full_name":"Пролетарське ВУПЗГ.ПСГ Кегичівське.ДКС Кегичівка.Рвих КС", "name": "КС Кегичівка.Рвих КС", "short_name" :"Рвих КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 179,"full_name":"Пролетарське ВУПЗГ.ПСГ Кегичівське.К-сть свердловин", "name": "ПСГ Кегичівське.К-сть свердловин", "short_name" :"с.роб","eu": "од", "min":"0", "max":"67", "control_id":7},
        { "_id": 133,"full_name":"Пролетарське ВУПЗГ.ПСГ Кегичівське.Р ВОГ", "name": "ПСГ Кегичівське.Р ВОГ", "short_name" :"Р","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 190,"full_name":"Пролетарське ВУПЗГ.ПСГ Кегичівське.Стан ПСГ", "name": "ПСГ Кегичівське.Стан ПСГ", "short_name" :"стан","eu": "", "min":"0", "max":"2", "control_id":9},
        { "_id": 125,"full_name":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.Q ВОГ", "name": "ПСГ Краснопопівське.Q ВОГ", "short_name" :"Q","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 150,"full_name":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.ДКС Краснопопіка.Рвих КС", "name": "КС Краснопопівка.Рвих КС", "short_name" :"Рвих КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 166,"full_name":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.ДКС Краснопопіка.Рвх КС", "name": "КС Краснопопівка.Рвх КС", "short_name" :"Рвх КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 208,"full_name":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.ДКС Краснопопіка.N ГПА в роботі", "name": "КС Краснопопівка.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"3", "control_id":7},
        { "_id": 180,"full_name":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.К-сть свердловин", "name": "ПСГ Краснопопівське.К-сть свердловин", "short_name" :"с.роб","eu": "од", "min":"0", "max":"100", "control_id":7},
        { "_id": 134,"full_name":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.Р ВОГ", "name": "ПСГ Краснопопівське.Р ВОГ", "short_name" :"Р","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 191,"full_name":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.Стан ПСГ", "name": "ПСГ Краснопопівське.Стан ПСГ", "short_name" :"стан","eu": "", "min":"0", "max":"2", "control_id":9},
        { "_id": 123,"full_name":"Пролетарське ВУПЗГ.ПСГ Пролетарське.Q ВОГ", "name": "ПСГ Пролетарське.Q ВОГ", "short_name" :"Q","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 206,"full_name":"Пролетарське ВУПЗГ.ПСГ Пролетарське.ДКС Пролетарка.N ГПА в роботі", "name": "КС Пролетарка.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"3", "control_id":7},
        { "_id": 148,"full_name":"Пролетарське ВУПЗГ.ПСГ Пролетарське.ДКС Пролетарка.Рвих КС", "name": "КС Пролетарка.Рвих КС", "short_name" :"Рвих КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 164,"full_name":"Пролетарське ВУПЗГ.ПСГ Пролетарське.ДКС Пролетарка.Рвх КС", "name": "КС Пролетарка.Рвх КС", "short_name" :"Рвх КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 178,"full_name":"Пролетарське ВУПЗГ.ПСГ Пролетарське.К-сть свердловин", "name": "ПСГ Пролетарське.К-сть свердловин", "short_name" :"с.роб","eu": "од", "min":"0", "max":"100", "control_id":7},
        { "_id": 132,"full_name":"Пролетарське ВУПЗГ.ПСГ Пролетарське.Р ВОГ", "name": "ПСГ Пролетарське.Р ВОГ", "short_name" :"Р","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 189,"full_name":"Пролетарське ВУПЗГ.ПСГ Пролетарське.Стан ПСГ", "name": "ПСГ Пролетарське.Стан ПСГ", "short_name" :"стан","eu": "", "min":"0", "max":"2", "control_id":9},
        { "_id": 105,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.P ВОГ ГЗП-1", "name": "ПСГ Більче-Волиця.P ВОГ ГЗП-1", "short_name" :"P1","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 106,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.P ВОГ ГЗП-2", "name": "ПСГ Більче-Волиця.P ВОГ ГЗП-2", "short_name" :"P2","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 107,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.P ВОГ ГЗП-3", "name": "ПСГ Більче-Волиця.P ВОГ ГЗП-3", "short_name" :"P3","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 108,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.P ВОГ ГЗП-4", "name": "ПСГ Більче-Волиця.P ВОГ ГЗП-4", "short_name" :"P4","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 117,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Q ВОГ 5,5 МПа", "name": "ПСГ Більче-Волиця.Q ВОГ 5,5 МПа", "short_name" :"Q 5.5","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 118,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Q ВОГ 7,5 МПа", "name": "ПСГ Більче-Волиця.Q ВОГ 7,5 МПа", "short_name" :"Q 7.5","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 119,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Q ВОГ ГЗП-1", "name": "ПСГ Більче-Волиця.Q ВОГ ГЗП-1", "short_name" :"Q1","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 120,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Q ВОГ ГЗП-2", "name": "ПСГ Більче-Волиця.Q ВОГ ГЗП-2", "short_name" :"Q2","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 121,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Q ВОГ ГЗП-3", "name": "ПСГ Більче-Волиця.Q ВОГ ГЗП-3", "short_name" :"Q3","eu": "тис.м3", "min":"0", "max":"100", "control_id":7},
        { "_id": 122,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Q ВОГ ГЗП-4", "name": "ПСГ Більче-Волиця.Q ВОГ ГЗП-4", "short_name" :"Q4","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 174,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.ГЗП-1.К-сть свердловин", "name": "ПСГ Більче-Волиця.ГЗП-1.К-сть свердловин", "short_name" :"с.роб.1","eu": "од", "min":"0", "max":"70", "control_id":7},
        { "_id": 175,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.ГЗП-2.К-сть свердловин", "name": "ПСГ Більче-Волиця.ГЗП-2.К-сть свердловин", "short_name" :"с.роб.2","eu": "од", "min":"0", "max":"75", "control_id":7},
        { "_id": 176,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.ГЗП-3.К-сть свердловин", "name": "ПСГ Більче-Волиця.ГЗП-3.К-сть свердловин", "short_name" :"с.роб.3","eu": "од", "min":"0", "max":"119", "control_id":7},
        { "_id": 177,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.ГЗП-4.К-сть свердловин", "name": "ПСГ Більче-Волиця.ГЗП-4.К-сть свердловин", "short_name" :"с.роб.4","eu": "од", "min":"0", "max":"103", "control_id":7},
        { "_id": 201,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-1 Більче-Волиця.N ГПА в роботі", "name": "КЦ-1 Більче-Волиця.N ГПА в роботі", "short_name" :"NГПА-1","eu": "од", "min":"0", "max":"8", "control_id":7},
        { "_id": 143,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-1 Більче-Волиця.Рвих КС", "name": "КЦ-1 Більче-Волиця.Рвих КС", "short_name" :"Рвих КС1","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 159,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-1 Більче-Волиця.Рвх КС", "name": "КЦ-1 Більче-Волиця.Рвх КС", "short_name" :"Рвх КС1","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 202,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-1А Більче-Волиця.N ГПА в роботі", "name": "КЦ-1А Більче-Волиця.N ГПА в роботі", "short_name" :"N ГПА-1А","eu": "од", "min":"0", "max":"4", "control_id":7},
        { "_id": 144,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-1А Більче-Волиця.Рвих КС", "name": "КЦ-1А Більче-Волиця.Рвих КС", "short_name" :"Рвих КС1А","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 160,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-1А Більче-Волиця.Рвх КС", "name": "КЦ-1А Більче-Волиця.Рвх КС", "short_name" :"Рвх КС1А","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 203,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-2 Більче-Волиця.N ГПА в роботі", "name": "КЦ-2 Більче-Волиця.N ГПА в роботі", "short_name" :"N ГПА-2","eu": "од", "min":"0", "max":"6", "control_id":7},
        { "_id": 145,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-2 Більче-Волиця.Рвих КС", "name": "КЦ-2 Більче-Волиця.Рвих КС", "short_name" :"Рвих КС2","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 161,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-2 Більче-Волиця.Рвх КС", "name": "КЦ-2 Більче-Волиця.Рвх КС", "short_name" :"Рвх КС2","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 204,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-3 Більче-Волиця.N ГПА в роботі", "name": "КЦ-3 Більче-Волиця.N ГПА в роботі", "short_name" :"N ГПА-3","eu": "од", "min":"0", "max":"5", "control_id":7},
        { "_id": 146,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-3 Більче-Волиця.Рвих КС", "name": "КЦ-3 Більче-Волиця.Рвих КС", "short_name" :"Рвих КС3","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 162,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-3 Більче-Волиця.Рвх КС", "name": "КЦ-3 Більче-Волиця.Рвх КС", "short_name" :"Рвх КС3","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 205,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-4 Більче-Волиця.N ГПА в роботі", "name": "КЦ-4 Більче-Волиця.N ГПА в роботі", "short_name" :"N ГПА-4","eu": "од", "min":"0", "max":"5", "control_id":7},
        { "_id": 147,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-4 Більче-Волиця.Рвих КС", "name": "КЦ-4 Більче-Волиця.Рвих КС", "short_name" :"Рвих КС4","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 163,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.КЦ-4 Більче-Волиця.Рвх КС", "name": "КЦ-4 Більче-Волиця.Рвх КС", "short_name" :"Рвх КС4","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 103,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Р ВОГ 5,5 МПа", "name": "ПСГ Більче-Волиця.Р ВОГ 5,5 МПа", "short_name" :"P 5.5","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 104,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Р ВОГ 7,5 МПа", "name": "ПСГ Більче-Волиця.Р ВОГ 7,5 МПа", "short_name" :"P 7.5","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 188,"full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Стан ПСГ", "name": "ПСГ Більче-Волиця.Стан ПСГ", "short_name" :"стан","eu": "", "min":"0", "max":"2", "control_id":9},
        { "_id": 116,"full_name":"Стрийське ВУПЗГ.ПСГ Угерське.Q ВОГ", "name": "ПСГ Угерське.Q ВОГ", "short_name" :"Q","eu": "тис.м3", "min":"0", "max":"3000", "control_id":7},
        { "_id": 200,"full_name":"Стрийське ВУПЗГ.ПСГ Угерське.ДКС Угерське.N ГПА в роботі", "name": "ДКС Угерське.N ГПА в роботі", "short_name" :"ГПА","eu": "од", "min":"0", "max":"20", "control_id":7},
        { "_id": 142,"full_name":"Стрийське ВУПЗГ.ПСГ Угерське.ДКС Угерське.Рвих КС", "name": "ДКС Угерське.Рвих КС", "short_name" :"Рвих КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 158,"full_name":"Стрийське ВУПЗГ.ПСГ Угерське.ДКС Угерське.Рвх КС", "name": "ДКС Угерське.Рвх КС", "short_name" :"Рвх КС","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 173,"full_name":"Стрийське ВУПЗГ.ПСГ Угерське.К-сть свердловин", "name": "ПСГ Угерське.К-сть свердловин", "short_name" :"с.роб","eu": "од", "min":"0", "max":"63", "control_id":7},
        { "_id": 131,"full_name":"Стрийське ВУПЗГ.ПСГ Угерське.Р ВОГ", "name": "ПСГ Угерське.Р ВОГ", "short_name" :"Р","eu": "кгс/см2", "min":"0", "max":"100", "control_id":7},
        { "_id": 187,"full_name":"Стрийське ВУПЗГ.ПСГ Угерське.Стан ПСГ", "name": "ПСГ Угерське.Стан ПСГ", "short_name" :"стан","eu": "", "min":"0", "max":"2", "control_id":9},
                               

        
    ]

    db.createMany(DbPoint, points)

}

function GenerateTestForms() {
    let forms = [


        { "_id": 1,"title":"Мринське ВУПЗГ.ПСГ Мринське.Режим", "point_controls": [1,5, 151,135,192,152,136,193,167]},
        { "_id": 2,"title":"Мринське ВУПЗГ.ПСГ Мринське.ВОГ", "point_controls": [1,5, 109,110]},
        { "_id": 3,"title":"Мринське ВУПЗГ.ПСГ Мринське.Стан", "point_controls": [1,5, 181]},
        { "_id": 4,"title":"Мринське ВУПЗГ.ПСГ Олищівка.Режим", "point_controls": [1,5, 154,138,195,169]},
        { "_id": 5,"title":"Мринське ВУПЗГ.ПСГ Солоха.Режим", "point_controls": [1,5, 153,137,194]},
        { "_id": 6,"title":"Мринське ВУПЗГ.ПСГ Олищівка.ВОГ", "point_controls": [1,5, 127,112]},
        { "_id": 7,"title":"Мринське ВУПЗГ.ПСГ Солоха.ВОГ", "point_controls": [1,5, 126,111]},
        { "_id": 8,"title":"Мринське ВУПЗГ.ПСГ Олищівка.Стан", "point_controls": [1,5, 183]},
        { "_id": 9,"title":"Мринське ВУПЗГ.ПСГ Солоха.Стан", "point_controls": [1,5, 182]},
        { "_id": 10,"title":"Богородчанське ВУПЗГ.ПСГ Богородчани.Режим", "point_controls": [1,5, 155,139,196,170]},
        { "_id": 11,"title":"Богородчанське ВУПЗГ.ПСГ Богородчани.ВОГ", "point_controls": [1,5, 113,128]},
        { "_id": 12,"title":"Богородчанське ВУПЗГ.ПСГ Богородчани.Стан", "point_controls": [1,5, 184]},
        { "_id": 13,"title":"Опарське ВУПЗГ.ПСГ Опарське.Режим", "point_controls": [1,5, 156,140,197,101,102,198,171]},
        { "_id": 14,"title":"Опарське ВУПЗГ.ПСГ Опарське.ВОГ", "point_controls": [1,5, 129,114]},
        { "_id": 15,"title":"Опарське ВУПЗГ.ПСГ Опарське.Стан", "point_controls": [1,5, 185]},
        { "_id": 16,"title":"Дашавське ВУПЗГ.ПСГ Дашавське.Режим", "point_controls": [1,5, 157,141,199,171]},
        { "_id": 17,"title":"Дашавське ВУПЗГ.ПСГ Дашавське.ВОГ", "point_controls": [1,5, 130,115]},
        { "_id": 18,"title":"Дашавське ВУПЗГ.ПСГ Дашавське.Стан", "point_controls": [1,5, 186]},
        { "_id": 19,"title":"Стрийське ВУПЗГ.ПСГ Угерське.Режим", "point_controls": [1,5, 158,142,200]},
        { "_id": 20,"title":"Стрийське ВУПЗГ.ПСГ Угерське.ВОГ", "point_controls": [1,5, 131,116]},
        { "_id": 21,"title":"Стрийське ВУПЗГ.ПСГ Угерське.Стан", "point_controls": [1,5, 187]},
        { "_id": 22,"title":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Режим", "point_controls": [1,5, 159,143,201,160,144,202,161,145,203,162,146,204,163,147,205]},
        { "_id": 23,"title":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.ВОГ", "point_controls": [1,5, 103,117,104,118]},
        { "_id": 24,"title":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Стан", "point_controls": [1,5, 188]},
        { "_id": 25,"title":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.ГЗП", "point_controls": [1,5, 105,106,107,108,119,120,121,122,174,175,176,177]},
        { "_id": 26,"title":"Пролетарське ВУПЗГ.ПСГ Пролетарське.Режим", "point_controls": [1,5, 164,148,206,178]},
        { "_id": 27,"title":"Пролетарське ВУПЗГ.ПСГ Пролетарське.ВОГ", "point_controls": [1,5, 132,123]},
        { "_id": 28,"title":"Пролетарське ВУПЗГ.ПСГ Пролетарське.Стан", "point_controls": [1,5, 189]},
        { "_id": 29,"title":"Пролетарське ВУПЗГ.ПСГ Кегичівське.Режим", "point_controls": [1,5, 165,149,207,179]},
        { "_id": 30,"title":"Пролетарське ВУПЗГ.ПСГ Кегичівське.ВОГ", "point_controls": [1,5, 133,124]},
        { "_id": 31,"title":"Пролетарське ВУПЗГ.ПСГ Кегичівське.Стан", "point_controls": [1,5, 190]},
        { "_id": 32,"title":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.Режим", "point_controls": [1,5, 166,150,208,180]},
        { "_id": 33,"title":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.ВОГ", "point_controls": [1,5, 134,125]},
        { "_id": 34,"title":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.Стан", "point_controls": [1,5, 191]},
                
        

    ]
    db.createMany(Form, forms)
}

function GenerateTestMenu() {
    let menus = [  


        { "_id": "1","full_name":"ПСГ","name":"ПСГ", "children": ['1.1','1.2','1.3','1.4','1.5','1.6','1.7','1.8','1.9','1.10','1.11'], "payload": {}},
        { "_id": "1.1","full_name":"Мринське ВУПЗГ.ПСГ Мринське","name":"Мринське", "children": ['1.1.1','1.1.2','1.1.3'], "payload": {}},
        { "_id": "1.2","full_name":"Мринське ВУПЗГ.ПСГ Олищівка","name":"Олищівка", "children": ['1.2.1','1.2.2','1.2.3'], "payload": {}},
        { "_id": "1.3","full_name":"Мринське ВУПЗГ.ПСГ Солоха","name":"Солоха", "children": ['1.3.1','1.3.2','1.3.3'], "payload": {}},
        { "_id": "1.4","full_name":"Дашавське ВУПЗГ.ПСГ Дашавське","name":"Дашавське", "children": ['1.4.1','1.4.2','1.4.3'], "payload": {}},
        { "_id": "1.5","full_name":"Опарське ВУПЗГ.ПСГ Опарське","name":"Опарське", "children": ['1.5.1','1.5.2','1.5.3'], "payload": {}},
        { "_id": "1.6","full_name":"Богородчанське ВУПЗГ.ПСГ Богородчани","name":"Богородчани", "children": ['1.6.1','1.6.2','1.6.3'], "payload": {}},
        { "_id": "1.7","full_name":"Стрийське ВУПЗГ.ПСГ Угерське","name":"Угерське", "children": ['1.7.1','1.7.2','1.7.3'], "payload": {}},
        { "_id": "1.8","full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця","name":"Більче-Волиця", "children": ['1.8.1','1.8.2','1.8.3','1.8.4'], "payload": {}},
        { "_id": "1.9","full_name":"Пролетарське ВУПЗГ.ПСГ Пролетарське","name":"Пролетарське", "children": ['1.9.1','1.9.2','1.9.3'], "payload": {}},
        { "_id": "1.10","full_name":"Пролетарське ВУПЗГ.ПСГ Кегичівське","name":"Кегичівське", "children": ['1.10.1','1.10.2','1.10.3'], "payload": {}},
        { "_id": "1.11","full_name":"Пролетарське ВУПЗГ.ПСГ Краснопопівське","name":"Краснопопівське", "children": ['1.11.1','1.11.2','1.11.3'], "payload": {}},
        { "_id": "1.1.1","full_name":"Мринське ВУПЗГ.ПСГ Мринське.Режим","name":"Режим", "children": [], "payload": { "_id": 1}},
        { "_id": "1.1.2","full_name":"Мринське ВУПЗГ.ПСГ Мринське.ВОГ","name":"ВОГ", "children": [], "payload": { "_id": 2}},
        { "_id": "1.1.3","full_name":"Мринське ВУПЗГ.ПСГ Мринське.Стан","name":"Стан", "children": [], "payload": { "_id": 3}},
        { "_id": "1.2.1","full_name":"Мринське ВУПЗГ.ПСГ Олищівка.Режим","name":"Ржим", "children": [], "payload": { "_id": 4}},
        { "_id": "1.3.1","full_name":"Мринське ВУПЗГ.ПСГ Солоха.Режим","name":"Режим", "children": [], "payload": { "_id": 5}},
        { "_id": "1.2.2","full_name":"Мринське ВУПЗГ.ПСГ Олищівка.ВОГ","name":"ВОГ", "children": [], "payload": { "_id": 6}},
        { "_id": "1.3.2","full_name":"Мринське ВУПЗГ.ПСГ Солоха.ВОГ","name":"ВОГ", "children": [], "payload": { "_id": 7}},
        { "_id": "1.2.3","full_name":"Мринське ВУПЗГ.ПСГ Олищівка.Стан","name":"Стан", "children": [], "payload": { "_id": 8}},
        { "_id": "1.3.3","full_name":"Мринське ВУПЗГ.ПСГ Солоха.Стан","name":"Стан", "children": [], "payload": { "_id": 9}},
        { "_id": "1.6.1","full_name":"Богородчанське ВУПЗГ.ПСГ Богородчани.Режим","name":"Режим", "children": [], "payload": { "_id": 10}},
        { "_id": "1.6.2","full_name":"Богородчанське ВУПЗГ.ПСГ Богородчани.ВОГ","name":"ВОГ", "children": [], "payload": { "_id": 11}},
        { "_id": "1.6.3","full_name":"Богородчанське ВУПЗГ.ПСГ Богородчани.Стан","name":"Стан", "children": [], "payload": { "_id": 12}},
        { "_id": "1.5.1","full_name":"Опарське ВУПЗГ.ПСГ Опарське.Режим","name":"Режим", "children": [], "payload": { "_id": 13}},
        { "_id": "1.5.2","full_name":"Опарське ВУПЗГ.ПСГ Опарське.ВОГ","name":"ВОГ", "children": [], "payload": { "_id": 14}},
        { "_id": "1.5.3","full_name":"Опарське ВУПЗГ.ПСГ Опарське.Стан","name":"Стан", "children": [], "payload": { "_id": 15}},
        { "_id": "1.4.1","full_name":"Дашавське ВУПЗГ.ПСГ Дашавське.Режим","name":"Режим", "children": [], "payload": { "_id": 16}},
        { "_id": "1.4.2","full_name":"Дашавське ВУПЗГ.ПСГ Дашавське.ВОГ","name":"ВОГ", "children": [], "payload": { "_id": 17}},
        { "_id": "1.4.3","full_name":"Дашавське ВУПЗГ.ПСГ Дашавське.Стан","name":"Стан", "children": [], "payload": { "_id": 18}},
        { "_id": "1.7.1","full_name":"Стрийське ВУПЗГ.ПСГ Угерське.Режим","name":"Режим", "children": [], "payload": { "_id": 19}},
        { "_id": "1.7.2","full_name":"Стрийське ВУПЗГ.ПСГ Угерське.ВОГ","name":"ВОГ", "children": [], "payload": { "_id": 20}},
        { "_id": "1.7.3","full_name":"Стрийське ВУПЗГ.ПСГ Угерське.Стан","name":"Стан", "children": [], "payload": { "_id": 21}},
        { "_id": "1.8.1","full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Режим","name":"Режим", "children": [], "payload": { "_id": 22}},
        { "_id": "1.8.2","full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.ВОГ","name":"ВОГ", "children": [], "payload": { "_id": 23}},
        { "_id": "1.8.3","full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.Стан","name":"Стан", "children": [], "payload": { "_id": 24}},
        { "_id": "1.8.4","full_name":"Стрийське ВУПЗГ.ПСГ Більче-Волиця.ГЗП","name":"ГЗП", "children": [], "payload": { "_id": 25}},
        { "_id": "1.9.1","full_name":"Пролетарське ВУПЗГ.ПСГ Пролетарське.Режим","name":"Режим", "children": [], "payload": { "_id": 26}},
        { "_id": "1.9.2","full_name":"Пролетарське ВУПЗГ.ПСГ Пролетарське.ВОГ","name":"ВОГ", "children": [], "payload": { "_id": 27}},
        { "_id": "1.9.3","full_name":"Пролетарське ВУПЗГ.ПСГ Пролетарське.Стан","name":"Стан", "children": [], "payload": { "_id": 28}},
        { "_id": "1.10.1","full_name":"Пролетарське ВУПЗГ.ПСГ Кегичівське.Режим","name":"Режим", "children": [], "payload": { "_id": 29}},
        { "_id": "1.10.2","full_name":"Пролетарське ВУПЗГ.ПСГ Кегичівське.ВОГ","name":"ВОГ", "children": [], "payload": { "_id": 30}},
        { "_id": "1.10.3","full_name":"Пролетарське ВУПЗГ.ПСГ Кегичівське.Стан","name":"Стан", "children": [], "payload": { "_id": 31}},
        { "_id": "1.11.1","full_name":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.Режим","name":"Режим", "children": [], "payload": { "_id": 32}},
        { "_id": "1.11.2","full_name":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.ВОГ","name":"ВОГ", "children": [], "payload": { "_id": 33}},
        { "_id": "1.11.3","full_name":"Пролетарське ВУПЗГ.ПСГ Краснопопівське.Стан","name":"Стан", "children": [], "payload": { "_id": 34}},
                        
        

    ]
    db.createMany(Menu, menus)
}