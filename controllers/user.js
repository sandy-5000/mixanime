import MAUser from '../models/user.js'

export default function UserController() {
    return {
        authenticate: async function ({ usermail, passwd }) {
            const user = await MAUser.findOne({ email: usermail, passwd }, { passwd: 0 })
            if (!user) {
                return { status: 404, result: null }
            }
            return { status: 200, result: user }
        },
        createUser: async function ({ username, usermail, passwd }) {
            let user = new MAUser({
                name: username,
                email: usermail,
                passwd,
            })
            let errors = {
                11000: 'User already exists!'
            }
            try {
                var result = await user.save()
                return { status: 201, result }
            } catch (e) {
                return { status: 400, result: (errors[e.code] || 'User Creation failed!') }
            }
        },
        updateUser: async function ({ username, email, passwd, npasswd }) {
            try {
                let newData = {}
                if (username && username != '') {
                    newData.name = username
                }
                if (npasswd && npasswd.trim() != '') {
                    newData.passwd = npasswd
                }
                var result = await MAUser.findOneAndUpdate({ email, passwd }, newData, { new: true })
                return { status: 204, result }
            } catch (e) {
                return { status: 400, result: 'User Updation failed!' }
            }
        },
        addToList: async function ({ email, id, title, coverImage }) {
            try {
                const item = {
                    id, title, coverImage
                }
                let result = await MAUser.findOneAndUpdate({ email }, {
                    $push: {
                        userList: item
                    }
                }, { new: true })
                if (!result) {
                    return { status: 400, result: 'Not Added to list' }
                }
                return { status: 201, result }
            } catch (e) {
                return { status: 400, result: 'Add to List failed!' }
            }
        },
        addToFavourites: async function ({ email, id, title, coverImage }) {
            try {
                const item = {
                    id, title, coverImage
                }
                let result = await MAUser.findOneAndUpdate({ email }, {
                    $push: {
                        favourites: item
                    }
                }, { new: true })
                return { status: 201, result }
            } catch (e) {
                return { status: 400, result: 'Add to Favourites failed!' }
            }
        },
    }
}
