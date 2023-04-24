const restaurantInfo = require('../restaurantInfo')
const userInfo = require('../user')
const initialRestaurantInfo = require('../../restaurant.json')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const SEED_USER_1 = {
    email: 'user1@example.com',
    password: '12345678',
}
const SEED_USER_2 = {
    email: 'user2@example.com',
    password: '12345678',
}

db.once('open', () => {
    bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(SEED_USER_1.password, salt))
        .then((hash) =>
            userInfo.create({
                email: SEED_USER_1.email,
                password: hash,
            })
        )
        .then((user1) => {
            const userId = user1._id
            return Promise.all(
                Array.from({ length: 3 }, (_, i) =>
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
                        userId: userId,
                    })
                )
            ) // 類似[1,2,3].map
        })
        .then(() => {
            bcrypt
                .genSalt(10)
                .then((salt) => bcrypt.hash(SEED_USER_2.password, salt))
                .then((hash) =>
                    userInfo.create({
                        email: SEED_USER_2.email,
                        password: hash,
                    })
                )
                .then((user2) => {
                    const userId = user2._id
                    return Promise.all(
                        Array.from({ length: 3 }, (_, j) =>
                            restaurantInfo.create({
                                name: `${
                                    initialRestaurantInfo.results[j + 3].name
                                }`,
                                name_en: `${
                                    initialRestaurantInfo.results[j + 3].name_en
                                }`,
                                category: `${
                                    initialRestaurantInfo.results[j + 3]
                                        .category
                                }`,
                                image: `${
                                    initialRestaurantInfo.results[j + 3].image
                                }`,
                                location: `${
                                    initialRestaurantInfo.results[j + 3]
                                        .location
                                }`,
                                phone: `${
                                    initialRestaurantInfo.results[j + 3].phone
                                }`,
                                google_map: `${
                                    initialRestaurantInfo.results[j + 3]
                                        .google_map
                                }`,
                                rating: `${
                                    initialRestaurantInfo.results[j + 3].rating
                                }`,
                                description: `${
                                    initialRestaurantInfo.results[j + 3]
                                        .description
                                }`,
                                userId: userId,
                            })
                        )
                    ) 
                })
                .then(() => {
                    console.log('done.')
                    process.exit()
                })
        })
})
