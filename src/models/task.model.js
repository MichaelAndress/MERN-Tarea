const { Schema, model } = require("mongoose");

const taskSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

module.exports = model('Task', taskSchema);