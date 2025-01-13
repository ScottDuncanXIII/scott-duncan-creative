import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

import Ellipse from "../../../../components/Ellipse";
import SkewedStripes from "../../../../components/SkewedStripes";
import "./work.overview.css";

export default function WorkOverview({
  color,
  headingA,
  headingB,
  headingC,
  paragraphs,
}: {
  color: string | undefined;
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
        ".work-overview-content__paragraph"
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
          trigger: containerEl.current,
          onEnter: () => {
            tl.timeScale(1).play();
          },
          onLeaveBack: () => {
            tl.timeScale(3).reverse();
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

      paragraphElSplitArray.map((paragraphElSplit) => {
        tl.from(
          paragraphElSplit.chars,
          {
            duration: 0.5,
            autoAlpha: 0,
            stagger: { each: 0.001, from: "random" },
          },
          ">-=40%"
        );
      });

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

      tl.from(
        ".work-overview-content__dot",
        {
          autoAlpha: 0,
          stagger: { each: 0.2, from: "center" },
        },
        ">-=30%"
      );
    },
    { scope: containerEl.current! }
  );

  return (
    <div className={"work-overview"} ref={containerEl}>
      <div className="work-overview-content">
        <div className="work-overview-content__heading-wrapper">
          <h2 className={"work-overview-content__heading"}>
            {headingA && (
              <span
                className="work-overview-content__heading--a"
                ref={headingAEl}
              >
                {headingA}
              </span>
            )}
            {headingB && (
              <span
                className="work-overview-content__heading--b"
                ref={headingBEl}
              >
                {headingB}
              </span>
            )}

            {headingC && (
              <>
                <span
                  className="work-overview-content__heading--c"
                  ref={headingCEl}
                >
                  {headingC}
                </span>
                <div className="work-overview-content__dots">
                  <div className="work-overview-content__dot"></div>
                  <div className="work-overview-content__dot"></div>
                  <div className="work-overview-content__dot"></div>
                </div>
              </>
            )}
          </h2>
        </div>

        <div className={"work-overview-content__wrapper"}>
          <SkewedStripes
            color={color}
            customClass="work-overview-skewed-stripes"
          />

          {paragraphs &&
            paragraphs.length > 0 &&
            paragraphs.map((paragraph, index) => (
              <p className={"work-overview-content__paragraph"} key={index}>
                {paragraph}
              </p>
            ))}
        </div>

        <Ellipse />
      </div>
    </div>
  );
}
