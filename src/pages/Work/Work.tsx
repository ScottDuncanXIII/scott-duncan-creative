import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useLoaderData } from "react-router";

import gsap from "gsap";

import Preloader from "../../components/Preloader";
import WorkHero from "./components/WorkHero";
import WorkTech from "./components/WorkTech";
import ParallaxBackground from "../../components/ParallaxBackground";
import ScrollGallery from "../../components/ScrollGallery";
import Overview from "../../modules/Overview";
import Footer from "../../modules/Footer";

import { SelectedWorkType } from "../../types/SelectedWorksType";
import { TechStackType } from "../../types/TechStackType";
import { WorkHeroType } from "../../types/WorkHeroType";

import { PreloaderActiveContext } from "../../context/PreloaderActiveContext";

import data from "../../data.json";

import "./work.css";

export default function Work() {
  const { workId } = useParams();
  const workDetails = useRef(null);
  const labels = useRef(data.labels);
  const loaderData = useLoaderData() as SelectedWorkType;
  const [imagesPreloadComplete, setImagesPreloadComplete] = useState(false);
  const [skipPreload, setSkipPreload] = useState(false);
  const preloaderActiveContext = useContext(PreloaderActiveContext);

  useEffect(() => {
    if (preloaderActiveContext?.preloaderActiveArray.includes(loaderData?.id)) {
      setSkipPreload(true);
      handlePreloadComplete();
      gsap.fromTo(
        ".page-transition__tile",
        { autoAlpha: 1 },
        {
          duration: 1,
          autoAlpha: 0,
          onComplete: () => {
            gsap.set(".page-transition", { display: "none" });
          },
        }
      );
    } else {
      gsap.set(workDetails.current, { autoAlpha: 0 });
      gsap.set(".page-transition", { display: "none" });
      preloaderActiveContext?.pushItemToArray(loaderData?.id);
    }
  }, []);

  useEffect(() => {
    if (!imagesPreloadComplete) return;

    gsap.to(workDetails.current, { autoAlpha: 1 });
    document.body.style.overflow = "auto";
  }, [imagesPreloadComplete]);

  function getHeroModel(): WorkHeroType {
    return {
      id: loaderData?.id,
      initAnim: imagesPreloadComplete,
      heroImage: loaderData?.heroImage,
      link: loaderData?.link,
      mainColor: loaderData?.colorMain,
      title: loaderData?.title,
      workplaceLabel: labels.current?.workplace,
      workplace: loaderData?.workplace,
      yearsLabel: labels.current?.years,
      years: {
        label: loaderData?.years?.label,
        value: loaderData?.years?.value,
      },
      statusLabel: labels.current?.status,
      status: loaderData?.status,
    };
  }

  function handlePreloadComplete() {
    setImagesPreloadComplete(true);
  }

  return (
    <section id="work" key={workId}>
      {!skipPreload && (
        <Preloader
          color={loaderData?.colorMain as string}
          imagesArray={loaderData?.caseStudyImages.map((image) => image.url)}
          handlePreloadComplete={handlePreloadComplete}
        />
      )}

      <div className={"work"} ref={workDetails}>
        <WorkHero imagesLoaded={imagesPreloadComplete} model={getHeroModel()} />

        <Overview
          color={loaderData?.colorMain}
          headingB={"overview /"}
          headingC={"Highlights"}
          paragraphs={[loaderData?.overview, loaderData?.highlights]}
        />

        <WorkTech
          color={loaderData?.colorMain}
          heading={labels.current?.technology}
          techStackIds={loaderData?.techStackIds}
          techStack={data.techStack as TechStackType[]}
        />

        {imagesPreloadComplete && (
          <ParallaxBackground
            imageUrl="/imgs/background-work-scroll.jpg"
            overlayColor={loaderData?.colorMain}
          >
            <ScrollGallery imageArray={loaderData?.caseStudyImages} />
          </ParallaxBackground>
        )}

        <Footer />
      </div>
    </section>
  );
}
