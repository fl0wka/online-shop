const { Schema, model } = require('mongoose');

const schema = Schema(
  {
    fio: String,
    email: { type: String, required: true, unique: true },
    password: String,
    sex: { type: String, enum: ['male', 'female', 'other'] },
    city: String,
    country: String,
    zip: String,
    license: Boolean,
  },
  { timestamps: true }
);

module.exports = model('Product', schema);
