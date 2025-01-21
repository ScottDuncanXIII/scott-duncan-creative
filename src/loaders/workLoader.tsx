import gsap from "gsap";
import data from "../data.json";
import { Params } from "react-router";

export const workLoader = async ({ params }: { params: Params<"workId"> }) => {
  document.body.style.overflow = "hidden";

  const { workId } = params;
  const workDetailsData = data.work.filter((work) => work.id === workId)[0];

  if (document.querySelector(".page-transition")) {
    let pageTransitionTimeline: gsap.core.Timeline | null = gsap.timeline({
      paused: true,
    });

    pageTransitionTimeline.set(".page-transition", {
      display: "flex",
    });

    pageTransitionTimeline.fromTo(
      ".page-transition__tile",
      { autoAlpha: 0 },
      {
        duration: 0.1,
        autoAlpha: 1,
        stagger: {
          amount: 1,
          grid: [10, 10],
        },
      }
    );

    pageTransitionTimeline.play();

    await pageTransitionTimeline.then(() => {
      pageTransitionTimeline?.kill();
      pageTransitionTimeline = null;
    });
  }

  function preloadWorkData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(workDetailsData);
      }, 100);
    });
  }

  return await preloadWorkData();
};
