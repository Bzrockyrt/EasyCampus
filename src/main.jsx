import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './style/index.css'
import Root from './pages/root'
import Profile from './pages/Profile'
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import EditUser from './pages/EditUser'
import SheerId from "./pages/SheerId";
import Layout from "./pages/Layout";
import Lesson from './pages/Lesson'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{
      path: "/",
      element: <Root />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/edit",
      element: <EditUser />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/sheerid",
      element: <SheerId />,
    },
    {
      path: "/lesson",
      element: <Lesson />,
    },
    /* THIS IS A TEST */
    {
      path: "/a",
      element: <App />,
      children: [
        {
          path: "page1",
          element: <div>page1</div>
        },
        {
          path: "page2",
          element: <div>page2</div>
        }
      ]
    },]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>,
)
