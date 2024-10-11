import mongoose from 'mongoose'
import { postMQueueFindOneAndUpdate } from '../hooks/queue.js'

const queueSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    default: Date.now(),
  },
  event_type: {
    type: String,
    required: true,
    enum: ['episode', 'title'],
  },
  anilist_id: {
    type: Number,
    required: true,
  },
  episode_no: {
    type: Number,
    default: 1,
  },
  romaji: {
    type: String,
    required: true,
  },
  frequency: {
    type: Number,
    default: 0,
  },
  meta_data: {
    type: Object,
    default: {
      shift: 0,
    },
  },
})

queueSchema.index({ timestamp: 1 })
queueSchema.index({ anilist_id: 1, episode_no: 1 }, { unique: true })

queueSchema.post('findOneAndUpdate', postMQueueFindOneAndUpdate)

export default mongoose.model('MAQueue', queueSchema)
