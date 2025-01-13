import { Outlet, ScrollRestoration } from "react-router";
import PageTransition from "./components/PageTransition";
import EdgeDistortion from "./components/EdgeDistortion";

import "./App.css";

function App() {
  return (
    <>
      <ScrollRestoration />

      <main className="page-wrapper">
        <Outlet />
      </main>

      <PageTransition />

      <EdgeDistortion />
      {/* <MousePositionTrackers /> */}
    </>
  );
}

export default App;
