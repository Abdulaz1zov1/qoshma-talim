const mongoose = require("mongoose")

const arizaSchema = mongoose.Schema(
    {
        name: String,
        surename: String,
        father_name: String,
        phone_number: String,
        passport_seria_number: String,
        passport_jshir: String,
        passport_location: String,
        birth_date: String,
        gender: String,
        region: String,
        city: String,
        street: String,
        home_number: String,
        bio_img: String,
        finished_study: String,
        country: String,
        university: String,
        study_type: String,
        study_lang: String,
        study_level: String,
        facultet: String,
            status: {type:Boolean, default: false}
    }
)
module.exports = mongoose.model("Ariza", arizaSchema)
