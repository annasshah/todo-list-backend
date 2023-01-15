const mongoose = require('mongoose')
const { Schema } = mongoose;

const TodoSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Todo"
    }
}, { timestamps: true })

const Todo = mongoose.model('todo', TodoSchema)

module.exports = Todo