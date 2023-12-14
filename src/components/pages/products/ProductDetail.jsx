import React from "react";
import UseFetch from "../../layouts/UseFetch";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = UseFetch(`http://localhost:3001/products/${id}`);

  const navigate = useNavigate();
  const deleteProduct = async (productId) => {
    try {
      const resp = await axios.delete(
        `http://localhost:3001/products/${productId}`
      );
      console.log(resp.data.message);
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
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <strong>Product Detail</strong>
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
                <div className="d-flex justify-content-between">
                  <Link
                    to={`/products/${product && product.productById.id}/edit`}
                    className="btn btn-sm btn-outline-warning"
                  >
                    Edit
                  </Link>
                  &nbsp;
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
