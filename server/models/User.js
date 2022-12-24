const { Schema, model } = require('mongoose');

const schema = Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    sex: { type: String, enum: ['male', 'female', 'other'] },
    city: String,
    street: String,
    role: String,
    license: Boolean,
  },
  { timestamps: true }
);

module.exports = model('User', schema);
