import {RequestHandler} from "express";
import {CourierCityType} from "../types";

const {CdekCity} = require('../models/models')
const ApiError = require("../errors/ApiError")
const {Op} = require("sequelize");
const {cdekIntegrator} = require("../lib/CdekIntegrator");

class CourierCityController {
    index: RequestHandler =
        async (req, res, next) => {
            let {query} = req.query
            query = query ?? ''

            try {
                const cities: Array<CourierCityType> = await CdekCity.findAll({
                    where: {
                        city: {
                            [Op.startsWith]: query
                        }
                    }
                })
                return res.json(cities)
            } catch (e) {
                console.log(e)
                return next(ApiError.internal('Произошла ошибка при обращении к базе данных'))
            }
        }

    courierPrice: RequestHandler =
        async (req, res, next) => {
            const {cityId} = req.params

            if (await cdekIntegrator.getToken()) {
                const price = await cdekIntegrator.getCourierPrice(cityId)
                return res.json({data: price})
            }
            return next(ApiError.internal('Ошибка доступа к API СДЭК'))
        }
}

module.exports = {
    courierCityController: new CourierCityController()
}