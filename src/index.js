import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NewsComponent from './components/NewsComponent';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import About from './components/About';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
          path: "category/:topic",
          element: <NewsComponent />
          // children: [
          //   { path: "general", element: <NewsComponent category = "general"/> },
          //   { path: "sports", element: <NewsComponent category = "sports"/> },
          //   { path: "technology", element: <NewsComponent category = "technology"/> },
          //   { path: "entertainment", element: <NewsComponent category = "entertainment"/> },
          //   { path: "business", element: <NewsComponent category = "business"/> },
          //   { path: "health", element: <NewsComponent category = "health"/> },
          //   { path: "science", element: <NewsComponent category = "science"/> },
          // ]
        },
        {
          path: "",
          element: <NewsComponent/>
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "search",
          children: [{ path: ":topic" , element: <NewsComponent /> }]
        },
        {
          path: "lang/:ln",
          element: <NewsComponent />
        }
      ]
    },
  ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router = {router} />
);
