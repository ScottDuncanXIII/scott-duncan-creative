import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./scroll.gallery.css";
import Scanlines from "../Scanlines";

export default function ScrollGallery({
  children,
  heading,
}: {
  children: ReactNode;
  heading?: string;
}) {
  const scrollGalleryHeading = useRef(null);
  const scrollGallery = useRef(null);
  const scrollGalleryList = useRef(null);

  useGSAP(() => {
    const scrollerPin = gsap.timeline();

    scrollerPin.to(scrollGalleryList.current, {
      x:
        -(scrollGalleryList.current! as HTMLElement).offsetWidth +
        innerWidth / 1.5,
      ease: "none",
      delay: 2,
      scrollTrigger: {
        trigger: scrollGallery.current,
        pin: true,
        pinType: "transform",
        start: "top top",
        scrub: 1,
        //markers: true,
        anticipatePin: 1,
        end: () =>
          "+=" +
          ((scrollGalleryList.current! as HTMLElement).offsetWidth -
            innerWidth),
      },
    });
  }, []);

  return (
    <div className="scroll-gallery" ref={scrollGallery}>
      {heading && (
        <div className="scroll-gallery__heading" ref={scrollGalleryHeading}>
          {heading}
        </div>
      )}

      <ul
        className={`scroll-gallery__list ${
          !heading ? "scroll-gallery__list--gap" : ""
        }`}
        ref={scrollGalleryList}
      >
        {children}
      </ul>
      <Scanlines />
    </div>
  );
}
