import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import UseFetch from "../../layouts/UseFetch";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isError,
  } = UseFetch(`http://localhost:8001/products/${id}`);

  const deleteProduct = async (productID) => {
    try {
      const response = await axios.delete(
        `http://localhost:8001/products/${productID}`
      );
      console.log(response.data.productDelete);
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
              <strong>
                Product Detail | ID: {product && product.productById.id}
              </strong>
            </div>
            <div className="card-body">
              {isError && (
                <div>
                  <h2>{isError}</h2>
                </div>
              )}
              {isLoading && (
                <div>
                  <h2>Loading.....</h2>
                </div>
              )}
              {product && (
                <div>
                  <h5>{product.productById.name}</h5>
                  <p>{product.productById.price}</p>
                  <p>{product.productById.description}</p>
                </div>
              )}
            </div>
            <div className="card-footer">
              <Link
                to={`/products/${product && product.productById.id}/edit`}
                className="btn btn-sm btn-outline-info"
              >
                Edit
              </Link>{" "}
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => {
                  if (window.confirm("Are you sure to delete?")) {
                    deleteProduct(product && product.productById.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
