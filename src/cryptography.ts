import * as crypto from "crypto";
import * as express from "express";
import { generateString } from "./random";

/**
 * Salts a password, if no salt is passed it'll generate a new one
 * @param password {string}
 * @param [salt] {string}
 * @return {{password: string, salt: string}}
 */
function saltPassword(password: string, salt?: string) : {password: string, salt: string}
{
    if (salt == null){
        // Generate the salt
        salt = generateString(8);
    }
    // Set the hash
    let hash = crypto.createHash('sha256');
    // Hash the password and salt it
    let hashedPassword = hash.update(password + salt).digest('hex');
    // Return the password and the salt
    return {password: hashedPassword, salt: salt};
}

/**
 * @const NotAllowedUsernames - An array with the not allowed usernames
 * @type {string[]}
 */
const NotAllowedUsernames = [
    "login",
    "register",
    "auth",
    "public"
]

function IsEmail(str: string) : boolean
{
    return String(str).match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) != null;
}

function IsLoggedIn(req: express.Request | {isAuthenticated: () => boolean}, res: express.Response, next: express.NextFunction)
{
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

export {
    saltPassword,
    NotAllowedUsernames,
    IsEmail,
    IsLoggedIn,
}