import {Request, RequestHandler} from "express";
import {ImageType, ProductType} from "../types";

const {Product, ProductImage} = require('../models/models')
const ApiError = require("../errors/ApiError")
const {completePath} = require("../utils/helpers");

class ProductController {
    _completeImagePaths = (req: Request, product: ProductType) => {
        product.images.forEach((img: ImageType) => {
                img.path = completePath(req, img.path)
                img.thumbnail_path = completePath(req, img.thumbnail_path)
            }
        )
        return product
    }

    index: RequestHandler =
        async (req, res, next) => {
            const {category_id} = req.query

            let products = await Product.findAll({
                attributes: {exclude: ['unit_order', 'created_at', 'updated_at', 'deleted_at']},
                where: (typeof category_id !== 'undefined') ? {category_id: category_id} : true,
                order: [['unit_order', 'ASC']],
                include: [{
                    model: ProductImage, as: 'images',
                    attributes: {exclude: ['product_id', 'created_at', 'updated_at']}
                }]
            })

            if (!!products.length) {
                products = products.map((product: ProductType) => this._completeImagePaths(req, product))
                return res.json(products)
            }

            return next(ApiError.badRequest('Товаров не найдено'))
        }

    show: RequestHandler =
        async (req, res, next) => {
            const {id} = req.params

            if (id) {
                let product = await Product.findOne({
                    attributes: {exclude: ['unit_order', 'created_at', 'updated_at', 'deleted_at']},
                    where: {id},
                    include: [{
                        model: ProductImage, as: 'images',
                        attributes: {exclude: ['product_id', 'created_at', 'updated_at']}
                    }]
                })

                if (product) {
                    product = this._completeImagePaths(req as Request, product)
                    return res.json(product)
                }

                return next(ApiError.badRequest(`Не найдено товара с идентификатором #${id}`))
            }

            return next(ApiError.badRequest('Не задан идентификатор товара'))
        }
}

module.exports = {
    productController: new ProductController()
}