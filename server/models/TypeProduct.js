const { Schema, model } = require('mongoose');

const schema = Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model('TypeProduct', schema);
