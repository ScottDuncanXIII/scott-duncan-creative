import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./parallax.image.css";

export default function ParallaxImage({
  imageSrc,
  overlayColor,
}: {
  imageSrc: string | undefined;
  overlayColor?: string;
}) {
  const container = useRef(null);
  const image = useRef(null);

  useGSAP(() => {
    if (!image.current) return;
    //////console.log("Hero Gsap", image.current);
    gsap.to(image.current, {
      backgroundPosition: `50% 100%`,
      scrollTrigger: {
        trigger: container.current,
        scrub: 1,
        //markers: true,
      },
    });
  }, [image.current]);

  return (
    <div className="parallax-image" ref={container}>
      {overlayColor && (
        <div
          className="parallax-image__overlay"
          style={{ backgroundColor: overlayColor }}
        ></div>
      )}

      {imageSrc && (
        <div
          className="parallax-image__image"
          style={{ backgroundImage: `url(${imageSrc})` }}
          ref={image}
        ></div>
      )}
    </div>
  );
}
