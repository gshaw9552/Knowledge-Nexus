const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminSchema } = require("../validation/validationSchemas");
const { adminMiddleware } = require("../middleware/admin");

const adminRouter = Router();

adminRouter.post("/signup", async function(req, res) {
    const result = adminSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;

        return res.status(400).json({
            message: "Invalid Input",
            errors: errors
        });
    }

    const {email, password, firstName, lastName} = result.data;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });

        res.json({
            message: "Signup succeeded"
        });
    } catch(e) {
        console.error(e);
        res.status(500).json({
            message: "Signup failed",
            error: "Database or Server error"
        });
    }
})

adminRouter.post("/signin", async function(req, res) {
    const {email, password} = req.body;
    const response = await adminModel.findOne({
        email
    })

    if(!response) {
        res.status(403).json({
            message: "Admin does not exist in our database"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if(passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()}, 
            process.env.JWT_ADMIN_PASSWORD,
            { expiresIn: '1h' }
        );
        
        //do cookie logic
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Incorrect Credentials"
        })
    }
})

adminRouter.post("/course", adminMiddleware , async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId }= req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title,
        description,
        imageUrl,
        price
    })

    if (result.nModified === 0) {
        return res.status(404).json({
            message: "Course not found or no changes made"
        });
    }

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/all", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        message: "Courses",
        courses
    })

})

module.exports = {
    adminRouter: adminRouter
}