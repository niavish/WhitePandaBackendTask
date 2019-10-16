const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CarSchema = new Schema({
    vehicleNo : {type: String,required:true},
    modelNo : {type:String,required:true},
    seatingCapacity :{type:Number,required:true},
    rentPerDay: {type:Number,required:true},
    bookings:[
        {
            customerDetails : {
                name : String,
                mobile : number
            },
            issueDate : Date,
            reuturnDate : Date
        }
    ]
});

// Export the model
module.exports = mongoose.model('Car', CarSchema);