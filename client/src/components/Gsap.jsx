import React, { useEffect } from "react";
import { gsap } from "gsap";

// Register the custom fade effect
gsap.registerEffect({
  name: "fade",
  effect: (targets, config) => {
    return gsap.to(targets, { duration: config.duration, opacity: 0 });
  },
  defaults: { duration: 2 }, // Default duration
  extendTimeline: true, // Allow the effect to be used in timelines
});

const GsapAnimation = () => {
  useEffect(() => {
    // Timeline for fading animation
    let tl = gsap.timeline();
    tl.fade(".box", { duration: 3 }) // Target box 1
      .fade(".box2", { duration: 1 }, "+=2") // Target box 2, starts after 2s delay
      .to(".box3", { x: 100, duration: 2 }); // Move box 3

    // Clean up the animation when the component unmounts
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      {/* <div className="box w-20 h-20 bg-blue-500 rounded-lg"></div>
      <div className="box2 w-20 h-20 bg-red-500 rounded-lg"></div>
      <div className="box3 w-20 h-20 bg-green-500 rounded-lg"></div> */}
    </div>
  );
};

export default GsapAnimation;
