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
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={route} />
      </AuthContextProvider>
    </>
  );
}

export default App;
