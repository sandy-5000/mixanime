import express from "express"
import bodyParser from "body-parser"
import UserController from "../controllers/user.js"

const app = express.Router()
app.use(bodyParser.urlencoded({ extended: false }))

const userCtrl = UserController()

app.route('/login')
    .get(async (req, res) => {
        if (req.session.user) {
            return res.render('login.html', { type: 'other', route: '/home' })
        }
        return res.render('login.html', { type: 'login' })
    })
    .post(async (req, res) => {
        const { usermail, passwd } = req.body
        const data = await userCtrl.authenticate({ usermail, passwd })
        if (data.status == 404) {
            return res.render('login.html', { type: 'login', error: 'Usermail or password incorrect!' })
        }
        req.session.user = data
        // console.log(data.result)
        return res.render('login.html', { type: 'other', route: '/home' })
    })

app.route('/logout')
    .get(async (req, res) => {
        req.session.destroy(err => {
            res.render('login.html', { type: 'login' })
        })
    })

app.route('/register')
    .get(async (req, res) => {
        if (req.session.user) {
            res.render('login.html', { type: 'other', route: '/home' })
            return
        }
        res.render('login.html', { type: 'register' })
    })
    .post(async (req, res) => {
        const { username, usermail, passwd, cpasswd } = req.body
        if (cpasswd != passwd) {
            return res.render('login.html', { type: 'register', error: 'Password does\'t match!' })
        }
        if (passwd.length < 8) {
            return res.render('login.html', { type: 'register', error: 'Password too short!' })
        }
        const data = await userCtrl.createUser({ username, usermail, passwd })
        if (data.status == 400) {
            return res.render('login.html', { type: 'register', error: data.result })
        }
        return res.render('login.html', { usermail: data.result.email, type: 'login' })
    })

app.route('/profile')
    .get(async (req, res) => {
        if (!req.session.user) {
            return res.render('login.html', { type: 'login' })
        }
        return res.render('profile.html', { logged: 'logout', user: req.session.user.result })
    })
    .post(async (req, res) => {
        if (!req.session.user) {
            return res.send('User not logged in')
        }
        const email = req.session.user.result.email
        const { username, passwd, npasswd } = req.body
        const data = await userCtrl.updateUser({ email, username, passwd, npasswd })
        if (data.result != null) {
            req.session.user = data
        }
        return res.render('login.html', { type: 'other', route: '/user/profile' })
    })

app.route('/add-to-list')
    .post(async (req, res) => {
        if (!req.session.user) {
            return res.status(403).json({ message: 'User not logged in' })
        }
        const email = req.session.user.result.email
        const { id, title, coverImage } = req.body
        console.log(req.body)
        if (!id || id == '') {
            return res.status(400).json({ id: null })
        }
        if (req.session.user.result.userList.filter(x => x.id == id).length > 0) {
            return res.status(201).json({ id, message: 'Already Added' })
        }
        const data = await userCtrl.addToList({ email, id, title, coverImage })
        console.log(data)
        if (data.result != null) {
            req.session.user = data
        }
        return res.status(data.status).json({ id })
    })

const user = app
export default user
