import mongoose from "mongoose"

const animeSchema = new mongoose.Schema({
    anilist_id: {
        type: Number,
        required: true,
    },
    romaji: {
        type: String,
        required: true,
    }
})

animeSchema.index({ anilist_id: 1 }, { unique: true })

export default mongoose.model("MAAnimes", animeSchema)
