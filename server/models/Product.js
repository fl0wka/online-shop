const { Schema, model } = require('mongoose');

const schema = Schema(
  {
    name: String,
    image: String,
    content: String,
    typeProduct: {
      type: Schema.Types.ObjectId,
      ref: 'TypeProduct',
    },
    price: Number,
  },
  { timestamps: true }
);

module.exports = model('Product', schema);
