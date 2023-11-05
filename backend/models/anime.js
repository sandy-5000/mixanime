import mongoose from "mongoose"

const animeSchema = new mongoose.Schema({
    anilist_id: {
        type: Number,
        required: true,
    },
    romaji: {
        type: String,
        required: true,
    },
    meta_data: {
        type: Object,
        default: {
            shift: 0,
        },
    },
})

animeSchema.index({ anilist_id: 1 }, { unique: true })

export default mongoose.model("MAAnime", animeSchema)
