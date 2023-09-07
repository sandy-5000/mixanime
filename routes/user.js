import express from "express"
import bodyParser from "body-parser"
import UserController from "../controllers/user.js"

const app = express.Router()
app.use(bodyParser.urlencoded({ extended: false }))

const userCtrl = UserController()
const listCache = new Map()

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
        const user_id = data.result.id
        listCache.set(user_id, new Set())
        for (const item of data.result.userList) {
            listCache.get(user_id).add('userList-' + item.id)
        }
        for (const item of data.result.favourites) {
            listCache.get(user_id).add('favourites-' + item.id)
        }
        return res.render('login.html', { type: 'other', route: '/home' })
    })

app.route('/logout')
    .get(async (req, res) => {
        try {
            listCache.delete(req.session.user.result._id)
            req.session.destroy(err => {
                return res.render('login.html', { type: 'login' })
            })
        } catch (err) {
            return res.render('login.html', { type: 'other', route: '/user/login' })
        }
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
        const user_id = req.session.user.result._id
        const { id, title, coverImage } = req.body
        if (!id || id == '') {
            return res.status(400).json({ id: null })
        }
        if (!listCache.has(user_id)) {
            listCache.set(user_id, new Set())
        }
        if (listCache.get(user_id).has('userList-' + id)) {
            return res.status(201).json({ id, message: 'Already Added' })
        }
        const data = await userCtrl.addToList({ email, id, title, coverImage })
        if (data.result != null) {
            req.session.user = data
            listCache.get(user_id).add('userList-' + id)
        }
        return res.status(data.status).json({ id })
    })

app.route('/remove-from-list')
    .post(async (req, res) => {
        if (!req.session.user) {
            return res.status(403).json({ message: 'User not logged in' })
        }
        const email = req.session.user.result.email
        const user_id = req.session.user.result._id
        const { id } = req.body
        if (!id || id == '') {
            return res.status(400).json({ id: null })
        }
        if (!listCache.has(user_id)) {
            listCache.set(user_id, new Set())
        }
        if (!listCache.get(user_id).has('userList-' + id)) {
            return res.status(201).json({ id, message: 'Already Removed' })
        }
        const data = await userCtrl.removeFromList({ email, id })
        if (data.result != null) {
            req.session.user = data
            listCache.get(user_id).delete('userList-' + id)
        }
        return res.status(data.status).json({ id })
    })

app.route('/add-to-favourites')
    .post(async (req, res) => {
        if (!req.session.user) {
            return res.status(403).json({ message: 'User not logged in' })
        }
        const email = req.session.user.result.email
        const user_id = req.session.user.result._id
        const { id, title, coverImage } = req.body
        if (!id || id == '') {
            return res.status(400).json({ id: null })
        }
        if (!listCache.has(user_id)) {
            listCache.set(user_id, new Set())
        }
        if (listCache.get(user_id).has('favourites-' + id)) {
            return res.status(201).json({ id, message: 'Already Added' })
        }
        const data = await userCtrl.addToFavourites({ email, id, title, coverImage })
        if (data.result != null) {
            req.session.user = data
            listCache.get(user_id).add('favourites-' + id)
        }
        return res.status(data.status).json({ id })
    })

app.route('/remove-from-favourites')
    .post(async (req, res) => {
        if (!req.session.user) {
            return res.status(403).json({ message: 'User not logged in' })
        }
        const email = req.session.user.result.email
        const user_id = req.session.user.result._id
        const { id } = req.body
        if (!id || id == '') {
            return res.status(400).json({ id: null })
        }
        if (!listCache.has(user_id)) {
            listCache.set(user_id, new Set())
        }
        if (!listCache.get(user_id).has('favourites-' + id)) {
            return res.status(201).json({ id, message: 'Already Removed' })
        }
        const data = await userCtrl.removeFromFavourites({ email, id })
        if (data.result != null) {
            req.session.user = data
            listCache.get(user_id).delete('favourites-' + id)
        }
        return res.status(data.status).json({ id })
    })

app.route('/get-data')
    .get(async (req, res) => {
        if (!req.session.user) {
            return res.status(200).json({ message: 'User not logged in' })
        }
        let data = {
            userList: req.session.user.result.userList,
            favourites: req.session.user.result.favourites,
        }
        return res.status(200).json(data)
    })

const user = app
export default user
