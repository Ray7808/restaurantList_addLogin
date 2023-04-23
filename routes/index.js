const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth') // 加入middleware

router.use('/restaurants', authenticator, restaurants) // 條件嚴謹的放上面
router.use('/users', users)
router.use('/', authenticator, home) // 條件寬鬆的放下面

module.exports = router
