import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import SessionValidator from "./validators/session.validator";
import { Routes } from "./routes";
import LoginValidator from "./validators/login.validator";

const Login = lazy(() => import("../pages/Login"));
const OrderList = lazy(() => import("../pages/Order/List"));

const router = createBrowserRouter([
  {
    path: Routes.ROOT,
    loader: () => redirect(Routes.LOGIN),
  },
  {
    path: Routes.LOGIN,
    loader: LoginValidator,
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: Routes.ORDER_LIST,
    loader: SessionValidator,
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <OrderList />
      </Suspense>
    ),
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
