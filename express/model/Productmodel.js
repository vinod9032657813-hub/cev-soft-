import mongoose from 'mongoose'

const Productschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Image1: {
    type: String,
    required: true
  },
  Image2: {
    type: String,
    required: true
  },
  Image3: {
    type: String,
    required: true
  },
  Image4: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  sizes: {
    type: Array,
    required: true
  },
  data: {
    type: Number,
    required: true
  },
  bestseller: {
    type: Boolean,
    required: true
  }
}, {timestamps: true})

const Product = mongoose.model("Product", Productschema)

export default Product