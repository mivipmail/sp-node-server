import {RequestHandler} from "express";
import {AddressType} from "../types";

const {CdekAddress} = require('../models/models')
const ApiError = require("../errors/ApiError")
const {cdekIntegrator} = require("../lib/CdekIntegrator");
const moment = require("moment");

class AddressController {
    index: RequestHandler =
        async (req, res, next) => {
            const addresses = await CdekAddress.findAll({
                attributes: {exclude: ['last_update']},
            })

            if (!!addresses.length)
                return res.json(addresses)

            return next(ApiError.badRequest('Не найдено адресов'))
        }

    extUpdate: RequestHandler =
        async (req, res, next) => {
            if (await cdekIntegrator.getToken()) {
                const data = await cdekIntegrator.getAddresses()
                if (data) {
                    const addresses = this._prepareCdekAddressesForDb(data)
                    await CdekAddress.truncate()
                    await CdekAddress.bulkCreate(addresses)
                    return res.status(200).json({data: 'Список ПВЗ СДЭК обновлен'})
                }
            }
            return next(ApiError.badRequest('Неизвестная ошибка'))
        }

    _prepareCdekAddressesForDb = (data: Array<any>): Array<AddressType> => {
        const currentMoment: string = moment().format('YYYY-MM-DD HH:mm:ss')
        let addresses: Array<AddressType> = []
        data.forEach(pvc => {
            addresses.push({
                city: pvc.location.city,
                address: pvc.location.address,
                address_comment: pvc.note ?? '',
                parcel_shop_name: pvc.name,
                parcel_shop_code: pvc.code,
                work_time: pvc.work_time,
                card: pvc.have_cashless,
                coord_x: pvc.location.longitude,
                coord_y: pvc.location.latitude,
                citycdekid: pvc.location.city_code,
                last_update: currentMoment,
            })
        })
        return addresses
    }

}

module.exports = {
    addressController: new AddressController()
}