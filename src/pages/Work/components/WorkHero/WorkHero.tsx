import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

import { WorkHeroType } from "../../../../types/WorkHeroType";

import ParallaxImage from "../../../../components/ParallaxImage";
import linkArrow from "/imgs/link-arrow.svg";

import "./work.hero.css";
import AccessibleText from "../../../../components/AccessibleText";

export default function WorkHero({
  imagesLoaded,
  model,
}: {
  imagesLoaded: boolean;
  model: WorkHeroType;
}) {
  const workplaceLabelEl = useRef(null);
  const yearsLabelEl = useRef(null);
  const statusLabelEl = useRef(null);
  const workplaceHeadingEl = useRef(null);
  const yearsHeadingEl = useRef(null);
  const statusHeadingEl = useRef(null);

  const linkTextEl = useRef(null);
  const linkIconEl = useRef(null);
  const linkLineTopEl = useRef(null);
  const linkLineRightEl = useRef(null);

  const heading = useRef(null);
  const specs = useRef(null);
  const image = useRef(null);

  useGSAP(() => {
    if (!imagesLoaded) return;

    const workplaceLabelElSplit = new SplitType(workplaceLabelEl.current!, {
      types: "words,chars",
    });

    const yearsLabelElSplit = new SplitType(yearsLabelEl.current!, {
      types: "words,chars",
    });

    const statusLabelElSplit = new SplitType(statusLabelEl.current!, {
      types: "words,chars",
    });

    const workplaceHeadingElSplit = new SplitType(workplaceHeadingEl.current!, {
      types: "words,chars",
    });

    const yearsHeadingElSplit = new SplitType(yearsHeadingEl.current!, {
      types: "words,chars",
    });

    const statusHeadingElSplit = new SplitType(statusHeadingEl.current!, {
      types: "words,chars",
    });

    const linkTextElSplit = new SplitType(linkTextEl.current!, {
      types: "words,chars",
    });

    const tl = gsap.timeline({ delay: 0.5 });
    tl.from(heading.current, { duration: 1, opacity: 0 });

    tl.from(
      image.current,
      { duration: 2, opacity: 0, ease: "power4.inOut" },
      "<+=0.5"
    );

    tl.from(
      ".work-hero-details__specs-divider",
      {
        duration: 1.5,
        height: 0,
        stagger: {
          each: 0.5,
        },
        ease: "power2.inOut",
      },
      "<+=25%"
    );

    tl.from(
      workplaceLabelElSplit.chars,
      {
        duration: 0.6,
        yPercent: -110,
        stagger: {
          each: 0.1,
        },
      },
      "<"
    );

    tl.from(
      workplaceHeadingElSplit.chars,
      {
        duration: 0.4,
        yPercent: 110,
        stagger: {
          each: 0.05,
          from: "random",
        },
      },
      "<+=10%"
    );

    tl.from(
      yearsLabelElSplit.chars,
      {
        duration: 0.6,
        yPercent: -110,
        stagger: {
          each: 0.1,
        },
      },
      "<+=25%"
    );

    tl.from(
      yearsHeadingElSplit.chars,
      {
        duration: 0.4,
        yPercent: 110,
        stagger: {
          each: 0.05,
          from: "random",
        },
      },
      "<+=10%"
    );

    tl.from(
      statusLabelElSplit.chars,
      {
        duration: 0.6,
        yPercent: -110,
        stagger: {
          each: 0.1,
        },
      },
      "<+=25%"
    );

    tl.from(
      statusHeadingElSplit.chars,
      {
        duration: 0.4,
        yPercent: 110,
        stagger: {
          each: 0.05,
          from: "random",
        },
      },
      "<+=10%"
    );

    if (model.link?.url) {
      tl.from(
        linkTextElSplit.chars,
        {
          duration: 0.5,
          yPercent: 110,
          stagger: {
            each: 0.2,
            from: "random",
          },
        },
        "<"
      );

      tl.from(
        linkLineTopEl.current,
        {
          duration: 2.5,
          width: 0,
          ease: "power4.inOut",
        },
        "<-=25%"
      );

      tl.from(
        linkLineRightEl.current,
        {
          duration: 2,
          height: 0,
          ease: "power4.inOut",
        },
        "<"
      );

      tl.from(
        linkIconEl.current,
        {
          autoAlpha: 0,
          duration: 1,
          xPercent: -100,
        },
        "<+=80%"
      );
    }
  }, [imagesLoaded]);

  return (
    <div className={"work-hero"}>
      <div className={"work-hero__wrapper"}>
        <h1 className={"work-hero__heading"} ref={heading}>
          {model?.title}
        </h1>

        <div className="work-hero-details">
          <div className="work-hero-details__specs-wrapper" ref={specs}>
            <div className="work-hero-details__specs">
              <h3 className="work-hero-details__specs-label">
                <AccessibleText
                  text={model?.workplaceLabel}
                  reference={workplaceLabelEl}
                />
              </h3>

              <h4 className="work-hero-details__specs-heading">
                <AccessibleText
                  text={model?.workplace}
                  reference={workplaceHeadingEl}
                />
              </h4>
            </div>

            <div className="work-hero-details__specs-divider"></div>

            <div className="work-hero-details__specs">
              <h3 className="work-hero-details__specs-label">
                <AccessibleText
                  text={model?.years.label}
                  reference={yearsLabelEl}
                />
              </h3>

              <h4 className="work-hero-details__specs-heading">
                <AccessibleText
                  text={model?.years.value}
                  reference={yearsHeadingEl}
                />
              </h4>
            </div>

            <div className="work-hero-details__specs-divider"></div>

            <div className="work-hero-details__specs">
              <h3 className="work-hero-details__specs-label">
                <AccessibleText
                  text={model?.statusLabel}
                  reference={statusLabelEl}
                />
              </h3>
              <h4 className="work-hero-details__specs-heading">
                <AccessibleText
                  text={model?.status}
                  reference={statusHeadingEl}
                />
              </h4>
            </div>
          </div>

          {model.link?.url && (
            <a
              className="work-hero-details__link"
              href={model.link?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="work-hero-details__link-text" ref={linkTextEl}>
                {model.link?.label}
              </span>{" "}
              <img
                className="work-hero-details__link-icon"
                ref={linkIconEl}
                src={linkArrow}
                alt=""
                role="presentation"
              />
              <div
                className="work-hero-details__link-line--top"
                ref={linkLineTopEl}
                role="presentation"
              ></div>
              <div
                className="work-hero-details__link-line--right"
                ref={linkLineRightEl}
                role="presentation"
              ></div>
            </a>
          )}
        </div>
      </div>

      <div className="work-hero__image-wrapper" ref={image}>
        <ParallaxImage
          imageSrc={model?.heroImage?.url}
          overlayColor={model?.mainColor}
        />
      </div>
    </div>
  );
}
