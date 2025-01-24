"use client";

import { useEffect, useRef } from "react";
import { Blurhash } from "react-blurhash";

export default function HeroVideo({ children }) {
  const video = useRef(null);

  useEffect(() => {
    const v = video?.current;
    let timer1;

    const handleVideoLoaded = () => {
      v.play();
      timer1 = setTimeout(() => {
        v.classList.add("opacity-100");
      }, 1000);
    };

    if (v) {
      v.addEventListener("loadeddata", handleVideoLoaded);
      v.load();
    }

    return () => {
      clearTimeout(timer1);
      if (v) {
        v.removeEventListener("loadeddata", handleVideoLoaded);
        v.pause();
        v.removeAttribute("src");
        v.load();
      }
    };
  });

  return (
    <div className="flex items-center justify-center w-full lg:max-w-screen-lg">
      <div className="relative max-w-1/2 w-full h-[68vh]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
          <Blurhash
            hash="L3Amo9004nRjxu?bM{IU00t7~qRj"
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
            className="w-full h-full object-cover"
          />
        </div>
        <video
          ref={video}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0 rounded-lg"
          muted
          loop
        >
          <source src="videos/security-hero.webm" type="video/webm" />
          <source src="videos/security-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 z-10 w-full h-full bg-black opacity-60 rounded-lg"></div>
        <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
