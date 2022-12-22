import {Request, RequestHandler} from "express";
import {BaseCityType} from "../types";

const {BaseCity} = require('../models/models')
const ApiError = require("../errors/ApiError")
const {CITIES, MAIN_DOMAIN_CITY} = require("../consts");

class CityController {
    index: RequestHandler =
        async (req, res, next) => {
            try {
                const cities = await BaseCity.findAll({
                    attributes: ['id', 'city', ['cityid', 'city_id'], ['courierprice', 'courier_price']],
                })
                return res.json(cities)
            } catch (e) {
                console.log(e)
                return next(ApiError.internal('Произошла непредвиденная ошибка'))
            }
        }

    show: RequestHandler =
        async (req, res, next) => {
            const city = this._getCityBySubdomain(req)
            return res.status(200).json({data: city})
        }

    _getCityBySubdomain = (req: Request): string => {
        const host = req.headers.host
        const sub = host?.split('.')
        return (sub && sub.length > 2 && typeof CITIES[sub[0]] !== 'undefined')
            ? CITIES[sub[0]]
            : MAIN_DOMAIN_CITY
    }
}

module.exports = {
    cityController: new CityController()
}