const restaurantInfo = require("../restaurantInfo")
const initialRestaurantInfo = require("../../restaurant.json")
const db = require("./config/mongoose")

db.once("open", () => {
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
