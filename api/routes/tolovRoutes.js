const express = require('express')
const router = express.Router()
const md5 = require('md5')
const multer = require('multer')
const path = require('path')
const { register, getById, getAll, getDelete } = require('../controller/tolovController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/tolov')
    },
    filename: function (req, file, cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: storage })



// http://localhost:4000/tolov/add
router.post('/add', upload.single('img'), register)

// http://localhost:4000/tolov/all
router.get('/all', getAll)

// http://localhost:4000/tolov/:id
router.get('/:id', getById)

// http://localhost:4000/tolov/:id
router.delete('/:id', getDelete)

module.exports = router
