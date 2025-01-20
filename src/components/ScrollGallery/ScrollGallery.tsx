import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./scroll.gallery.css";
import Scanlines from "../Scanlines";
import { ImageType } from "../../types/ImageType";

export default function ScrollGallery({
  imageArray,
}: {
  imageArray?: ImageType[];
}) {
  const scrollGallery = useRef(null);
  const scrollGalleryList = useRef<HTMLUListElement | null>(null);
  const scrollerPin = useRef<GSAPTimeline | null>(null);
  const imageArrayData = useRef(imageArray);

  useGSAP(() => {
    //if (scrollerPin.current || !scrollGalleryList.current) return;
    //console.log("imageArrayData.current", imageArrayData.current);
    //console.log("Init Scroll Gllery", scrollGalleryList.current);

    gsap.delayedCall(0.5, initScrollPin);

    function initScrollPin() {
      //console.log("scrollerPin", scrollerPin);
      if (scrollerPin.current) return;

      //console.log("Init Scroller Pin");
      /* console.log(
        "scrollGalleryList.current as HTMLUListElement).offsetWidth - innerWidth",
        -(scrollGalleryList.current as HTMLUListElement).offsetWidth +
          innerWidth
      ); */

      scrollerPin.current = gsap.timeline();

      scrollerPin.current?.to(scrollGalleryList.current, {
        x:
          -(scrollGalleryList.current as HTMLUListElement).offsetWidth +
          innerWidth,
        ease: "none",
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
            ((scrollGalleryList.current as HTMLUListElement).offsetWidth -
              innerWidth),
        },
      });
    }

    return () => {
      scrollerPin.current?.kill();
      scrollerPin.current = null;
    };
  }, []);

  return (
    <div className="scroll-gallery" ref={scrollGallery}>
      <ul className={`scroll-gallery__list`} ref={scrollGalleryList}>
        {imageArrayData.current?.map((caseStudy, index) => (
          <li className="scroll-gallery__item" key={index}>
            <img
              className="scroll-gallery__image"
              src={caseStudy.url}
              alt={caseStudy.alt}
            />
          </li>
        ))}
        {/* {children} */}
      </ul>

      <Scanlines />
    </div>
  );
}
