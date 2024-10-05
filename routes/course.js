const { Router } = require("express");

const courseRouter = Router();

const { courseModel } = require("../db");

courseRouter.post("/purchase", function(req, res) {
    res.json({
        message: "course purchase point"
    })
})

courseRouter.get("/preview", function(req, res) {
    res.json({
        message: "course preview point"
    })
})

module.exports = {
    courseRouter: courseRouter
}