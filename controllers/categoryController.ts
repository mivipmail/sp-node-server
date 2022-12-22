import {RequestHandler} from "express";

const {Category} = require('../models/models')
const ApiError = require("../errors/ApiError")

class CategoryController {
    index: RequestHandler =
        async (req, res, next) => {
            const categories = await Category.findAll({
                attributes: ['id', 'title', 'description', 'discount'],
                order: [['unit_order', 'ASC']],
            })

            if (!!categories.length)
                return res.json(categories)

            return next(ApiError.badRequest('Не найдено категорий'))
        }
}

module.exports = {
    categoryController: new CategoryController()
}