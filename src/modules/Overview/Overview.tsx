import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

import Ellipse from "../../components/Ellipse";
import SkewedStripes from "../../components/SkewedStripes";
import "./overview.css";

export default function Overview({
  color,
  hasBoxShadow = false,
  headingA,
  headingB,
  headingC,
  paragraphs,
}: {
  color: string | undefined;
  hasBoxShadow?: boolean;
  headingA?: string | undefined;
  headingB?: string | undefined;
  headingC?: string | undefined;
  paragraphs: string[];
}) {
  const containerEl = useRef(null);
  const headingAEl = useRef(null);
  const headingBEl = useRef(null);
  const headingCEl = useRef(null);

  useGSAP(
    () => {
      const headingAElSplit = new SplitType(headingAEl.current!, {
        types: "words,chars",
      });

      const headingBElSplit = new SplitType(headingBEl.current!, {
        types: "words,chars",
      });

      const headingCElSplit = new SplitType(headingCEl.current!, {
        types: "words,chars",
      });

      const paragraphElArray = gsap.utils.toArray(
        ".overview-content__paragraph"
      );

      const paragraphElSplitArray = paragraphElArray.map((paragraphEl) => {
        return new SplitType(paragraphEl as HTMLElement, {
          types: "words,chars",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          //markers: true,
          start: "top 65%",
          end: "bottom 40%",
          trigger: containerEl.current,
          onEnter: () => {
            tl.timeScale(1).play();
          },
          onEnterBack: () => {
            tl.timeScale(1).play();
          },
          onLeaveBack: () => {
            tl.timeScale(2).reverse();
          },
          onLeave: () => {
            tl.timeScale(2).reverse();
          },
        },
      });

      if (headingAElSplit?.chars && headingAElSplit?.chars?.length > 0) {
        tl.from(headingAElSplit.chars, {
          duration: 0.5,
          xPercent: -100,
          stagger: { each: 0.1, from: "random" },
        });
      }

      tl.from(headingBElSplit.chars, {
        duration: 0.5,
        yPercent: -100,
        stagger: { each: 0.1 },
      });

      tl.from(
        headingCElSplit.chars,
        {
          duration: 0.5,
          yPercent: 100,
          stagger: { each: 0.1, from: "random" },
        },
        ">-=50%"
      );

      tl.from(
        ".skewed-stripe",
        {
          duration: 0.5,
          autoAlpha: 0,
          scaleY: 0,
          stagger: { each: 0.05, from: "random" },
        },
        "<"
      );

      paragraphElSplitArray.map((paragraphElSplit) => {
        tl.from(
          paragraphElSplit.chars,
          {
            duration: 0.5,
            autoAlpha: 0,
            stagger: { each: 0.001, from: "random" },
          },
          "<+=40%"
        );
      });

      tl.from(
        ".overview-content__dot",
        {
          duration: 1,
          autoAlpha: 0,
          stagger: { each: 0.4, from: "center" },
        },
        "<+=20%"
      );
    },
    { scope: containerEl.current! }
  );

  return (
    <div
      className={`overview ${hasBoxShadow ? "overview--box-shadow" : ""}`}
      ref={containerEl}
    >
      <div className="overview-content">
        <div className="overview-content__heading-wrapper">
          <h2 className={"overview-content__heading"}>
            {headingA && (
              <span className="overview-content__heading--a" ref={headingAEl}>
                {headingA}
              </span>
            )}
            {headingB && (
              <span className="overview-content__heading--b" ref={headingBEl}>
                {headingB}
              </span>
            )}

            {headingC && (
              <>
                <span className="overview-content__heading--c" ref={headingCEl}>
                  {headingC}
                </span>
                <div className="overview-content__dots">
                  <div className="overview-content__dot"></div>
                  <div className="overview-content__dot"></div>
                  <div className="overview-content__dot"></div>
                </div>
              </>
            )}
          </h2>
        </div>

        <div className={"overview-content__wrapper"}>
          <SkewedStripes color={color} customClass="overview-skewed-stripes" />

          {paragraphs &&
            paragraphs.length > 0 &&
            paragraphs.map((paragraph, index) => (
              <p className={"overview-content__paragraph"} key={index}>
                {paragraph}
              </p>
            ))}
        </div>

        <Ellipse />
      </div>
    </div>
  );
}
