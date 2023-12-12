import ProductModel from "../models/ProductModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.findAll({
      order: [["id", "DESC"]],
    });
    res.json({ message: "Success to get all products", products });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    // const productById = await ProductModel.findOne({
    //   where: { id: req.params.id },
    // });
    const productById = await ProductModel.findByPk(req.params.id);
    res.json({ message: "Success to get product by id", productById });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productCreate = await ProductModel.create(req.body);
    res.json({ message: "Success to create product", productCreate });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productUpdate = await ProductModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ message: "Success to update product", productUpdate });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productDelete = await ProductModel.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Success to delete product", productDelete });
  } catch (error) {
    res.json({ message: error.message });
  }
};
