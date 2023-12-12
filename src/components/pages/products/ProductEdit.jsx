import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
    const response = await axios.get(`http://localhost:8001/products/${id}`);
    setName(response.data.productById.name);
    setPrice(response.data.productById.price);
    setDescription(response.data.productById.description);
  };

  const updateProduct = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8001/products/${id}`, {
        name: name,
        price: price,
        description: description,
      });
      console.log(response.data.productUpdate);
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
                    className="form-control"
                    placeholder="Please enter product name"
                    autoComplete="off"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    <strong>Product Price</strong>
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Please enter product price"
                    autoComplete="off"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    <strong>Product Description</strong>
                  </label>
                  <textarea
                    name="description"
                    cols="6"
                    rows="3"
                    className="form-control"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mt-5">
                  <button type="submit" className="btn btn-md btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductEdit;
