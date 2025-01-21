"use client";

import { useEffect, useRef } from "react";
import { Blurhash } from "react-blurhash";
import HeroPrompt from "@/components/block/landing/hero-prompt";

export default function HeroVideo() {
  const video = useRef(null);
  const prompt = useRef(null);

  useEffect(() => {
    const v = video?.current;
    const p = prompt?.current;
    let timer1, timer2;

    const handleVideoLoaded = () => {
      v.play();
      timer1 = setTimeout(() => {
        v.classList.add("opacity-100");
        timer2 = setTimeout(() => {
          p.classList.add("opacity-100");
        }, 500);
      }, 1000);
    };

    if (v) {
      v.addEventListener("loadeddata", handleVideoLoaded);
      v.load();
    }

    return () => {
      clearTimeout(timer1, timer2);
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
      <div className="relative max-w-1/2 w-full h-[40vh]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
          <Blurhash
            hash="UBKn;[-p4oogxuE2E1oe0L~VxtR*-:?aRkIp"
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
          <source src="videos/wave.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          ref={prompt}
          className="transition-opacity duration-1000 opacity-0"
        >
          <HeroPrompt />
        </div>
      </div>
    </div>
  );
}
