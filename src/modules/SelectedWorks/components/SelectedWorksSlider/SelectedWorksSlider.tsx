import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SplitType from "split-type";

import SelecedWorkTile from "../SelectedWorksTile";

import { SelectedWorkType } from "../../../../types/SelectedWorksType";
import data from "../../../../data.json";

import linkArrow from "/imgs/link-arrow.svg";

import "./selected.works.slider.css";
import AccessibleText from "../../../../components/AccessibleText";

export default function SelectedWorksSlider({
  init = false,
}: {
  init: boolean;
}) {
  const containerEl = useRef(null);
  const headingEl = useRef(null);
  const sliderListEl = useRef(null);
  const linkLineTopEl = useRef(null);
  const linkLineRightEl = useRef(null);
  const sliderNavBtnPrev = useRef(null);
  const sliderNavBtnNext = useRef(null);
  const selectedWorksSliderPaginationEl = useRef(null);
  const isMobile = useRef(false);
  const isTransitionActive = useRef(false);

  const [workSelectionArray, setWorkSelectionArray] = useState<
    SelectedWorkType[][]
  >([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [paginationIndex, setPaginationIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [animateOutNext, setAnimateOutNext] = useState(false);
  const [animateOutPrev, setAnimateOutPrev] = useState(false);
  const [animateInNext, setAnimateInNext] = useState(false);
  const [animateInPrev, setAnimateInPrev] = useState(false);
  const { contextSafe } = useGSAP({ scope: containerEl });

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);

    function onWindowResize() {
      if (window.innerWidth > 3000) {
        setItemsPerPage(5);
      } else if (window.innerWidth > 2560) {
        setItemsPerPage(5);
      } else if (window.innerWidth > 1920) {
        setItemsPerPage(4);
      } else if (window.innerWidth > 1280) {
        setItemsPerPage(4);
      } else if (window.innerWidth > 1028) {
        setItemsPerPage(3);
      } else if (window.innerWidth > 768) {
        setItemsPerPage(3);
      } else if (window.innerWidth > 0) {
        setItemsPerPage(4);
      }

      if (window.innerWidth > 768) {
        isMobile.current = false;
      } else {
        isMobile.current = true;
      }
    }

    onWindowResize();

    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  useEffect(() => {
    if (itemsPerPage === 0) {
      return;
    }

    const tempArray: SelectedWorkType[][] = [];

    for (let i = 0; data?.work.length > i; i += itemsPerPage) {
      tempArray.push(data?.work?.slice(i, i + itemsPerPage));
    }

    if (
      document.querySelector(
        ".selected-works-slider-nav__pagination-btn-highlight"
      )
    ) {
      gsap.to(".selected-works-slider-nav__pagination-btn-highlight", {
        backgroundColor: "#333333",
        duration: 0.1,
      });
    }

    setPaginationIndex(0);

    setTotalPages(tempArray.length);
    setWorkSelectionArray(tempArray);
    setCurrentPage(0);
  }, [itemsPerPage]);

  useGSAP(() => {
    if (!init || !workSelectionArray || workSelectionArray?.length === 0)
      return;

    console.log(headingEl.current);

    const scrollGalleryHeadingSplit = new SplitType(headingEl.current!, {
      types: "words,chars",
    });

    let tl = gsap.timeline({});

    tl.set(headingEl.current, {
      opacity: 1,
    });

    tl.set(scrollGalleryHeadingSplit?.chars, {
      yPercent: -100,
    });

    ScrollTrigger.create({
      //markers: true,
      start: "top 60%",
      end: "bottom 40%",
      trigger: containerEl.current,
      onEnter: () => {
        handleSelectedWorksEnter();
      },
      onEnterBack: () => {
        handleSelectedWorksEnter();
      },
      onLeaveBack: () => {
        handleSelectedWorksLeave();
      },
      onLeave: () => {
        handleSelectedWorksLeave();
      },
    });

    function handleSelectedWorksEnter() {
      console.log("handleSelectedWorksEnter");
      tl?.clear();
      tl = gsap.timeline({});

      tl.set(".selected-works-tile__link", { pointerEvents: "none" });

      tl.to(scrollGalleryHeadingSplit?.chars, {
        duration: 0.8,
        opacity: 1,
        yPercent: 0,
        ease: "power4.out",
        stagger: {
          each: 0.1,
          from: "random",
        },
      });

      tl.to(
        ".selected-works-tile__background-image",
        {
          duration: 0.7,
          ease: "power4.inOut",
          clipPath: `polygon(${isMobile.current ? "10%" : "15%"} 0%, 100% 0%, ${
            isMobile.current ? "90%" : "85%"
          } 100%, 0% 100%)`,
          stagger: { each: 0.1 },
        },
        "<+=25%"
      );

      tl.to(
        ".selected-works-tile__logo",
        {
          duration: 0.5,
          autoAlpha: 1,
          stagger: { each: 0.1 },
        },
        "<+=60%"
      );

      tl.to(
        ".selected-works-tile__content",
        {
          duration: 0.5,
          autoAlpha: 1,
          stagger: { each: 0.1 },
        },
        "<+=10%"
      );

      tl.set(".selected-works-tile__link", { pointerEvents: "all" }, "<");

      tl.to(
        linkLineTopEl.current,
        {
          duration: 2.5,
          width: "100%",
          ease: "power4.inOut",
        },
        "<-=25%"
      );

      tl.to(
        linkLineRightEl.current,
        {
          duration: 2,
          height: "100%",
          ease: "power4.inOut",
        },
        "<"
      );

      tl.to(
        sliderNavBtnPrev.current,
        {
          duration: 1,
          yPercent: 0,
          autoAlpha: 1,
          ease: "power4.inOut",
        },
        "<+=25%"
      );

      tl.to(
        ".selected-works-slider-nav__pagination-btn",
        {
          duration: 1,
          yPercent: 0,
          autoAlpha: 1,
          ease: "power4.inOut",
          stagger: {
            each: 0.1,
          },
        },
        "<+=10%"
      );

      tl.to(
        sliderNavBtnNext.current,
        {
          duration: 1,
          yPercent: 0,
          autoAlpha: 1,
          ease: "power4.inOut",
        },
        "<+=25%"
      );
    }

    function handleSelectedWorksLeave() {
      console.log("handleSelectedWorksLeave");
      tl?.clear();
      tl = gsap.timeline({});

      tl.set(".selected-works-tile__link", { pointerEvents: "none" });

      tl.to(
        sliderNavBtnPrev.current,
        {
          duration: 1,
          yPercent: 100,
          autoAlpha: 0,
          ease: "power4.inOut",
        },
        "<+=25%"
      );

      tl.to(
        ".selected-works-slider-nav__pagination-btn",
        {
          duration: 1,
          yPercent: 100,
          autoAlpha: 0,
          ease: "power4.inOut",
          stagger: {
            each: 0.1,
          },
        },
        "<+=25%"
      );

      tl.to(
        sliderNavBtnNext.current,
        {
          duration: 1,
          yPercent: 100,
          autoAlpha: 0,
          ease: "power4.inOut",
        },
        "<+=25%"
      );

      tl.to(
        linkLineTopEl.current,
        {
          duration: 1,
          width: "0%",
          ease: "power4.inOut",
        },
        "<-=25%"
      );

      tl.to(
        linkLineRightEl.current,
        {
          duration: 1,
          height: "0%",
          ease: "power4.inOut",
        },
        "<"
      );

      tl.to(
        ".selected-works-tile__logo",
        {
          duration: 0.3,
          autoAlpha: 0,
          stagger: { each: 0.05, from: "end" },
        },
        "<+=10%"
      );

      tl.to(
        ".selected-works-tile__content",
        {
          duration: 0.3,
          autoAlpha: 0,
          stagger: { each: 0.05, from: "end" },
        },
        "<+=10%"
      );

      tl.to(
        ".selected-works-tile__background-image",
        {
          duration: 0.5,
          ease: "power4.inOut",
          clipPath: `polygon(${isMobile.current ? "10%" : "15%"} 0%, ${
            isMobile.current ? "10%" : "15%"
          } 0%, 0% 100%, 0% 100%)`,
          stagger: { each: 0.1 },
        },
        "<+=10%"
      );

      tl.to(
        scrollGalleryHeadingSplit?.chars,
        {
          duration: 0.5,

          opacity: 0,
          yPercent: -100,
          ease: "power4.out",
          stagger: {
            each: 0.05,
            from: "random",
          },
        },
        "<+=10%"
      );
    }
  }, [workSelectionArray, init]);

  useGSAP(() => {
    if (!animateOutNext && !animateOutPrev) return;

    const tl = gsap.timeline();

    tl.set(".selected-works-tile__link", {
      pointerEvents: "none",
    });

    tl.set(".selected-works-tile__background-image", {
      clipPath: `polygon(${isMobile.current ? "10%" : "15%"} 0%, 100% 0%, ${
        isMobile.current ? "90%" : "85%"
      } 100%, 0% 100%)`,
    });

    tl.to(
      ".selected-works-tile__logo",
      {
        duration: 0.2,
        autoAlpha: 0,
        stagger: { each: 0.1, from: animateOutNext ? "end" : "start" },
      },
      "<+=40%"
    );

    tl.to(
      ".selected-works-tile__content",
      {
        duration: 0.2,
        autoAlpha: 0,
        stagger: { each: 0.1, from: animateOutNext ? "end" : "start" },
      },
      "<+=10%"
    );

    tl.to(
      ".selected-works-tile__background-image",
      {
        duration: 0.6,
        ease: "power4.inOut",
        clipPath: animateOutNext
          ? `polygon(${isMobile.current ? "10%" : "15%"} 0%, ${
              isMobile.current ? "10%" : "15%"
            } 0%, 0% 100%, 0% 100%)`
          : `polygon(100% 0%, 100% 0%, ${
              isMobile.current ? "90%" : "85%"
            } 100%, ${isMobile.current ? "90%" : "85%"} 100%)`,
        stagger: { each: 0.1, from: animateOutNext ? "end" : "start" },
      },
      "<"
    );

    tl.then(() => {
      if (animateOutNext) {
        setAnimateOutNext(false);

        if (paginationIndex != -1) {
          setCurrentPage((prev) => {
            prev = paginationIndex;
            return prev;
          });
        } else {
          setCurrentPage((prev) => (prev += 1));
        }

        setAnimateInNext(true);
      } else {
        setAnimateOutPrev(false);

        if (paginationIndex != -1) {
          setCurrentPage((prev) => {
            prev = paginationIndex;
            return prev;
          });
        } else {
          setCurrentPage((prev) => (prev -= 1));
        }

        setAnimateInPrev(true);
      }
    });
  }, [animateOutNext, animateOutPrev]);

  useGSAP(() => {
    if (!animateInNext && !animateInPrev) return;

    const tl = gsap.timeline();

    tl.set(".selected-works-tile__link", { pointerEvents: "none" });

    tl.set(".selected-works-tile__background-image", {
      clipPath: animateInNext
        ? `polygon(100% 0%, 100% 0%, ${
            isMobile.current ? "90%" : "85%"
          } 100%, ${isMobile.current ? "90%" : "85%"} 100%)`
        : `polygon(${isMobile.current ? "10%" : "15%"} 0%, ${
            isMobile.current ? "10%" : "15%"
          } 0%, 0% 100%, 0% 100%)`,
    });

    tl.to(".selected-works-tile__background-image", {
      duration: 0.7,
      ease: "power4.inOut",
      clipPath: `polygon(${isMobile.current ? "10%" : "15%"} 0%, 100% 0%, ${
        isMobile.current ? "90%" : "85%"
      } 100%, 0% 100%)`,
      stagger: { each: 0.1, from: animateInNext ? "end" : "start" },
      onComplete: () => {
        console.log("Transition Complete");
        isTransitionActive.current = false;
      },
    });

    tl.to(
      ".selected-works-tile__logo",
      {
        duration: 0.5,
        autoAlpha: 1,
        stagger: { each: 0.1, from: animateInNext ? "end" : "start" },
        onComplete: () => {
          console.log("Transition Complete 2");
        },
      },
      "<+=60%"
    );

    tl.to(
      ".selected-works-tile__content",
      {
        duration: 0.5,
        autoAlpha: 1,
        stagger: { each: 0.1, from: animateInNext ? "end" : "start" },
        onComplete: () => {
          console.log("Transition Complete 3");
        },
      },
      "<+=10%"
    );

    tl.set(".selected-works-tile__link", { pointerEvents: "all" }, "<");

    tl.then(() => {
      if (animateInNext) {
        setAnimateInNext(false);
      } else {
        setAnimateInPrev(false);
      }
    });
  }, [animateInNext, animateInPrev]);

  useGSAP(() => {
    console.log("currentPage", currentPage);
    console.log("paginationIndex", paginationIndex);
    if (
      !document.querySelector(
        ".selected-works-slider-nav__pagination-btn--active"
      )
    )
      return;

    gsap.to(
      (
        gsap.utils.toArray(
          ".selected-works-slider-nav__pagination-btn"
        ) as HTMLElement[]
      )[currentPage]?.querySelectorAll(
        ".selected-works-slider-nav__pagination-btn-highlight"
      ),
      {
        backgroundColor: "#333333",
        duration: 0.6,
        stagger: {
          each: 0.2,
          from: currentPage > paginationIndex ? [0, 1] : [0, 0],
          grid: [0, 3],
        },
      }
    );

    gsap.to(
      ".selected-works-slider-nav__pagination-btn--active .selected-works-slider-nav__pagination-btn-highlight",
      {
        backgroundColor: "#ffffff",
        duration: 0.6,
        stagger: {
          each: 0.2,
          from: currentPage > paginationIndex ? [0, 1] : [0, 0],
          grid: [0, 3],
        },
      }
    );
  }, [paginationIndex]);

  const onPrevClick = contextSafe(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      if (isTransitionActive.current) return;

      isTransitionActive.current = true;
      setPaginationIndex((prev) => prev - 1);

      setAnimateOutPrev(true);
    }
  );

  const onNextClick = contextSafe(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      if (isTransitionActive.current) return;

      isTransitionActive.current = true;
      setPaginationIndex((prev) => prev + 1);

      setAnimateOutNext(true);
    }
  );

  const onPaginationClick = contextSafe(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
      e.stopPropagation();

      if (isTransitionActive.current) return;

      isTransitionActive.current = true;
      setPaginationIndex(index);

      if (currentPage > index) {
        setAnimateOutPrev(true);
      } else {
        setAnimateOutNext(true);
      }
    }
  );

  return (
    <div className="selected-works-slider" ref={containerEl}>
      <div className="selected-works-slider__heading">
        <AccessibleText text="Selected Works" reference={headingEl} />
      </div>

      {workSelectionArray.length > 0 && (
        <ul className={"selected-works-slider__list"} ref={sliderListEl}>
          {workSelectionArray[currentPage].map((selectedWork) => (
            <SelecedWorkTile {...selectedWork} key={selectedWork.id} />
          ))}
        </ul>
      )}

      <div className="selected-works-slider-nav">
        <button
          className="selected-works-slider-nav__btn selected-works-slider-nav__btn--prev"
          onClick={(e) => onPrevClick(e)}
          disabled={paginationIndex === 0}
          type="button"
          aria-label={`Display previous selected works slider page. Currently viewing page number ${
            currentPage + 1
          } of ${totalPages}.`}
          ref={sliderNavBtnPrev}
        >
          <img
            className="selected-works-slider-nav__btn-icon"
            src={linkArrow}
            alt=""
            role="presentation"
          />
        </button>

        <div
          className="selected-works-slider-nav__pagination"
          ref={selectedWorksSliderPaginationEl}
        >
          {workSelectionArray.length > 0 &&
            workSelectionArray.map((workSelection, i) => (
              <button
                onClick={(e) => onPaginationClick(e, i)}
                className={`selected-works-slider-nav__pagination-btn ${
                  paginationIndex === i
                    ? "selected-works-slider-nav__pagination-btn--active"
                    : ""
                }`}
                key={i}
                aria-label={`Display selected works slider page number ${
                  i + 1
                } of ${totalPages}. Currently viewing page number ${
                  currentPage + 1
                }.`}
                type="button"
              >
                {[...Array(workSelection.length).keys()].map((key) => (
                  <div
                    className={
                      "selected-works-slider-nav__pagination-btn-highlights"
                    }
                    key={key}
                  >
                    <div
                      className={
                        "selected-works-slider-nav__pagination-btn-highlight"
                      }
                    ></div>
                    <div
                      className={
                        "selected-works-slider-nav__pagination-btn-highlight"
                      }
                    ></div>
                    <div
                      className={
                        "selected-works-slider-nav__pagination-btn-highlight"
                      }
                    ></div>
                  </div>
                ))}
              </button>
            ))}
        </div>

        <button
          className="selected-works-slider-nav__btn"
          onClick={(e) => onNextClick(e)}
          disabled={paginationIndex === totalPages! - 1}
          type="button"
          aria-label={`Display next selected works slider page. Currently viewing page number ${
            currentPage + 1
          } of ${totalPages}.`}
          ref={sliderNavBtnNext}
        >
          <img
            className="selected-works-slider-nav__btn-icon"
            src={linkArrow}
            alt=""
            role="presentation"
          />
        </button>

        <div
          className="selected-works-slider-nav__btn-line--top"
          ref={linkLineTopEl}
          role="presentation"
        ></div>
        <div
          className="selected-works-slider-nav__btn-line--right"
          ref={linkLineRightEl}
          role="presentation"
        ></div>
      </div>
    </div>
  );
}
