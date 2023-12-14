/*
  # Membuat component ada 2 cara:
    > Class component
    > Functional component
*/

import React from "react";
import Header from "./components/layouts/Header";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import BlogDetail from "./components/pages/BlogDetail";
import BlogCreate from "./components/pages/BlogCreate";
import NotFound from "./components/pages/NotFound";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/pages/products/ProductList";
import ProductDetail from "./components/pages/products/ProductDetail";
import ProductEdit from "./components/pages/products/ProductEdit";
import ProductCreate from "./components/pages/products/ProductCreate";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/create" element={<BlogCreate />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/products/:id/edit" element={<ProductEdit />} />
              <Route path="/products/create" element={<ProductCreate />} />
            </Routes>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
