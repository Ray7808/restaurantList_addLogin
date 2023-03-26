//載入套件與檔案
const express = require("express")
const exhbs = require("express-handlebars")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
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

//拿到瀏覽器回傳的資料
app.use(bodyParser.urlencoded({ extended: true }))

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
app.get("/restaurants/new", (req, res) => {
    //顯示要新增的餐廳各項內容
    return res.render("new")
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
    return restaurantInfo
        .find()
        .lean()
        .then((restaurants) =>
            res.render("index", {
                restaurants: restaurants.filter((restaurant) => restaurant.name.includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)),
                searchedText: keyword,
            })
        )
})
app.get("/restaurants/:id/edit", (req, res) => {
    //根據動態路由輸入的id，顯示可編輯的餐廳資訊
    const id = req.params.id
    return restaurantInfo
        .findById(id)
        .lean()
        .then((restaurant) => res.render("edit", { restaurant }))
        .catch((error) => console.log(error))
})
app.post("/restaurants/new", (req, res) => {
    return restaurantInfo
        .create({
            name: req.body.name,
            name_en: req.body.name_en,
            category: req.body.category,
            image: req.body.image,
            location: req.body.location,
            phone: req.body.phone,
            google_map: req.body.google_map,
            rating: req.body.rating,
            description: req.body.description,
        })
        .then(() => res.redirect("/"))
        .catch((error) => console.log(error))
})
app.post("/restaurants/:id/edit", (req, res) => {
    //根據動態路由輸入的id，將編輯後的資料傳至mongoDB並重新導向到show.hbs
    const id = req.params.id
    return restaurantInfo
        .findById(id)
        .then((restaurant) => {
            restaurant.name = req.body.name
            restaurant.name_en = req.body.name_en
            restaurant.category = req.body.category
            restaurant.image = req.body.image
            restaurant.location = req.body.location
            restaurant.phone = req.body.phone
            restaurant.google_map = req.body.google_map
            restaurant.rating = req.body.rating
            restaurant.description = req.body.description
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch((error) => console.log(error))
})

app.listen(port, () => {
    console.log(`Now you are listening http://localhost:${port}`)
})
