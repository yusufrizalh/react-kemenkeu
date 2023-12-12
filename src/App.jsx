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

const App = () => {
  /* # Mendeklarasikan variabel
        > var   : bersifat mutable
        > const : bersifat immutable, final, harus diinisialisasi
        > let   : bersifat immutable, tidak harus diinisialisasi
  */
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          {/* komponen Header */}
          <Header />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/create" element={<BlogCreate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
