const express = require('express')
const router = express.Router()
const md5 = require('md5')
const multer = require('multer')
const path = require('path')
const { register, getById, getAll, getDelete, getFilter, login, getUpdate } = require('../controller/arizaController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/ariza')
    },
    filename: function (req, file, cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: storage })



// http://localhost:4000/students/add
router.post('/add', upload.single('bio_img'), register)

router.post('/login', login)

// http://localhost:4000/students/all
router.get('/all', getAll)

// http://localhost:4000/students/fillter
router.get('/fillter', getFilter)

// http://localhost:4000/students/:id
router.get('/:id', getById)

router.put("/:id", getUpdate)


// http://localhost:4000/students/:id
router.delete('/:id', getDelete)






module.exports = router
