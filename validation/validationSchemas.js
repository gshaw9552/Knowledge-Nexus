const { z } = require("zod");

const userSchema = z.object({
    firstName: z.string().min(1, {message: "First Name is required"})
        .regex(/^[A-Za-z]+$/, "First Name must contain only letters"),

    lastName: z.string().min(1, {message: "Last Name is required"})
        .regex(/^[A-Za-z]+$/, "First Name must contain only letters"),
    
    email: z.string().min(1, {message: "Email is required"}).email("Invalid Email Address"),

    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});

const adminSchema = z.object({
    firstName: z.string().min(1, {message: "First Name is required"})
        .regex(/^[A-Za-z]+$/, "First Name must contain only letters"),

    lastName: z.string().min(1, {message: "Last Name is required"})
        .regex(/^[A-Za-z]+$/, "First Name must contain only letters"),
    
    email: z.string().min(1, {message: "Email is required"}).email("Invalid Email Address"),

    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});

module.exports = {
    userSchema,
    adminSchema
}