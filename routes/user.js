const { Router } = require("express");

const userRouter = Router();

const { userModel } = require("../db");

userRouter.post("/signup", function(req, res) {
    res.json({
        message: "signup point"
    })
})

userRouter.post("/signin", function(req, res) {
    res.json({
        message: "signin point"
    })
})

userRouter.get("/purchses", function(req, res) {
    res.json({
        message: "user purchases point"
    })
})

module.exports = {
    userRouter: userRouter
}