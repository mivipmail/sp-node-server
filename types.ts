export type BaseCityType = {
    id: number
    city: string
    city_id: number
    courier_price: number
}

export type CourierCityType = {
    id: number
    name: string
}

export type CategoryType = {
    id: number
    title: string
    description: string
    discount: number
}

export type AddressType = {
    city: string
    address: string
    address_comment: string
    parcel_shop_name: string
    parcel_shop_code: string
    work_time: string
    card: boolean
    coord_x: number
    coord_y: number
    citycdekid: number
    last_update: string
}

export type ImageType = {
    id: number
    path: string
    thumbnail_path: string|null
    is_main: boolean
}

export type ProductType = {
    id: number
    product_code: string
    class_id: number
    category_id: number
    title: string
    description: string
    l: number
    w: number
    h: number
    price: number
    old_price: number
    images: Array<ImageType>
    is_published: boolean
}

export type StreetsignColorType = {
    id: string
    title: string
    rgb: string
    bg_rgb: string | null
    ORACAL: string | null
    RAL: string | null
}

export type StreetsignType = {
    id: number
    product_code: string
    class_id: number
    category_id: number
    title: string
    description: string
    l: number
    w: number
    h: number
    price: number
    old_price: number
    is_published: number
    images?: Array<string[2]>
    thumbnail_image?: string
}
