const Router = require('express')
const router = new Router()
const {categoryController} = require("../controllers/categoryController");
const {productController} = require("../controllers/productController");
const {streetsignController} = require("../controllers/streetsignController");
const {addressController} = require("../controllers/addressController");
const {cityController} = require("../controllers/cityController");
const {courierCityController} = require("../controllers/courierCityController");
const {constController} = require("../controllers/constController");

router.get('/categories', categoryController.index)

router.get('/products', productController.index)
router.get('/products/:id', productController.show)

router.get('/streetsigns', streetsignController.index)
router.get('/streetsigns/:id', streetsignController.show)
router.get('/streetsigns/colors', streetsignController.colors)

router.get('/addresses', addressController.index)
router.get('/addresses/cdek/ext-update', addressController.extUpdate)

router.get('/cities', cityController.index)
router.get('/cities/current', cityController.show)

router.get('/courier-cities', courierCityController.index)
router.get('/courier-cities/:cityId/price', courierCityController.courierPrice)

router.get('/constants/streetsign-colors', constController.streetsignColors)
router.get('/constants/company', constController.company)


module.exports = router