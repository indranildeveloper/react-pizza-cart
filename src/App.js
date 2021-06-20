import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import ProductsPage from "./pages/ProductsPage";
import { CartContext } from "./CartContext";
import { getCart, storeCart } from "./helpers";

function App() {
  const [cart, setCart] = useState({});
  // Fetch from localstorage
  useEffect(() => {
    getCart().then((cart) => {
      setCart(JSON.parse(cart));
    });
  }, []);

  useEffect(() => {
    storeCart(JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/products" component={ProductsPage}></Route>
            <Route path="/products/:_id" component={SingleProduct}></Route>
            <Route path="/cart" component={Cart}></Route>
          </Switch>
        </CartContext.Provider>
      </Router>
    </div>
  );
}

export default App;
