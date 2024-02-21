const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort('-price company')
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req, res) => {
    const {featured, name, company, sort, fields, numericFilters} = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true'? true:false
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if (company) {
        queryObject.company = company
    }
    console.log(queryObject)
    //sort
    let result = Product.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }
    else {
        result = result.sort('createdAt')
    }
    //select
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    //numeric filters
    if (numericFilters) {
        const operatorMap = {
            '>':'gt',
            '>=':'gte',
            '<':'lt',
            '<=':'lte',
            '=':'eq',
        }
        const regEx = /\b(>|<|>=|<=|=)\b/g
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)}
            }
        })
        console.log(filters)
    }
    const page = req.body.page || 1
    const limit = req.body.limit || 30
    const skip = (page-1) * limit
    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}