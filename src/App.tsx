import { Outlet, ScrollRestoration } from "react-router";
import PageTransition from "./components/PageTransition";
import EdgeDistortion from "./components/EdgeDistortion";
import { PreloaderActiveProvider } from "./context/PreloaderActiveContext";

import "./App.css";

function App() {
  return (
    <>
      <ScrollRestoration />

      <main className="page-wrapper">
        <PreloaderActiveProvider>
          <Outlet />
        </PreloaderActiveProvider>
      </main>

      <PageTransition />

      <EdgeDistortion />
      {/* <MousePositionTrackers /> */}
    </>
  );
}

export default App;
