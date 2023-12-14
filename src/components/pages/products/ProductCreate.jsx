import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.css";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const initialValues = {
    name: "",
    price: "",
    description: "",
  };
  const onSubmit = (values) => {
    console.log(JSON.stringify(values, null, 4));
    createProduct();
  };
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Product name cannot be empty!")
      .min(8, "Product name at least 8 characters!"),
    price: yup
      .number("Product price should be number!")
      .positive()
      .integer()
      .required("Product price cannot be empty!"),
    description: yup
      .string()
      .min(12, "Product description at least 12 characters")
      .required("Product description cannot be empty!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const createProduct = async () => {
    try {
      const resp = await axios.post("http://localhost:3001/products", {
        name: formik.values.name,
        price: formik.values.price,
        description: formik.values.description,
      });
      console.log(resp.data.productCreate);
      alert(resp.data.message);
      navigate("/products");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="container">
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
                      required
                      placeholder="Enter product name"
                      autoComplete="off"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.name && (
                      <div className="text-danger">{formik.errors.name}</div>
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
                      required
                      placeholder="Enter product price"
                      autoComplete="off"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.price && (
                      <div className="text-danger">{formik.errors.price}</div>
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
                      required
                      placeholder="Enter product description"
                      autoComplete="off"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    ></textarea>
                    {formik.errors.description && (
                      <div className="text-danger">
                        {formik.errors.description}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-md btn-primary">
                      Create
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <small>{JSON.stringify(formik, null, 2)}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductCreate;
