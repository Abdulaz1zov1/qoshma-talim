const Tolov = require("../models/tolov")


exports.register = async (req, res,next) => {
    try {
        if(!Tolov){
            console.log("malumot kelmadi")
        }else {
            const result = new Tolov({
                ...req.body,
                img: `http://185.217.131.79/api/${req.file.path.slice(7)}`
            })
            result.save()
            res.json({data: result})
        }
    } catch (err) {
        next(err)
    }
}

exports.getById = async (req, res) => {
    try {
        const result = await Tolov.findById({ _id: req.params.id })
        res.status(200).json(result)
    } catch (e) {
        console.log(e, 'err')
    }
}

exports.getAll = async (req, res) => {
    try {
        const result = await Tolov.find({}).sort({ date: -1 })
        res.status(200).json(result)
    } catch (e) {
        console.log(e, 'er')
    }
}


exports.getDelete = async (req, res) => {
    try {
        const result = await Tolov.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({data: []})
    } catch (e) {
        console.log(e, 'er')
    }
}
