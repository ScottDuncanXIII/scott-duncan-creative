import gsap from "gsap";
import data from "../data.json";

export const homeLoader = async () => {
  document.body.style.overflow = "hidden";

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
        duration: 0.2,
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
      const imagesToPreload: string[] = [];

      data.work.map((work) => {
        imagesToPreload.push(work.selectedWorks.thumbnailMain);
        imagesToPreload.push(work.selectedWorks.thumbnail3d);
      });

      setTimeout(() => {
        resolve(imagesToPreload);
      }, 100);
    });
  }

  return await preloadWorkData();
};
