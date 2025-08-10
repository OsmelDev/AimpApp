const mongoose = require('mongoose')
const { mongoURI } = require('../config')

const db = async () => {
    try {
      await mongoose.connect(mongoURI)
      console.log("conection succesfully")
    } catch (error) {
      console.log(error)
    }
  }

module.exports = {mongoURI, db}