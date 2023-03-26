//載入套件與檔案
const express = require("express")
const exhbs = require("express-handlebars")
const mongoose = require("mongoose")
const restaurantInfo = require("./models/restaurantInfo")

const app = express()
const port = 3000

//Template engine
app.engine("hbs", exhbs({ defaultLayout: "main", extname: "hbs" }))
app.set("view engine", "hbs")
app.use(express.static("public"))

// 僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

//連線到mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//db測試
const db = mongoose.connection
db.on("error", () => {
    console.log("mondodb error!")
})
db.once("open", () => {
    console.log("mongodb connected!")
})

//設定路由
app.get("/", (req, res) => {
    //顯示所有餐廳資訊
    restaurantInfo
        .find()
        .lean()
        .then((restaurants) => res.render("index", { restaurants }))
        .catch((error) => {
            console.log(error)
        })
})
app.get("/restaurants/:id", (req, res) => {
    //根據動態路由輸入的id，顯示對應的餐廳資訊
    const id = req.params.id
    return restaurantInfo
        .findById(id)
        .lean()
        .then((restaurant) => res.render("show", { restaurant }))
        .catch((error) => console.log(error))
})
app.get("/search", (req, res) => {
    //藉由輸入的query string，查找對應的餐廳資訊(名字、英文名字跟類別)
    const keyword = req.query.keyword.toLowerCase()
    searchedList = restaurantInfo.results.filter((restaurant) => restaurant.name.includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword) || restaurant.category.includes(keyword))
    res.render("index", { restaurant: searchedList, searchedText: keyword })
})

app.listen(port, () => {
    console.log(`Now you are listening http://localhost:${port}`)
})
