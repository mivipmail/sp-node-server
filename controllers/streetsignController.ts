import {Request, RequestHandler} from "express";
import {StreetsignColorType, StreetsignType} from "../types";

const {Product, ProductImage} = require('../models/models')
const ApiError = require("../errors/ApiError")
const {CLASSES, STREETSIGN_COLORS} = require("../consts");
const {completePath} = require("../utils/helpers");

class StreetsignController {
    insertImages = (req: Request, streetsign: StreetsignType): StreetsignType => {
        let images: Array<any> = []
        STREETSIGN_COLORS.forEach((color: StreetsignColorType) => {
                images.push([
                    completePath(req, `images/streetsigns/at_${streetsign.product_code}_c${color.id}_i0.png`),
                    completePath(req, `images/streetsigns/at_${streetsign.product_code}_c${color.id}_i1.png`)
                ])
            }
        )
        return {
            ...streetsign,
            images: images,
            thumbnail_image: completePath(req, `images/streetsigns/at_${streetsign.product_code}_c9_i0.png`)
        }
    }

    index: RequestHandler =
        async (req, res, next) => {
            let streetsigns = await Product.findAll({
                raw: true,
                attributes: {exclude: ['unit_order', 'created_at', 'updated_at', 'deleted_at']},
                where: {class_id: CLASSES.STREETSIGN},
                order: [['unit_order', 'ASC']],
            })

            if (!!streetsigns.length) {
                streetsigns = streetsigns.map((streetsign: StreetsignType) => this.insertImages(req, streetsign))
                return res.json(streetsigns)
            }

            return next(ApiError.badRequest('Не товаров в данной категории'))
        }

    colors: RequestHandler =
        async (req, res, next) => {
            res.status(200).json(STREETSIGN_COLORS)
        }

    show: RequestHandler =
        async (req, res, next) => {
            const {id} = req.params
            if (id) {
                let streetsign = await Product.findOne({
                    raw: true,
                    attributes: {exclude: ['unit_order', 'created_at', 'updated_at', 'deleted_at']},
                    where: {id},
                })
                if (streetsign) {
                    streetsign = this.insertImages(req, streetsign)
                    return res.json(streetsign)
                }
                return next(ApiError.badRequest('Не найдено товара с заданным id'))
            }
            return next(ApiError.badRequest('Не задан id товара'))
        }
}

module.exports = {
    streetsignController: new StreetsignController()
}