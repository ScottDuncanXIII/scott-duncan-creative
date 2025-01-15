import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconComponent from "../../../../assets/icons/IconComponent";
import { TechStackType } from "../../../../types/TechStackType";

import "./work.tech.css";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import AccessibleText from "../../../../components/AccessibleText";

export default function WorkTech({
  color,
  heading,
  techStackIds,
  techStack,
}: {
  color: string;
  heading: string;
  techStackIds: string[];
  techStack: TechStackType[];
}) {
  const containerEl = useRef(null);
  const headingEl = useRef(null);

  useGSAP(
    () => {
      const headingElSplit = new SplitType(headingEl.current!, {
        types: "words,chars",
      });

      const techLabelArray = document.querySelectorAll(
        ".work-tech__item-label"
      );

      const techLabelSplitArray = [...techLabelArray].map(
        (labelEl) =>
          new SplitType(labelEl as HTMLElement, {
            types: "words,chars",
          })
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl.current,
          start: "top 65%",
          //markers: true,
          end: "",
          onEnter: () => {
            tl.timeScale(1).play();
          },
          onLeaveBack: () => {
            tl.timeScale(2).reverse();
          },
        },
      });

      tl.from(headingElSplit.chars, {
        yPercent: -110,
        duration: 0.5,
        stagger: { each: 0.1, from: "random" },
      });

      tl.from(
        ".work-tech__item-icon",
        {
          duration: 0.8,
          xPercent: -100,
          autoAlpha: 0,
          ease: "power2.inOut",
          stagger: { each: 0.08 },
        },
        "<+=10%"
      );

      techLabelSplitArray.forEach((label) => {
        tl.from(
          label.chars,
          {
            duration: 0.5,
            yPercent: -100,
            autoAlpha: 0,
            ease: "power2.inOut",
            stagger: { each: 0.02, from: "random" },
          },
          "<+=10%"
        );
      });
    },
    { scope: containerEl }
  );

  return (
    <div className={"work-tech"} ref={containerEl}>
      <div className={"work-tech__wrapper"}>
        <h2 className={"work-tech__heading"}>
          <AccessibleText text={heading} reference={headingEl} />
        </h2>

        <ul className={"work-tech__list"}>
          {techStackIds?.map((id) =>
            techStack
              .filter((tech) => tech.id === id)
              .map((tech) => (
                <li className={"work-tech__item"} key={tech.id}>
                  <span className={"work-tech__item-icon"}>
                    {tech.icon.type === "fab" || tech.icon.type === "fas" ? (
                      <FontAwesomeIcon
                        icon={[tech.icon.type, tech.icon.src as IconName]}
                        style={{ color: color }}
                      />
                    ) : (
                      <IconComponent name={tech.icon?.src} color={color} />
                    )}
                  </span>

                  <span className={"work-tech__item-label"} aria-hidden="true">
                    {tech.title}
                  </span>
                  <span className="sr-only">{tech.title}</span>
                </li>
              ))
          )}
        </ul>
      </div>
    </div>
  );
}
