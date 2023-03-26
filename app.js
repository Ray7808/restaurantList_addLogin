//載入套件與檔案
const express = require("express")
const exhbs = require("express-handlebars")
const restaurantInfo = require("./restaurant.json")

const app = express()
const port = 3000

//Template engine
app.engine("hbs", exhbs({ defaultLayout: "main", extname: "hbs" }))
app.set("view engine", "hbs")
app.use(express.static("public"))

//設定路由
app.get("/", (req, res) => {
    //顯示所有餐廳資訊
    res.render("index", { restaurant: restaurantInfo.results })
})
app.get("/restaurants/:id", (req, res) => {
    //根據動態路由輸入的id，顯示對應的餐廳資訊
    const showedRestaurantInfo = restaurantInfo.results.filter((restaurant) => restaurant.id === Number(req.params.id))
    res.render("show", { restaurant: showedRestaurantInfo[0] })
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
