const {DataTypes} = require("sequelize")
const {ROLES} = require("../consts")

const sequelize = require('../db')


const User  = sequelize.define('user',
    {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING},
        role: {type: DataTypes.INTEGER, defaultValue: ROLES.GUEST.id},
        email: {type: DataTypes.STRING, unique: true},
        password: {type: DataTypes.STRING},
        char: {type: DataTypes.CHAR, allowNull: true},
        remember_token: {type: DataTypes.STRING, allowNull: true},
    },
    {
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

const Category = sequelize.define('category',
    {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING},
        description: {type: DataTypes.STRING, allowNull: true},
        discount: {type: DataTypes.INTEGER, defaultValue: 0},
        unit_order: {type: DataTypes.INTEGER},
        is_published: {type: DataTypes.BOOLEAN, defaultValue: true}
    },
    {
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

const Product = sequelize.define('product',
    {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        product_code: {type: DataTypes.STRING, unique: true, allowNull: true},
        class_id: {type: DataTypes.INTEGER},
        category_id: {type: DataTypes.BIGINT, allowNull: true},
        title: {type: DataTypes.STRING},
        description: {type: DataTypes.STRING, allowNull: true},
        l: {type: DataTypes.INTEGER, allowNull: true},
        w: {type: DataTypes.INTEGER, allowNull: true},
        h: {type: DataTypes.INTEGER, allowNull: true},
        price: {type: DataTypes.DOUBLE, allowNull: true},
        old_price: {type: DataTypes.DOUBLE, allowNull: true},
        unit_order: {type: DataTypes.INTEGER},
        is_published: {type: DataTypes.BOOLEAN, defaultValue: true}
    },
    {
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

const ProductImage = sequelize.define('product_image',
    {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        product_id: {type: DataTypes.BIGINT},
        path: {type: DataTypes.STRING},
        thumbnail_path: {type: DataTypes.STRING, allowNull: true},
        is_main: {type: DataTypes.BOOLEAN, defaultValue: false}
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',

        tableName: 'product_images',
    }
)

const CdekAddress = sequelize.define('cdek_address',
    {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        city: {type: DataTypes.STRING, allowNull: true},
        address: {type: DataTypes.STRING, allowNull: true},
        address_comment: {type: DataTypes.STRING, allowNull: true},
        parcel_shop_name: {type: DataTypes.STRING, allowNull: true},
        parcel_shop_code: {type: DataTypes.STRING, allowNull: true},
        work_time: {type: DataTypes.STRING, allowNull: true},
        card: {type: DataTypes.BOOLEAN, allowNull: true},
        coord_x: {type: DataTypes.FLOAT, allowNull: true},
        coord_y: {type: DataTypes.FLOAT, allowNull: true},
        citycdekid: {type: DataTypes.INTEGER, allowNull: true},
        last_update: {type: DataTypes.DATE},
    },
    {
        timestamps: false,
        tableName: 'tb_addresses_cdek',
    }
)

const CdekCity = sequelize.define('cdek_city',
    {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        city: {type: DataTypes.STRING, allowNull: true},
    },
    {
        timestamps: false,
        tableName: 'tb_cities_cdek',
    }
)

const BaseCity = sequelize.define('base_city',
    {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        city: {type: DataTypes.STRING, allowNull: true},
        cityid: {type: DataTypes.INTEGER, allowNull: true},
        regionid: {type: DataTypes.INTEGER, allowNull: true},
        courierprice: {type: DataTypes.INTEGER, allowNull: true},
        last_update: {type: DataTypes.DATE},
    },
    {
        timestamps: false,
        tableName: 'tb_cities_regions',
    }
)


Category.hasMany(Product, {foreignKey: 'category_id'})
Product.belongsTo(Category, {foreignKey: 'category_id'})

Product.hasMany(ProductImage, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    as: 'images',
    /*hooks: true,*/
})
ProductImage.belongsTo(Product, {
    foreignKey: 'product_id',
})

module.exports = {
    User,
    Category,
    Product,
    ProductImage,
    CdekAddress,
    CdekCity,
    BaseCity,
}