const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get(
    '/facebook',
    passport.authenticate('facebook', {
        scope: ['email', 'public_profile'],
    })
    // 從facebook拿到的資料
)

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/users/login',
    })
    // 給facebook使用的路由
)

module.exports = router
