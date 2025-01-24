import { useEffect, useRef, useState } from 'react';
import Pyq from '../../assets/landingpyq.svg';
import Topper from '../../assets/landingtopper.svg';
import Mentor from '../../assets/landingmentor.svg';
import Eval from '../../assets/landingeval.svg';
import Sections from "../../data/perks.json";

const imageMap = {
  Pyq,
  Topper,
  Mentor,
  Eval
};

export default function PerksSection() {
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex((ref) => ref === entry.target);

          if (entry.isIntersecting && !animatedSections.has(index)) {
            setAnimatedSections((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [animatedSections]);

  return (
    <div className="relative bg-gray-50 py-16">
      <h1 className="text-center text-4xl font-bold pt-20 text-[#FF5533]">
        Perks of Joining Us
      </h1>
      <div className="space-y-16 p-[20px]">
        {Sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`max-w-6xl mx-auto flex flex-col lg:flex-row items-center transition-opacity duration-1000 ease-in-out transform ${animatedSections.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            <div className={`space-y-6 flex-1 ${index % 2 === 0 ? '' : 'lg:order-2'}`}>
              <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-[#4F46E5] text-sm font-medium">
                {section.tag}
              </div>
              <h2 className="text-4xl font-bold text-[#FF5533]">{section.title}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{section.description}</p>
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-2xl flex items-center justify-center">
                {section.icon}
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <div className="bg-gray-100 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300 m-[30px]">
                <img
                  src={imageMap[section.image]}
                  alt={section.title}
                  className="rounded-xl w-full h-[400px] object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}