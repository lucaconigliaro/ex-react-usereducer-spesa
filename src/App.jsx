import { useReducer } from "react";

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const addedProduct = addedProducts.find(p => p.name === action.payload.name);
      if (addedProduct) {
        return addedProducts.map(p =>
          p.name === action.payload.name
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        return [...addedProducts, { ...action.payload, quantity: 1 }];
      }

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts;
      }
      return addedProducts.map(p =>
        p.name === action.payload.name
          ? { ...p, quantity: action.payload.quantity }
          : p
      );

    case 'REMOVE_ITEM':
      return addedProducts.filter(p => p.name !== action.payload);

    default:
      return addedProducts;
  }
}

function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);

  const total = addedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  return (
    <div>
      <h1>Prodotti</h1>
      {products.map((product, index) => (
        <div key={index}>
          <p>Nome: {product.name}</p>
          <p>Prezzo: {product.price.toFixed(2)}€</p>
          <button onClick={() => dispatchCart({ type: 'ADD_ITEM', payload: product })}>Aggiungi al carrello</button>
        </div>
      ))}

      {addedProducts.length > 0 && (
        <div>
          <h2>Prodotti nel carrello</h2>
          <ul>
            {addedProducts.map((product, index) => (
              <li key={index}>
                <p>
                  <input
                    type="number"
                    value={product.quantity}
                    min="1"
                    step="1"
                    onChange={e => dispatchCart({
                      type: 'UPDATE_QUANTITY',
                      payload: { name: product.name, quantity: parseInt(e.target.value) }
                    })}
                  />
                  <span> x {product.name} ({product.price.toFixed(2)}€)</span>
                </p>
                <button onClick={() => dispatchCart({ type: 'REMOVE_ITEM', payload: product.name })}>Rimuovi dal carrello</button>
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