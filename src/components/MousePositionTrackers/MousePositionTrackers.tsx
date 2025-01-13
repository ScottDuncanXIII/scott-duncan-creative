import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./mouse.position.trackers.css";

export default function MousePositionTrackers() {
  const lineSide = useRef(null);
  const lineBottom = useRef(null);
  const [mousePosX, setMousePosX] = useState(Number);
  const [mousePosY, setMousePosY] = useState(Number);

  useGSAP(() => {
    window.addEventListener("mousemove", onMouseMove);

    function onMouseMove(e: MouseEvent) {
      e.stopPropagation();

      const { clientX, clientY } = e;

      setMousePosX((clientX / window.innerWidth) * 100);
      setMousePosY((clientY / window.innerHeight) * 100);

      const xSetter = gsap.quickSetter(lineBottom?.current, "x", "px");
      const ySetter = gsap.quickSetter(lineSide?.current, "y", "px");

      xSetter(clientX);
      ySetter(clientY);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div className="line line--side" ref={lineSide}>
        <span className="line__count line__count--side">
          {(mousePosY * 10).toFixed(3)}
        </span>
      </div>

      <div className="line line--bottom" ref={lineBottom}>
        <span className="line__count line__count--bottom">
          {(mousePosX * 10).toFixed(3)}
        </span>
      </div>
    </>
  );
}
