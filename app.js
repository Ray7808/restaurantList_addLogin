//載入套件與檔案
const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes') // 預設會抓index.js
const session = require('express-session')
const usePassport = require('./config/passport') //要寫在express-session之後(要載入設定檔)
const flash = require('connect-flash')

require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

//Template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

//middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true })) //拿到瀏覽器回傳的資料
app.use(methodOverride('_method'))
app.use(
    session({
        secret: process.env.SESSION_SECRET, //可隨機
        resave: false, // 不會隨每次跟使用者互動後更新session
        saveUninitialized: true, // 強制將未初始化的session存回session store，未初始化表示這session是新的且未被修改過
    })
)
usePassport(app) // 呼叫passport函式並載入app，要寫在路由之前

app.use(flash())

app.use((req, res, next) => {
    //將是否驗證跟user資訊輸入至本地變數locals
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
    next()
})

app.use(routes)

app.listen(port, () => {
    console.log(`Now you are listening http://localhost:${port}`)
})
