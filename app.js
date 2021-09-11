const helpers = require('./_helpers')
const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./config/passport')


const app = express()
const port = 3000

app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  // res.locals.user = req.user
  // for test 用helpers.getUser(req)取代req.user，因為執行測試時，不能直接在測試設定檔裡呼叫第三方套件的函式，只能呼叫自己定義的函式。
  res.locals.user = helpers.getUser(req)
  next()
})

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = helpers.getUser(req) // 取代req.user
  next()
})

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))

// const routes = require('./routes')
// app.use(routes)
require('./routes')(app, passport)

module.exports = app
