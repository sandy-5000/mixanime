import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return 3 <= v.length && v.length <= 30
            }
        }
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
    created_on: {
        type: Date,
        default: new Date()
    },
    userList: {
        type: [{
            id: {
                type: Number,
                required: true,
            },
            coverImage: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            }
        }],
        default: [],
    },
    favourites: {
        type: [{
            id: {
                type: Number,
                required: true,
            },
            coverImage: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            }
        }],
        default: [],
    },
})

userSchema.index({ email: 1 }, { unique: true })

export default mongoose.model("MAUser", userSchema)
