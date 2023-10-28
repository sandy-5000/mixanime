import express from "express"
import bodyParser from "body-parser"
import UserController from "../controllers/user.js"
import verify from "../utils/validate.js"
import jwt from "jsonwebtoken"

const app = express.Router()
app.use(bodyParser.urlencoded({ extended: false }))

const userCtrl = UserController()
const listCache = new Map()

app.route('/login')
    .post(async (req, res) => {
        const { usermail, passwd } = req.body
        const data = await userCtrl.authenticate({ usermail, passwd })
        if (data.status == 404) {
            return res.status(200).json({ error: 'Usermail or password incorrect' })
        }
        const tokenData = {
            _id: data.result._id,
            name: data.result.name,
            email: data.result.email,
            passwd: data.result.passwd
        }
        let token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d",
        })
        delete data.result.passwd
        return res.status(200).json({ jwt: token, ...data.result._doc, passwd: null })
    })

app.route('/register')
    .post(async (req, res) => {
        const { username, usermail, passwd, cpasswd } = req.body
        if (cpasswd != passwd) {
            return res.status(400, { message: 'Password does\'t match!' })
        }
        if (passwd.length < 8) {
            return res.status(400, { message: 'Password too short!' })
        }
        const data = await userCtrl.createUser({ username, usermail, passwd })
        if (data.status == 400) {
            return res.status(400).json({ message: data.result })
        }
        return res.status(data.status).json({ ...data.result, passwd: null })
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


const user = app
export default user
