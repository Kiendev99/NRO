const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products:[{
        product: {type:mongoose.Types.ObjectId,ref:'Product'},
        count : Number,
        size:String,
    }],
    status:{
        type:String,
        default:'Proccessing',
        enum:['Cancelled','Proccessing','Succeed']
    },
    
    // paymentIntent:{},
    total:Number,
    coupon:{
        type:mongoose.Types.ObjectId,
        ref:'Coupon'
    },
    orderBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
},
{timestamps:true}
);

//Export the model
module.exports = mongoose.model('Order', orderSchema);