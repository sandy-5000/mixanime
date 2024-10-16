import MAUser from '../models/user.js'

export default function UserController() {
  return {
    authenticate: async function ({ usermail, passwd }) {
      const user = await MAUser.findOne({ email: usermail, passwd })
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
        11000: 'User already exists!',
      }
      try {
        var result = await user.save()
        return { status: 201, result }
      } catch (e) {
        console.log(e)
        return {
          status: 400,
          result: errors[e.code] || 'User Creation failed!',
        }
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
        var result = await MAUser.findOneAndUpdate({ email, passwd }, newData, {
          new: true,
        })
        return { status: 204, result }
      } catch (e) {
        return { status: 400, result: 'User Updation failed!' }
      }
    },
    addToList: async function ({ email, id, title, coverImage }) {
      try {
        const item = {
          id,
          title,
          coverImage,
        }
        let user = await MAUser.findOne({ email }, { passwd: 0 })
        if (!user) {
          return {
            status: 400,
            result: { error: 'User not found' },
          }
        }
        if (user.userList.length >= 50) {
          return {
            status: 400,
            result: { error: "Can't add more than 50 items" },
          }
        }
        for (let item of user.userList) {
          if (item.id === id) {
            return {
              status: 200,
              result: { error: 'Already Added' },
            }
          }
        }
        user.userList.push(item)
        user.save()
        return { status: 201, result: user }
      } catch (e) {
        return {
          status: 400,
          result: { error: 'Add to List failed!' },
        }
      }
    },
    removeFromList: async function ({ email, id }) {
      try {
        let user = await MAUser.findOne({ email }, { passwd: 0 })
        if (!user) {
          return {
            status: 400,
            result: { error: 'User not found' },
          }
        }
        user.userList = user.userList.filter((item) => item.id != id)
        user.save()
        return { status: 201, result: user }
      } catch (e) {
        return {
          status: 400,
          result: { error: 'Remove from List failed!' },
        }
      }
    },
    addToFavourites: async function ({ email, id, title, coverImage }) {
      try {
        const item = {
          id,
          title,
          coverImage,
        }
        let user = await MAUser.findOne({ email }, { passwd: 0 })
        if (!user) {
          return {
            status: 400,
            result: { error: 'User not found' },
          }
        }
        if (user.favourites.length >= 50) {
          return {
            status: 400,
            result: { error: "Can't add more than 50 items" },
          }
        }
        for (let item of user.favourites) {
          if (item.id === id) {
            return {
              status: 200,
              result: { error: 'Already Added' },
            }
          }
        }
        user.favourites.push(item)
        user.save()
        return { status: 201, result: user }
      } catch (e) {
        return {
          status: 400,
          result: { error: 'Add to List failed!' },
        }
      }
    },
    removeFromFavourites: async function ({ email, id }) {
      try {
        let user = await MAUser.findOne({ email }, { passwd: 0 })
        if (!user) {
          return {
            status: 400,
            result: { error: 'User not found' },
          }
        }
        user.favourites = user.favourites.filter((item) => item.id != id)
        user.save()
        return { status: 201, result: user }
      } catch (e) {
        return {
          status: 400,
          result: { error: 'Remove from Favourites Failed!' },
        }
      }
    },
  }
}
