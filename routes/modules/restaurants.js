const express = require("express")
const router = express.Router()
const restaurantInfo = require("../../models/restaurantInfo")

router.get("/new", (req, res) => {
    //顯示要新增的餐廳各項內容
    return res.render("new")
})
router.get("/:id", (req, res) => {
    //根據動態路由輸入的id，顯示對應的餐廳資訊
    const id = req.params.id
    return restaurantInfo
        .findById(id)
        .lean()
        .then((restaurant) => res.render("show", { restaurant }))
        .catch((error) => console.log(error))
})
router.get("/:id/edit", (req, res) => {
    //根據動態路由輸入的id，顯示可編輯的餐廳資訊
    const id = req.params.id
    return restaurantInfo
        .findById(id)
        .lean()
        .then((restaurant) => res.render("edit", { restaurant }))
        .catch((error) => console.log(error))
})
router.get("/:id/delete", (req, res) => {
    //根據動態路由輸入的id，顯示可編輯的餐廳資訊
    const id = req.params.id
    return restaurantInfo
        .findById(id)
        .lean()
        .then((restaurant) => res.render("delete", { restaurant }))
        .catch((error) => console.log(error))
})
router.post("/new", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
    //根據動態路由輸入的id，將該資料刪除並重新導向到index.hbs
    const id = req.params.id
    return restaurantInfo
        .findById(id)
        .then((restaurant) => restaurant.deleteOne())
        .then(() => res.redirect("/"))
        .catch((error) => console.log(error))
})

module.exports = router
