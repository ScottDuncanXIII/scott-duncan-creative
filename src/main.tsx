import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import Router from "./router/Router";

import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger, TextPlugin } from "gsap/all";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUniversalAccess } from "@fortawesome/free-solid-svg-icons";

import {
  faBitbucket,
  faCss3Alt,
  faFigma,
  faHtml5,
  faJira,
  faJs,
  faLess,
  faPhp,
  faSass,
  faWordpress,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faBitbucket,
  faCss3Alt,
  faFigma,
  faHtml5,
  faJira,
  faJs,
  faLess,
  faPhp,
  faSass,
  faUniversalAccess,
  faVuejs,
  faWordpress
);

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, TextPlugin);

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={Router()} />
  </StrictMode>
);
