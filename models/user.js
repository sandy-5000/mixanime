import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9\.]{1,64}@[a-zA-Z0-9]{3,10}.com$/.test(v)
            }
        },
    },
    passwd: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length >= 8
            }
        }
    },
    userList: {
        type: [Number],
        default: [],
    },
    favourites: {
        type: [Number],
        default: [],
    },
})

userSchema.index({ email: 1 }, { unique: true })

export default mongoose.model("MAUser", userSchema)
