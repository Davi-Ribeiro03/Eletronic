import { createBrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import CartProvider from "../context/CartContext";
import { FormProvider } from "../context/FormContext";
import { ToastProvider } from "../context/ToastContext";
import Carrinho from "../pages/Carrinho/Carrinho";
import Dashboard from "../pages/Dashboard/Dashboard";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import PrivateRouter from "./PrivateRouter";

// const Router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/Home",
//     element: (
//       <PrivateRouter>
//         <Home />
//       </PrivateRouter>
//     ),
//   },
//   {
//     path: "/Dashboard",
//     element: (
//       <PrivateRouter>
//         <Dashboard />
//       </PrivateRouter>
//     ),
//   },
//   {
//     path: "/ErrorPage",
//     element: (
//       <PrivateRouter>
//         <ErrorPage />
//       </PrivateRouter>
//     ),
//   },
//   {
//     path: "/Carrinho",
//     element: (
//       <PrivateRouter>
//         <CartProvider>
//           <ToastProvider>
//             <Carrinho />
//           </ToastProvider>
//         </CartProvider>
//       </PrivateRouter>
//     ),
//   },
//   {
//     path: "/Products",
//     element: (
//       <PrivateRouter>
//         <FormProvider>
//           <Products />
//         </FormProvider>
//       </PrivateRouter>
//     ),
//   },
// ]);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="Home"
        element={
          <PrivateRouter>
            <Home />
          </PrivateRouter>
        }
      />
      <Route
        path="Dashboard"
        element={
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        }
      />
      <Route
        path="Carrinho"
        element={
          <PrivateRouter>
            <CartProvider>
              <ToastProvider>
                <Carrinho />
              </ToastProvider>
            </CartProvider>
          </PrivateRouter>
        }
      />
      <Route
        path="Products"
        element={
          <PrivateRouter>
            <FormProvider>
              <Products />
            </FormProvider>
          </PrivateRouter>
        }
      />
      {/* </Route> */}
      <Route
        path="*"
        element={
          <PrivateRouter>
            <ErrorPage />
          </PrivateRouter>
        }
      />
    </Routes>
  );
}

// export default Router;
