import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hworks() {
  const Imgs = [
    {
      src: "/checklist.png",
      alt1: "Select Features",
      alt2: "Choose what your project needs.",
    },
    {
      src: "/bolt.png",
      alt1: "Get Instant Estimates",
      alt2: "See cost and timeline instantly.",
    },
    {
      src: "/share.png",
      alt1: "Share Your Scope",
      alt2: "Export or send the project scope to clients.",
    },
  ];

  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: cardsRef.current[0].parentNode, // grid container
        start: "top 80%", // when top of container hits 80% viewport
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2, // each card delayed
    });
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-20 text-gray-800">
        How it Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
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
            <p className="text-sm sm:text-base text-gray-600">{item.alt2}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hworks;
