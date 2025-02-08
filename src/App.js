import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AppRoutes from './Routes/AppRoutes';
import { CartProvider } from './context/CartContext';
function App() {

  return <>
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  
  </>;
}

export default App;
