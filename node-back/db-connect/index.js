const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect("mongodb+srv://dbUser:dbPassword@cluster0-6ehlt.mongodb.net/sample_airbnb?ssl=true&authSource=admin",
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then((db) => {
      console.log('connected to DB successfully')
    })
    .catch((err) => {
      console.log('DB connection failed: |||' + err)
    })
}