import mongoose from 'mongoose'

const episodeSchema = new mongoose.Schema({
  anilist_id: {
    type: Number,
    required: true,
  },
  episode_no: {
    type: Number,
    required: true,
  },
  links: {
    type: [String],
    required: true,
  },
})

episodeSchema.index({ anilist_id: 1, episode_no: 1 }, { unique: true })

export default mongoose.model('MAEpisode', episodeSchema)
