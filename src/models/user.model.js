const { model, Schema } = require("mongoose");

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
},{
    timestamps:true
});

module.exports = model("User", userSchema);
