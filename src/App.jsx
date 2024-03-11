import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import ProtectRoutes from './Components/Protect Routes/ProtectRoutes';
import AllOrders from './Components/AllOrders/AllOrders';
import OnlinePayment from './Components/OnlinePayment/OnlinePayment';
import WishList from './Components/WishList/WishList';
import Categories from './Components/Categories/Categories';
import UserProfile from './Components/UserProfile/UserProfile';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetCode from './Components/ResetCode/ResetCode';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import ProtectToken from './Components/Protect Token/ProtectToken';
import ProtectIndex from './Components/Protect Index Element/ProtectIndex';

function App() {
  const routes = createBrowserRouter([
    {path: "", element: <LayOut/>, children: [
      {index: true, element: <ProtectIndex/> },
      {path: "home", element: <ProtectRoutes><Home/></ProtectRoutes>},
      {path: "products", element: <ProtectRoutes><Products/></ProtectRoutes>},
      {path: "productDetails/:id", element: <ProtectRoutes><ProductDetails/></ProtectRoutes>},
      {path: "categories", element: <ProtectRoutes><Categories/></ProtectRoutes>},
      {path: "cart", element: <ProtectRoutes><Cart/></ProtectRoutes>},
      {path: "brands", element: <ProtectRoutes><Brands/></ProtectRoutes>},
      {path: "online-payment", element: <ProtectRoutes><OnlinePayment/></ProtectRoutes>},
      {path: "allorders", element: <ProtectRoutes><AllOrders/></ProtectRoutes>},
      {path: "wishlist", element: <ProtectRoutes><WishList/></ProtectRoutes>},
      {path: "profile", element: <ProtectRoutes><UserProfile/></ProtectRoutes>},

      {path: "register", element: <ProtectToken> <Register/> </ProtectToken>},
      {path: "login", element: <ProtectToken> <Login/> </ProtectToken>},
      {path: "forgot-password", element: <ProtectToken> <ForgotPassword/> </ProtectToken>},
      {path: "reset-code", element: <ProtectToken> <ResetCode/> </ProtectToken>},
      {path: "updata-password", element: <ProtectToken> <UpdatePassword/> </ProtectToken>},
      
      {path: "*", element: <NotFound/>},
    ]}
  ])
  return <RouterProvider router={routes}></RouterProvider>
}

export default App;