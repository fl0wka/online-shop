const { ObjectId } = require('mongoose').Types;
const typeProductMock = require('../mock/typeProduct.json');
const productsMock = require('../mock/products.json');
const TypeProduct = require('../models/TypeProduct');
const Product = require('../models/Product');

module.exports = async () => {
  // Замена id тип String на Object
  const transformProductMock = [];
  const transformTypeProductMock = typeProductMock.map((type) => {
    const newId = ObjectId();
    productsMock.forEach((product) => {
      if (type._id === product.typeProduct) {
        transformProductMock.push({ ...product, typeProduct: newId });
      }
    });
    return { ...type, _id: newId };
  });

  const products = await Product.find();

  if (products.length !== productsMock.length) {
    createInitialEntity(Product, transformProductMock);
  }
  const typeProduct = await TypeProduct.find();

  if (typeProduct.length !== typeProductMock.length) {
    createInitialEntity(TypeProduct, transformTypeProductMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  await Promise.all(
    data.map(async (item) => {
      try {
        if (typeof item._id !== 'object') {
          delete item._id;
        }
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
