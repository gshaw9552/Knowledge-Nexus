const { Router } = require("express");
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminSchema } = require("../validation/validationSchemas");

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