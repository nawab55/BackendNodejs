const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
    });

    res.status(201).json({ message: 'Product added successfully', id: newProduct.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, quantity } = req.body;

  try {
    const updatedProduct = await Product.update(
      { name, description, price, quantity },
      {
        where: { id: productId },
        returning: true,
      }
    );

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct[1][0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  getProductById,
};
