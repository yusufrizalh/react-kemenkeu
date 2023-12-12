import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const initialValues = {
    name: "",
    price: "",
    description: "",
  };
  const onSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    createProduct();
  };
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Product name cannot be empty!")
      .min(8, "Product name minimal 8 characters!"),
    price: yup
      .number()
      .required("Product price cannot be empty!")
      .positive()
      .integer(),
    description: yup
      .string()
      .required("Product description cannot be empty!")
      .min(12, "Product description minimal 8 characters!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const createProduct = async (event) => {
    // event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8001/products", {
        name: formik.values.name,
        price: formik.values.price,
        description: formik.values.description,
      });
      console.log(response.data.productCreate);
      alert(response.data.message);
      navigate("/products");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <strong>Create Product</strong>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <strong>Product Name</strong>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Please enter product name"
                    autoComplete="off"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && (
                    <div style={{ color: "crimson" }}>{formik.errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    <strong>Product Price</strong>
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="Please enter product price"
                    autoComplete="off"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.price && (
                    <div style={{ color: "crimson" }}>
                      {formik.errors.price}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    <strong>Product Description</strong>
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    cols="6"
                    rows="3"
                    className="form-control"
                    placeholder="Please enter product description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  ></textarea>
                  {formik.errors.description && (
                    <div style={{ color: "crimson" }}>
                      {formik.errors.description}
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <button type="submit" className="btn btn-md btn-primary">
                    Create
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <code>{JSON.stringify(formik, null, 4)}</code>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductCreate;
