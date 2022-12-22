import {RequestHandler} from "express";

const {STREETSIGN_COLORS} = require("../consts");

class ConstController {
    streetsignColors: RequestHandler =
        async (req, res, next) => {
            res.status(200).json(STREETSIGN_COLORS)
        }

    company: RequestHandler =
        async (req, res, next) => {
        const company = {
            name: process.env.COMPANY_NAME,
            email: process.env.COMPANY_EMAIL,
            phone: process.env.COMPANY_PHONE,
            phone_href: process.env.COMPANY_PHONE_HREF,
            details: process.env.COMPANY_DETAILS,
        }
        res.status(200).json(company)
    }
}

module.exports = {
    constController: new ConstController()
}