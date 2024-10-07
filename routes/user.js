const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const { userSchema } = require("../validation/validationSchemas");

const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
    const result = userSchema.safeParse(req.body);

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

        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });

        res.json({
            message: "signup succeeded"
        });
    } catch(e) {
        console.error(e);
        res.status(500).json({
            message: "Signup failed",
            error: "Database or Server error"
        });
    }
})

userRouter.post("/signin", async function(req, res) {
    const {email, password} = req.body;
    const response = await userModel.findOne({
        email
    })

    if(!response) {
        res.status(403).json({
            message: "User does not exist in our database"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if(passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()}, 
            process.env.JWT_USER_PASSWORD,
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

userRouter.get("/purchses", function(req, res) {
    res.json({
        message: "user purchases point"
    })
})

module.exports = {
    userRouter: userRouter
}