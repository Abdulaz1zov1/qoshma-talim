const mongoose = require("mongoose")

const tolovSchema = mongoose.Schema(
    {
        img: String,
        arizaId: {
            type: mongoose.Schema.ObjectId,
            ref: "Ariza"
        },
        pending: {type: Boolean, default: true},
        date: {type: Date, default: Date.now()}
    }
)
module.exports = mongoose.model("Tolov", tolovSchema)
