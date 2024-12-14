import mongoose from "mongoose";
import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error("Error in Fetch Products: ", error.message);
		res.status(500).send({ success: false, message: "Server Error" });
	}
};

export const createProduct = async (req, res) => {
	const product = req.body; // user input

	if (!product.name || !product.price || !product.image) {
		return res.status(400).send({ success: false, message: "All fields are required" });
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).send({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create Product: ", error.message);
		res.status(500).send({ success: false, message: "Server Error" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).send({ success: true, data: updatedProduct });
	} catch (error) {
		console.error("Error in Update Product: ", error.message);
		res.status(500).send({ success: false, message: "Server Error" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).send({ success: true, message: "Product Deleted Successfully" });
	} catch (error) {
		console.error("Error in Delete Product: ", error.message);
		res.status(500).send({ success: false, message: "Server Error" });
	}
};
