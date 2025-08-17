import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const headingRefs = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    timeline
      .from(headingRefs.current, {
        opacity: 0,
        y: 40,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
      })
      .from(
        buttonRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );
  }, []);

  const handleStartEstimating = () => {
    if (isLoggedIn) {
      navigate("/StEstimating"); // Estimating page
    } else {
      navigate("/login"); // Redirect to login/signup page
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-indigo-100 flex flex-col items-center justify-center min-h-screen px-4 text-center"
    >
      <p
        ref={(el) => (headingRefs.current[0] = el)}
        className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black mb-2"
      >
        Plan your freelance project
      </p>
      <p
        ref={(el) => (headingRefs.current[1] = el)}
        className="text-3xl sm:text-4xl md:text-5xl text-violet-700 font-semibold mb-4"
      >
        like a pro
      </p>
      <p
        ref={(el) => (headingRefs.current[2] = el)}
        className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-xl"
      >
        Estimate features, cost, and timeline in minutes with ScopeMate.
      </p>
      <button
        ref={buttonRef}
        onClick={handleStartEstimating}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-base sm:text-lg"
      >
        Start Estimating
      </button>
    </div>
  );
};

export default LandingPage;
