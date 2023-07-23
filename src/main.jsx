import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home/Home.jsx';
import CollegeDetails from './Components/CollegeDetails.jsx';
import Colleges from './Components/Colleges.jsx';
import Admission from './Components/Admission.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "colleges",
        element: <Colleges></Colleges>
      },
      {
        path: "college-details/:id",
        element: <CollegeDetails></CollegeDetails>
      },
      {
        path: "admission",
        element: <Admission></Admission>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
