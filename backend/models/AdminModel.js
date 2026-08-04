const mongoose = require('mongoose')
// Krijimi i skemes per perdoruesit
const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    // Percaktimi i roleve te mundshme per perdoruesit
    role: { type: String, enum: ["user", "admin"], default: "user" }
})
// regjistrimi i modelit te perdoruesit ne mongoose
const User = mongoose.model('User', userSchema)
module.exports = User 