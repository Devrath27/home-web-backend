const mongoose= require('mongoose');
const order= new mongoose.Schema({
    members: [{ cust_id: String, worker_id: String, book_id: String, status: String}]
});
module.exports= Order=mongoose.model("order",order);