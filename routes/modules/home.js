const express = require("express")
const router = express.Router()
const restaurantInfo = require("../../models/restaurantInfo")

//設定路由
router.get("/", (req, res) => {
    //顯示所有餐廳資訊
    restaurantInfo
        .find()
        .lean()
        .then((restaurants) => res.render("index", { restaurants }))
        .catch((error) => {
            console.log(error)
        })
})
router.get("/search", (req, res) => {
    //藉由輸入的query string，查找對應的餐廳資訊(名字、英文名字跟類別)
    const keyword = req.query.keyword.toLowerCase().trim()
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
router.get("/sort/:sortingMethod", (req, res) => {
    //藉由輸入的query string，排序對應的餐廳資訊(名字、類別跟地區)
    const sortingMethod = req.params.sortingMethod
    switch (sortingMethod) {
        case "AtoZ":
            return restaurantInfo
                .find()
                .lean()
                .sort({ name_en: "asc" })
                .then((restaurants) =>
                    res.render("index", {
                        restaurants: restaurants,
                    })
                )
                .catch((error) => console.log(error))
        case "ZtoA":
            return restaurantInfo
                .find()
                .lean()
                .sort({ name_en: "desc" })
                .then((restaurants) =>
                    res.render("index", {
                        restaurants: restaurants,
                    })
                )
                .catch((error) => console.log(error))
        case "category":
            return restaurantInfo
                .find()
                .lean()
                .sort({ category: "asc" })
                .then((restaurants) =>
                    res.render("index", {
                        restaurants: restaurants,
                    })
                )
                .catch((error) => console.log(error))
        case "location":
            return restaurantInfo
                .find()
                .lean()
                .sort({ location: "asc" })
                .then((restaurants) =>
                    res.render("index", {
                        restaurants: restaurants,
                    })
                )
                .catch((error) => console.log(error))
    }
})

module.exports = router
