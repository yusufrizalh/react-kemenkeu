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
    const response = await axios.get("http://localhost:8001/products");
    setProducts(response.data.products);
  };

  const search = (products) => {
    return products.filter((product) => {
      return searchParam.some((foundProduct) => {
        return (
          product[foundProduct]
            .toString()
            .toLowerCase()
            .indexOf(query.toLocaleLowerCase()) > -1
        );
      });
    });
  };

  const deleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:8001/products/${id}`)
      .then(() => {
        getAllProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-3">
          <Link to="/products/create" className="btn btn-md btn-primary">
            New Product
          </Link>
        </div>
        <div className="col-md-9">
          <input
            className="form-control"
            autoComplete="off"
            type="search"
            name="search-form"
            id="search-form"
            placeholder="Search by product name"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      <br />
      <br />
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
                    <th>Actions</th>
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
                      <td>
                        <Link
                          to={`/products/${item.id}/edit`}
                          className="btn btn-sm btn-outline-info"
                        >
                          Edit
                        </Link>{" "}
                        &nbsp;
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            if (window.confirm("Are you sure to delete?")) {
                              deleteProduct(item.id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
