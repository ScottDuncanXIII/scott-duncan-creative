import { useContext, useRef, useState } from "react";
import { useLoaderData } from "react-router";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Intro from "../../modules/Intro";
import SelectedWorks from "../../modules/SelectedWorks";
import About from "../../modules/About";
import Footer from "../../modules/Footer";

import ParallaxBackground from "../../components/ParallaxBackground";
import Scanlines from "../../components/Scanlines";
import Preloader from "../../components/Preloader";

import "./home.css";
import { PreloaderActiveContext } from "../../context/PreloaderActiveContext";

export default function Home() {
  const isInitialPageLoad = useRef(true);
  const [skipPreload, setSkipPreload] = useState(false);
  const [preloadComplete, setPreloadComplete] = useState(false);
  const loaderData = useLoaderData();
  const pageTransitionTimeline = gsap.timeline({ paused: true });

  const preloaderActiveContext = useContext(PreloaderActiveContext);

  useGSAP(() => {
    if (!isInitialPageLoad.current) return;

    gsap.set(".page-transition", { display: "flex" });
    gsap.set(".page-transition__tile", { autoAlpha: 1 });

    if (preloaderActiveContext?.preloaderActiveArray.includes("home")) {
      setSkipPreload(true);
      handlePreloadComplete();
    } else {
      preloaderActiveContext?.pushItemToArray("home");
    }

    return () => (isInitialPageLoad.current = false);
  }, []);

  useGSAP(() => {
    if (!preloadComplete) return;
    //console.log("Home: preloadComplete Init");

    pageTransitionTimeline.fromTo(
      ".page-transition__tile",
      { autoAlpha: 1 },
      {
        duration: 0.2,
        autoAlpha: 0,
        stagger: {
          amount: 1,
          grid: [10, 10],
        },
        delay: 0.3,
      }
    );

    pageTransitionTimeline.set(".page-transition", { display: "none" });

    pageTransitionTimeline.then(() => {
      document.body.style.overflow = "auto";
    });

    pageTransitionTimeline.play();
  }, [preloadComplete]);

  function handlePreloadComplete() {
    pageTransitionTimeline.set(".page-transition", { display: "flex" });
    setPreloadComplete(true);
  }

  return (
    <>
      {!skipPreload && (
        <Preloader
          color={"#b46e12"}
          imagesArray={loaderData}
          handlePreloadComplete={handlePreloadComplete}
        />
      )}

      <ParallaxBackground imageUrl={"/imgs/main-background.jpg"}>
        <Intro initAnimations={preloadComplete} />
        <SelectedWorks init={preloadComplete} />
      </ParallaxBackground>

      <About init={preloadComplete} />

      <Footer />

      <a
        className="edge-links__email"
        href="mailto:scott@scottduncancreative.com"
      >
        Email
      </a>
      <a
        className="edge-links__linkedin"
        href="https://www.linkedin.com/in/scduncan/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Linkedin
      </a>

      <Scanlines />
    </>
  );
}
