const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please provide a name']
    },
    price:{
        type:Number,
        required:[true, 'please provide a price']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        deafult:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values: ['ikea', 'marcos', 'liddy', 'caressa'],
            message: '{VALUE} is not supported',
        },
    },
})

module.exports = mongoose.model('Product', productSchema)