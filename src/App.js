import React, { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NavbarComponents } from "./components";
import { Home, Success, Transaksi } from "./pages";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponents />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Success" element={<Success />} />
            <Route path="/Transaksi" element={<Transaksi />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
