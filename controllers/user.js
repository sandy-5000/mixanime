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
    }
}
