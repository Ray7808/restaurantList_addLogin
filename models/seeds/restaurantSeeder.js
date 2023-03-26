const mongoose = require("mongoose")
const restaurantInfo = require("../restaurantInfo")
const initialRestaurantInfo = require("../../restaurant.json")

// 僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

// 設定連線到mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on("error", () => {
    console.log("mongodb error!")
})

db.once("open", () => {
    console.log("mongodb connected!")

    for (let i = 0; i < initialRestaurantInfo.results.length; i++) {
        restaurantInfo.create({
            name: `${initialRestaurantInfo.results[i].name}`,
            name_en: `${initialRestaurantInfo.results[i].name_en}`,
            category: `${initialRestaurantInfo.results[i].category}`,
            image: `${initialRestaurantInfo.results[i].image}`,
            location: `${initialRestaurantInfo.results[i].location}`,
            phone: `${initialRestaurantInfo.results[i].phone}`,
            google_map: `${initialRestaurantInfo.results[i].google_map}`,
            rating: `${initialRestaurantInfo.results[i].rating}`,
            description: `${initialRestaurantInfo.results[i].description}`,
        })
    }
    console.log("done!")
})
