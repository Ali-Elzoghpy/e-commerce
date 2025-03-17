import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout1 from "./Compnents/Layout1/Layout1.jsx";
import Home from "./Compnents/Home/Home";
import Rigester from "./Compnents/Rigester/Rigester";
import Cart from "./Compnents/Cart/Cart";
import Category from "./Compnents/Category/Category";
import Proudcts from "./Compnents/Proudcts/Proudcts";
import Brand from "./Compnents/Brand/Brand";
import Login from "./Compnents/Login/Login";
import NewPassword from "./Compnents/NewPassword/NewPassword";
import Forgert from "./Compnents/ForgetPassowrd/Forgert.jsx";
import AuthContextProvider from "./Compnents/Context/AuthContextProvider.jsx";
import ProutectedRoute from "./Compnents/ProutectedRoute/ProutectedRoute";
import ProudectDeatls from "./Compnents/ProudectDeatls/ProudectDeatls.jsx";
import CartContextProvider from "./Compnents/Context/CartContext.jsx";
import ShipingDealts from "./Compnents/ShipingDealts/ShipingDealts.jsx";
import AllOrders from "./Compnents/AllOrders/AllOrders";
import WishList from "./Compnents/WishList/WishList";
import WishLIstContextProvider from "./Compnents/Context/WishLIstContextProvider.jsx";
import Profile from "./Compnents/Profile/Profile";
import OrderDeatls from "./Compnents/AllOrders/OrderDeatls";
import OrderInfo from "./Compnents/AllOrders/OrderInfo";
import Update from "./Compnents/Update/Update";
import ChangePassword from "./Compnents/change-password/ChangePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from './Compnents/NotFound/NotFound.jsx';

function App() {
  const route = createBrowserRouter([
    {
      path: "",
      element: <Layout1 />,
      children: [
        {
          index: true,
          element: (
            <ProutectedRoute>
              <Home />
            </ProutectedRoute>
          ),
        },
        { path: "signup", element: <Rigester /> },
        {
          path: "cart",
          element: (
            <ProutectedRoute>
              <Cart />
            </ProutectedRoute>
          ),
        },
        {
          path: "category",
          element: (
            <ProutectedRoute>
              <Category />
            </ProutectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "forgetPassword", element: <Forgert /> },
        { path: "newPassword", element: <NewPassword /> },
        {
          path: "proudct",
          element: (
            <ProutectedRoute>
              <Proudcts />
            </ProutectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProutectedRoute>
              <Brand />
            </ProutectedRoute>
          ),
        },
        {
          path: "proudctDeatls/:id/:category",
          element: (
            <ProutectedRoute>
              <ProudectDeatls />
            </ProutectedRoute>
          ),
        },
        {
          path: "shipingDeatls/:id",
          element: (
            <ProutectedRoute>
              <ShipingDealts />
            </ProutectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProutectedRoute>
              <AllOrders />
            </ProutectedRoute>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProutectedRoute>
              <WishList />
            </ProutectedRoute>
          ),
        },
        {
          path: "Profile",
          element: (
            <ProutectedRoute>
              <Profile />
            </ProutectedRoute>
          ),
          children: [
            {
              path: "update",
              element: (
                <ProutectedRoute>
                  <Update />
                </ProutectedRoute>
              ),
            },

            {
              path: "change-password",
              element: (
                <ProutectedRoute>
                  <ChangePassword />
                </ProutectedRoute>
              ),
            },
          ],
        },
        {
          path: "allorders/:id",
          element: (
            <ProutectedRoute>
              <OrderDeatls />
            </ProutectedRoute>
          ),
        },
        {
          path: "proudct/:id",
          element: (
            <ProutectedRoute>
              <OrderInfo />
            </ProutectedRoute>
          ),
        },

        {
          path: "*",
          element: <NotFound/>,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />

      <WishLIstContextProvider>
        <CartContextProvider>
          <AuthContextProvider>
            <RouterProvider router={route} />
          </AuthContextProvider>
        </CartContextProvider>
      </WishLIstContextProvider>
    </>
  );
}

export default App;
