const { Schema, model } = require('mongoose');

const schema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        prodId: { type: Schema.Types.ObjectId, ref: 'Product' },
        count: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Cart', schema);
