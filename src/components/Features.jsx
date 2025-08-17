import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Features() {
  const Imgs = [
    {
      src: "/clocks.png",
      alt1: "Save time creating estimates",
    },
    {
      src: "/star.png",
      alt1: "Impress clients with professional scopes",
    },
    {
      src: "/shield.png",
      alt1: "Avoid scope creep and unclear agreements",
    },
    {
      src: "/heart.png",
      alt1: "Completely free & easy to use",
    },
  ];

  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: cardsRef.current[0]?.parentNode, // the grid container
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
      scale: 0.9,
    });
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800">
        Why Use ScopeMate?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {Imgs.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.src}
              alt={item.alt1}
              className="w-14 h-14 sm:w-16 sm:h-16 mb-4"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              {item.alt1}
            </h3>
          </div>
        ))}
      </div>

      <img
        className="rounded-xl mt-10 max-w-full h-auto mx-auto"
        src="/image1.png"
        alt="Feature illustration"
      />
    </section>
  );
}

export default Features;
