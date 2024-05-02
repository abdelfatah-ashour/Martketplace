import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Products from "./pages/Products";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
    ],
  },
  {
    path: "*",
    element: <p>Not found</p>,
  },
]);

export default router;
