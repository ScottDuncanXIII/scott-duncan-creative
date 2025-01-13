import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./parallax.background.css";

export default function ParallaxBackground({
  children,
  imageUrl,
  overlayColor,
}: {
  children: ReactNode;
  imageUrl: string;
  overlayColor?: string;
}) {
  const container = useRef(null);
  const image = useRef(null);

  useGSAP(() => {
    gsap.to(image.current, {
      backgroundPosition: `50% 100%`,
      scrollTrigger: {
        trigger: container.current,
        scrub: 1,
        //markers: true,
      },
    });
  }, []);

  return (
    <div className={"parallax-background"} ref={container}>
      {children}
      {overlayColor && (
        <div
          className={"parallax-background__overlay"}
          style={{ backgroundColor: overlayColor }}
        ></div>
      )}
      <div
        className={"parallax-background__image"}
        style={{ backgroundImage: `url(${imageUrl})` }}
        ref={image}
      ></div>
    </div>
  );
}
