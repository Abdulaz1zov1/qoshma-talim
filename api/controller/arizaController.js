const Ariza = require("../models/ariza")


exports.register = async (req, res) => {
    try {
        const result = new Ariza({
            ...req.body,
            bio_img: `http://185.217.131.79/api/${req.file.path.slice(7)}`
        })
        result.save()
        res.status(200).json({ data: result })
    } catch (e) {
        console.log('err', e)
    }
}

exports.login = async (req, res) => {
    const { name, phone_number } = req.body;
    if (!name) {
        res.status(404).json({success: false})
    }
    else if (!phone_number) {
        res.status(404).json({success: false})
    }
    const user = await Ariza.findOne({ name: name }).select("phone_number");
    if (!user) {
        res.status(404).json({success: false})
    }else{
        res.status(200).json({success: true, data: user})
    }
};

exports.getById = async (req, res) => {
    try {
        const result = await Ariza.findById({ _id: req.params.id })
        res.status(200).json(result)
    } catch (e) {
        console.log(e, 'err')
    }
}

exports.getAll = async (req, res) => {
    try {
        const result = await Ariza.find({}).sort({ date: -1 })
        res.status(200).json(result)
    } catch (e) {
        console.log(e, 'er')
    }
}

exports.getUpdate = async (req, res) => {
    try {
        const result = await Ariza.findByIdAndUpdate(req.params.id, {$set: {status: true} } )
        res.json({data: result})
    } catch (e) {
        console.log(e, 'er')
    }
}

exports.getDelete = async (req, res) => {
    try {
        const result = await Ariza.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({data: []})
    } catch (e) {
        console.log(e, 'er')
    }
}

exports.getFilter = async(req, res, next)=>{
    try {
        const result = await Ariza.find({}).select({talimDarajasi: 1, davlat: 1, unversitet: 1, fakultet: 1}).count()
        res.json(result)
    } catch (err) {
        next(err)
    }
}
