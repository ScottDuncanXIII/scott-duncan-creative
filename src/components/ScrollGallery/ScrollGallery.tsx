import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./scroll.gallery.css";
import Scanlines from "../Scanlines";
import { ImageType } from "../../types/ImageType";

export default function ScrollGallery({
  imageArray,
}: {
  imageArray: ImageType[];
}) {
  const scrollGallery = useRef(null);
  const scrollGalleryList = useRef<HTMLUListElement | null>(null);
  const scrollerPin = useRef<GSAPTimeline | null>(null);

  useGSAP(() => {
    //if (scrollerPin.current || !scrollGalleryList.current) return;
    console.log("Init Scroll Gllery", scrollGalleryList.current);
    scrollerPin.current = gsap.timeline();

    /* setTimeout(() => { */
    /* console.log("Init Scroller Pin");
    scrollerPin.current?.to(scrollGalleryList.current, {
      x:
        -(scrollGalleryList.current as HTMLUListElement).offsetWidth +
        innerWidth / 1.5,
      ease: "none",
      scrollTrigger: {
        trigger: scrollGallery.current,
        pin: true,
        pinType: "transform",
        start: "top top",
        scrub: 1,
        markers: true,
        anticipatePin: 1,
        end: () =>
          "+=" +
          ((scrollGalleryList.current as HTMLUListElement).offsetWidth -
            innerWidth),
      },
    }); */
    /* }, 2000); */

    return () => {
      scrollerPin.current?.kill();
      scrollerPin.current = null;
    };
  }, []);

  return (
    <div className="scroll-gallery" ref={scrollGallery}>
      <ul className={`scroll-gallery__list`} ref={scrollGalleryList}>
        {imageArray.map((caseStudy, index) => (
          <li className="scroll-gallery__item" key={index}>
            <img
              className="scroll-gallery__image"
              src={caseStudy.url}
              alt={caseStudy.alt}
            />
          </li>
        ))}
      </ul>

      <Scanlines />
    </div>
  );
}
