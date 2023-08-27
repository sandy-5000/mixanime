import express from "express"
import bodyParser from "body-parser"
import UserController from "../controllers/user.js"

const app = express.Router()
app.use(bodyParser.urlencoded({ extended: false }))

const userCtrl = UserController()

app.route('/login')
    .get(async (req, res) => {
        res.render('login.html', { type: 'login' })
    })
    .post(async (req, res) => {
        const { usermail, passwd } = req.body
        const data = await userCtrl.authenticate({ usermail, passwd })
        if (data.status == 404) {
            res.render('login.html', { type: 'login' })
            return
        }
        res.render('login.html', { type: 'home' })
    })

app.route('/register')
    .get(async (req, res) => {
        res.render('login.html', { type: 'register' })
    })
    .post(async (req, res) => {
        const { username, usermail, passwd, cpasswd } = req.body
        if (cpasswd != passwd) {
            res.render('login.html', { type: 'register' })
            return
        }
        const data = await userCtrl.createUser({ username, usermail, passwd })
        if (data.status == 400) {
            res.render('login.html', { type: 'register' })
            return
        }
        res.render('login.html', { usermail: data.result.email, type: 'login' })
    })

const user = app
export default user
