import React, { useState } from "react";

function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  function updateProductQuantity(name, quantity) {
    if (quantity < 1 || isNaN(quantity)) {
      return;
    }
    setAddedProducts(curr =>
      curr.map(p => p.name === name ? { ...p, quantity } : p)
    );
  }

  function addToCart(product) {
    const addedProduct = addedProducts.find(p => p.name === product.name);
    if (addedProduct) {
      updateProductQuantity(addedProduct.name, addedProduct.quantity + 1)
      return;
    }
    setAddedProducts(curr => [...curr, {
      ...product,
      quantity: 1
    }]);
  }

  function removeFromCart(product) {
    setAddedProducts(curr => curr.filter(p => p.name !== product.name));
  }

  const total = addedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  return (
    <div>
      <h1>Prodotti</h1>
      {products.map((product, index) => (
        <div key={index}>
          <p>Nome: {product.name}</p>
          <p>Prezzo: {product.price.toFixed(2)}€</p>
          <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
        </div>
      ))}

      {addedProducts.length > 0 && (
        <div>
          <h2>Prodotti nel carrello</h2>
          <ul>
            {addedProducts.map((product, index) => (
              <li key={index}>
                <p>
                  <input type="number"
                    value={product.quantity}
                    onChange={e => updateProductQuantity(product.name, parseInt(e.target.value))}
                  />
                  <span> x {product.name} ({product.price.toFixed(2)}€)</span>
                </p>
                <button onClick={() => removeFromCart(product)}>Rimuovi dal carrello</button>
              </li>
            ))}
          </ul>
          <h3>Totale: €{total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default App;