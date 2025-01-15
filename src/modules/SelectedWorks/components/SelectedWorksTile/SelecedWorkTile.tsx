import { useRef, MouseEvent } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { SelectedWorkType } from "../../../../types/SelectedWorksType";

import "./selected.works.tile.css";

export default function SelecedWorkTile({ ...selectedWork }: SelectedWorkType) {
  const TRANSFORM_CONSTRAIN = 35;

  const tile = useRef(null);
  const tileBg = useRef(null);
  const link = useRef(null);
  const logo = useRef(null);
  const content = useRef(null);
  const { contextSafe } = useGSAP();

  const handleOnMouseMove = contextSafe((e: MouseEvent) => {
    const { clientX, clientY } = e;

    gsap.to(e.currentTarget, {
      duration: 0.5,
      transform: transforms3d(
        clientX,
        clientY,
        e.currentTarget as HTMLElement,
        false
      ),
    });
  });

  const handleOnMoveLeave = contextSafe((e: MouseEvent) => {
    gsap.to(e.currentTarget, {
      transform: "perspective(2000px)  rotateX(0deg) rotateY(0deg)",
    });
  });

  function transforms3d(
    x: number,
    y: number,
    el: HTMLElement,
    skipCalc: boolean
  ) {
    const box = el?.getBoundingClientRect();
    const calcX = !skipCalc
      ? -(y - box?.y - box?.height / 2) / TRANSFORM_CONSTRAIN
      : 0;
    const calcY = !skipCalc
      ? (x - box?.x - box?.width / 2) / TRANSFORM_CONSTRAIN
      : 0;

    return calcX && calcY
      ? "perspective(2000px) " +
          "rotateX(" +
          calcX +
          "deg) " +
          "rotateY(" +
          calcY +
          "deg) "
      : "";
  }

  return (
    <li className={"selected-works-tile"}>
      <Link
        className="selected-works-tile__link"
        onMouseMove={handleOnMouseMove}
        onMouseLeave={handleOnMoveLeave}
        to={"work/" + selectedWork.id}
        ref={link}
      >
        <img
          className={"selected-works-tile__logo"}
          src={selectedWork.logo}
          alt={`${selectedWork.title} logo`}
          ref={logo}
        />

        <div
          className={"selected-works-tile__background-image--3d"}
          style={{
            backgroundImage: `url(${selectedWork.selectedWorks?.thumbnail3d})`,
          }}
        ></div>

        <div
          className={"selected-works-tile__background-image"}
          style={{
            backgroundImage: `url(${selectedWork.selectedWorks?.thumbnailMain})`,
          }}
          ref={tileBg}
        >
          <div
            className="selected-works-tile__background-image--overlay"
            style={{ backgroundColor: selectedWork.colorMain }}
            ref={tile}
          ></div>
        </div>

        <div className="selected-works-tile__content" ref={content}>
          <h3 className={"selected-works-tile__title"}>{selectedWork.title}</h3>
          <h4 className={"selected-works-tile__year"}>
            {selectedWork.years?.value}{" "}
            <span aria-hidden="true" role="presentation">
              //
            </span>{" "}
            <span
              style={{ color: selectedWork.colorMain }}
              aria-hidden="true"
              role="presentation"
            >
              ::::
            </span>
          </h4>

          <div
            className={"selected-works-tile__content-bg"}
            style={{ backgroundColor: selectedWork.colorMain }}
          ></div>
        </div>
      </Link>
    </li>
  );
}
