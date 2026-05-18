"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

type AnimatedIconProps = {
  src: string;
  className?: string;
  size?: number;
  title?: string;
};

export default function AnimatedIcon({ src, className, size = 16, title }: AnimatedIconProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(src, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Unable to load animation: ${src}`);
        }
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          setAnimationData(null);
        }
      });

    return () => controller.abort();
  }, [src]);

  return (
    <span
      className={className}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      role={title ? "img" : undefined}
      style={{ width: size, height: size }}
    >
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          style={{ width: "100%", height: "100%" }}
        />
      ) : null}
    </span>
  );
}
