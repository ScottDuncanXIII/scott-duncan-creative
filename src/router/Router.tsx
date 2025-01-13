import { createBrowserRouter } from "react-router";
import { homeLoader } from "../loaders/homeLoader";
import { workLoader } from "../loaders/workLoader";

import App from "../App";
import Home from "../pages/Home";
import WorkWrapper from "../pages/Work/WorkWrapper";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          element: <Home />,
          path: "/",
          loader: homeLoader,
        },
        {
          element: <WorkWrapper />,
          path: "/work/:workId",
          loader: workLoader,
        },
      ],
    },
  ]);
  return router;
}
