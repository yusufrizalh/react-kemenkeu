import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["name"]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const resp = await axios.get("http://localhost:3001/products");
      console.log(
        "Message: ",
        resp.data.message + ", Response: ",
        resp.data.products
      );
      setProducts(resp.data.products); // mengisi products dengan hasil dari API
    } catch (error) {
      console.log(error.message);
    }
  };

  const search = (products) => {
    return products.filter((product) => {
      return searchParam.some((findProduct) => {
        return (
          product[findProduct]
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        );
      });
    });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-4">
            <Link to="/products/create" className="btn btn-md btn-primary">
              Create Product
            </Link>
          </div>
          <div className="col-md-8">
            <input
              type="search"
              name="search"
              id="search"
              autoComplete="off"
              placeholder="Search by product name"
              className="form-control"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Product List</strong>
              </div>
              <div className="card-body">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Product Name</th>
                      <th>Product Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {search(products).map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          <Link
                            to={`/products/${item.id}`}
                            className="text-primary text-decoration-none"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
