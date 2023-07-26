const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://user:damasco2@cluster0.fqesz7v.mongodb.net/tareas')
        console.log('DB conectada')
    } catch (error) {
        console.log(error)
    }
};
module.exports={
    connectDB,
}

