import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Root from './root'
import Profile from './Profile'
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [{
      path: "/",
      element: <Root />,
    },
    {
      path: "/login",
      element: <Profile />,
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
