import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import SplitType from "split-type";
import data from "../../data.json";

import "./intro.css";
import AccessibleText from "../../components/AccessibleText";

export default function Intro({ initAnimations }: { initAnimations: boolean }) {
  const PATTERN_ITEM_COUNT = 22;

  const intro = useRef(null);
  const headingName = useRef(null);
  const headingRoleA = useRef(null);
  const pauseAnim = useRef(false);
  const patternAnimA = useRef<GSAPAnimation>();
  const patternAnimB = useRef<GSAPAnimation>();
  const scrollPrompt = useRef(null);

  useGSAP(() => {
    if (!initAnimations) return;

    const colorArray = data.work.map((work) => work.colorMain);

    gsap.delayedCall(0.1, initIntro);

    function initIntro() {
      const headingNameSplit = new SplitType(headingName.current!, {
        types: "words,chars",
      });

      const headingRoleSplitA = new SplitType(headingRoleA.current!, {
        types: "words,chars",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: intro.current,
          end: "bottom 65%",
          //markers: true,
          onEnterBack: () => {
            pauseAnim.current = false;

            tl.timeScale(1).play();
          },
          onLeave: () => {
            pauseAnim.current = true;

            tl.timeScale(3).delay(0).reverse();

            gsap.to(".intro-content-pattern__line", {
              backgroundColor: "#b46e12",
              duration: 2,
            });

            if (patternAnimA.current && patternAnimB.current) {
              patternAnimA.current.kill();
              patternAnimB.current.kill();
            }
          },
        },
      });

      tl.from(headingNameSplit.chars, {
        duration: 0.8,
        yPercent: 100,
        stagger: {
          each: 0.1,
          from: "random",
        },
        ease: "expo.out",
        onStart: () => {},
      });

      tl.from(
        "#line",
        {
          duration: 5,
          scale: 0,
          ease: "expo.out",
        },
        "<"
      );

      tl.from(
        headingRoleSplitA.chars,
        {
          duration: 0.6,
          yPercent: 100,
          autoAlpha: 0,
          stagger: {
            each: 0.075,
            from: "center",
          },
          ease: "expo.out",
        },
        "<+=10%"
      );

      tl.fromTo(
        ".intro-content-pattern__line",
        {
          scaleY: 0,
        },
        {
          duration: 1,
          scaleY: "random(0.6,1.3)",
          stagger: {
            each: -0.04,
            from: "random",
          },
          ease: "back.out(2)",
          onComplete: () => {
            if (pauseAnim.current) return;
            animRandomPatternScale();
            if (pauseAnim.current) return;
            animRandomPatternColor();
          },
        },
        "<+=0.5"
      );

      tl.from(
        (scrollPrompt.current! as HTMLElement).querySelector(
          ".intro-scroll__polygon"
        ),
        {
          duration: 5,
          opacity: 0,
          rotate: "360deg",
        },
        "<"
      );

      tl.from(
        (scrollPrompt.current! as HTMLElement).querySelector(
          ".intro-scroll__line"
        ),
        { duration: 1.5, height: 0, autoAlpha: 0 },
        "<+=20%"
      );

      tl.from(
        (scrollPrompt.current! as HTMLElement).querySelector(
          ".intro-scroll__label"
        ),
        { duration: 1, width: "0", autoAlpha: 0 },
        "<+=20%"
      );
    }

    function animRandomPatternColor() {
      patternAnimA.current = gsap.to(".intro-content-pattern__line", {
        backgroundColor: gsap.utils.random(colorArray),
        duration: 0.5,
        stagger: {
          each: 0.1,
          from: "random",
        },
        onComplete: () => {
          if (pauseAnim.current) return;
          animRandomPatternColor();
        },
      });
    }

    function animRandomPatternScale() {
      patternAnimB.current = gsap.to(".intro-content-pattern__line", {
        duration: 2,
        scaleY: "random(0.6,1.3)",
        ease: "power3.out",
        stagger: {
          each: 0.25,
          from: "center",
        },
        onComplete: () => {
          if (pauseAnim.current) return;
          animRandomPatternScale();
        },
      });
    }
  }, [initAnimations]);

  return (
    <div className="intro" ref={intro}>
      {initAnimations && (
        <div className="intro-wrapper">
          <div className="intro-content">
            <div className="intro-content__inner-wrapper">
              <h1 className="intro-content__heading">
                <AccessibleText text="Scott Duncan" reference={headingName} />
              </h1>

              <div id="line" className="intro-content__horizontal-line"></div>

              <h2 className="intro-content__subheading">
                <AccessibleText
                  text="Creative&nbsp;Developer"
                  reference={headingRoleA}
                />
              </h2>

              <div className="intro-content-pattern">
                {(() => {
                  const patternItemArray = [];

                  for (let i = 0; i < PATTERN_ITEM_COUNT; i++) {
                    patternItemArray.push(
                      <span
                        className="intro-content-pattern__line"
                        key={i}
                      ></span>
                    );
                  }
                  return patternItemArray;
                })()}
              </div>
            </div>
          </div>

          <div className="intro-scroll" ref={scrollPrompt}>
            <div className="intro-scroll__polygon"></div>
            <div className="intro-scroll__line"></div>
            <div className="intro-scroll__label">Scroll</div>
          </div>
        </div>
      )}
    </div>
  );
}
