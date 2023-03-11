import { checkSchema } from 'express-validator';


export const editAction = checkSchema({
    token: {
        notEmpty: true
    },
    name: {
        optional: true,
        trim: true, // remove leading and trailing spaces
        notEmpty: true,
        isLength: {
            options: { min: 2 }
        },
        errorMessage: "Name must be at least 2 characters."
    },
    email: {
        optional: true,
        isEmail: true,
        normalizeEmail: true, // makes the email come out more correctly
        errorMessage: "Invalid email."
    },
    password: {
        optional: true,
        isLength: {
            options: { min: 8 }
        },
        errorMessage: "Password must be at least 8 characters."
    },
    state: {
        optional: true,
        notEmpty: true,
        errorMessage: "Unfilled status."
    }
});


export const signin = checkSchema({
    email: {
        isEmail: true,
        normalizeEmail: true, // makes the email come out more correctly
        errorMessage: "Invalid email."
    },
    password: {
        isLength: {
            options: { min: 8 }
        },
        errorMessage: "Password must be at least 8 characters."
    }
});