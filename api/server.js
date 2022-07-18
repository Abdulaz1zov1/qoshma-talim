const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()
const dotenv = require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// ------------------------------------ MongoDB coonecting ----------------------------------
const databse = require("./databse/mongodb")
databse()




app.use(express.static("public"))
//  ==================================== A P I ==============================
app.use("/students", require("./routes/arizaRoutes"))
app.use("/tolov", require("./routes/tolovRoutes"))


app.get("/", (req, res)=>{
    res.send("prekt ishlayapti")
})








app.listen(process.env.PORT || 4000, console.log('run server 4000 port'))
