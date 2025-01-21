import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import SplitType from "split-type";

import "./preloader.css";
import Scanlines from "../Scanlines";

export default function Preloader({
  color,
  imagesArray,
  handlePreloadComplete,
}: {
  color: string;
  imagesArray: string[];
  handlePreloadComplete: () => void;
}) {
  const DOTS_COUNT = 33;

  const preloaderEl = useRef(null);
  const preloaderCountEl = useRef(null);
  const preloaderProgressBarHeadingEl = useRef(null);
  const preloaderProgressBarWrapperEl = useRef(null);
  const preloaderProgressDotElArray = useRef<HTMLElement[] | null>(null);

  const [preloaderInitailized, setPreloaderInitailized] = useState(false);
  const [preloaderProgress, setPreloaderProgress] = useState<number>();
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  useGSAP(() => {
    const preloaderProgressBarHeadingElSplit = new SplitType(
      preloaderProgressBarHeadingEl.current!,
      {
        types: "words,chars",
      }
    );

    const tl = gsap.timeline();

    tl.from(preloaderProgressBarHeadingElSplit.chars, {
      autoAlpha: 0,
      yPercent: -150,
      duration: 0.6,
      ease: "power4.out",
      stagger: {
        each: 0.1,
        from: "random",
      },
    });

    tl.from(
      preloaderProgressBarWrapperEl.current,
      {
        opacity: 0,
        duration: 0.2,
      },
      "<+=80%"
    );

    tl.from(
      preloaderProgressBarWrapperEl.current,
      {
        duration: 1,
        width: 0,
        ease: "power4.out",
      },
      "<+=10%"
    );

    tl.from(
      preloaderCountEl.current,
      {
        duration: 1,
        opacity: 0,
        ease: "power4.inOut",
      },
      "<"
    );

    tl.then(() => {
      setPreloaderInitailized(true);
    });

    preloaderProgressDotElArray.current = gsap.utils.toArray(
      ".preloader-bar__dot"
    );
  }, []);

  useEffect(() => {
    if (!preloaderInitailized || imagesArray.length === 0 || preloaderComplete)
      return;

    const imagesTotal = imagesArray.length;
    let ignore = false;
    let timer = 0;
    let preloadedImagesCount = 0;

    function preloadImageWithPromise(src: string) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          if (ignore) return;
          setTimeout(() => {
            preloadedImagesCount++;

            setPreloaderProgress(
              Math.round((preloadedImagesCount / imagesTotal) * 100)
            );

            resolve(img);
          }, (timer += 50));
        };
        img.onerror = reject;
      });
    }

    async function preloadMultipleImages(imagesArray: string[]) {
      if (!ignore) {
        try {
          await Promise.all(
            imagesArray.map((image) => preloadImageWithPromise(image))
          );

          if (!ignore) {
            setTimeout(() => {
              setPreloaderComplete(true);
            }, 200);
          }
        } catch (error) {
          console.error("An error occurred while preloading images", error);
        }
      }
    }

    preloadMultipleImages(imagesArray);

    return () => {
      ignore = true;
    };
  }, [preloaderInitailized, imagesArray, preloaderComplete]);

  useGSAP(() => {
    let dotArrayPecentage: HTMLElement[] = [];

    dotArrayPecentage = [
      ...preloaderProgressDotElArray.current!.slice(
        0,
        Math.round(
          (preloaderProgress! / 100) *
            preloaderProgressDotElArray.current!.length
        )
      ),
    ];

    if (dotArrayPecentage && dotArrayPecentage.length > 0) {
      gsap.to(dotArrayPecentage, {
        backgroundColor: color,
        duration: 0.3,
        stagger: {
          each: 0.003,
          from: "random",
        },
      });
    }
  }, [preloaderProgress]);

  useGSAP(() => {
    if (!preloaderComplete) return;
    const tl = gsap.timeline();

    const preloaderProgressBarHeadingElSplit = new SplitType(
      preloaderProgressBarHeadingEl.current!,
      {
        types: "words,chars",
      }
    );

    tl.to(preloaderCountEl.current, {
      duration: 1,
      opacity: 0,
      ease: "power4.inOut",
    });

    tl.to(
      preloaderProgressBarHeadingElSplit.chars,
      {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.out",
        stagger: {
          each: 0.1,
          from: "random",
        },
      },
      "<"
    );

    tl.to(
      preloaderProgressBarWrapperEl.current,
      {
        duration: 1,
        width: 0,
        ease: "power4.inOut",
      },
      "<"
    );

    tl.to(
      preloaderProgressBarWrapperEl.current,
      {
        opacity: 0,
        duration: 0.3,
      },
      "-=0.5"
    );

    tl.to(preloaderEl.current, {
      duration: 0.3,
      autoAlpha: 0,
    });

    tl.then(() => {
      handlePreloadComplete();
    });
  }, [preloaderComplete]);

  return (
    <div className="preloader" ref={preloaderEl}>
      <div className="preloader-count" ref={preloaderCountEl}>
        {preloaderProgress}
      </div>

      <div className="preloader-bar">
        <div
          className="preloader-bar__heading"
          ref={preloaderProgressBarHeadingEl}
        >
          Loading
        </div>

        <div
          className="preloader-bar__bar-wrapper"
          ref={preloaderProgressBarWrapperEl}
        >
          <div className="preloader-bar__bar-wrapper-inner">
            {[...Array(DOTS_COUNT).keys()].map((count) => (
              <div className={"preloader-bar__dots"} key={count}>
                <div className={"preloader-bar__dot"}></div>
                <div className={"preloader-bar__dot"}></div>
                <div className={"preloader-bar__dot"}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Scanlines />
    </div>
  );
}
