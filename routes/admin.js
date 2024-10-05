const { Router } = require("express");

const adminRouter = Router();

const { adminModel } = require("../db");

adminRouter.post("/signup", function(req, res) {
    res.json({
        message: "signup point"
    })
})

adminRouter.post("/signin", function(req, res) {
    res.json({
        message: "signin point"
    })
})

adminRouter.post("/course", function(req, res) {
    res.json({
        message: "create a new course point"
    })
})

adminRouter.put("/course", function(req, res) {
    res.json({
        message: "update a course point"
    })
})

adminRouter.get("/course/all", function(req, res) {
    res.json({
        message: "view all courses point"
    })
})

module.exports = {
    adminRouter: adminRouter
}