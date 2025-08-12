import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from "../src/Authentication/AuthContext";
import ProtectedRoute from './Authentication/ProtectedRoute';
import App from './app';
import SignUp from './Components/Sign-up';
import Login from './Components/Login';
import UserDashboard from './Components/UserDashboard';
import AdminAddEmployee from './Components/AddEmployee';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/admin-dashboard",
    element: <AdminAddEmployee />
  },
  {
    path: "/user-dashboard/:email",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    )
  }
]);
const root = createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);