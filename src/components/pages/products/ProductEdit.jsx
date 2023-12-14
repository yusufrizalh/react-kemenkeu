import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const resp = await axios.get(`http://localhost:3001/products/${id}`);
    setName(resp.data.productById.name);
    setPrice(resp.data.productById.price);
    setDescription(resp.data.productById.description);
  };

  const updateProduct = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.put(`http://localhost:3001/products/${id}`, {
        name: name,
        price: price,
        description: description,
      });
      console.log(resp.data.productUpdate);
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
                <strong>Edit Product</strong>
              </div>
              <div className="card-body">
                <form onSubmit={updateProduct}>
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
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
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
                      value={price}
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                    />
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
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-md btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductEdit;
